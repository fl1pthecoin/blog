var store = [{
        "title": "Write-up: HackThebox - ServMon",
        "excerpt":"Overview This is an interesting box as it has gotten a lot of heat - mostly due to the steps required for root - and I can see why: The web interface might be slowish and buggy under load but also people can mess with each other - pushing the...","categories": ["boxes"],
        "tags": ["boxes","windows"],
        "url": "/boxes/ServMon/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - PlayerTwo",
        "excerpt":"Overview PlayerTwo is MrR3boot’s follow-up box to his box Player - this time created in collaboration with b14ckh34rt. It requires quite a bit of fuzzing and research on twirp to start the box, a little bit of binary exploitation for user and and even more so to get root without...","categories": ["boxes"],
        "tags": ["heap","binary exploitation","linux"],
        "url": "/boxes/player2/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - Travel",
        "excerpt":"Starting the travel - Overview Travel is an interesting box created by jkr and his team member xct. It required some fuzzing and enumerating to get a foothold, exploiting memcached abusing a SSRF vulnerability and finally modifying users by taking advantage of our LDAP privileges. Recon Since the nmap scan...","categories": ["boxes"],
        "tags": ["memcached","docker","ldap"],
        "url": "/boxes/travel/",
        "teaser": null
      },{
        "title": "Write-up: HackThebox - RopMe",
        "excerpt":"Overview Running the binary just asks us to ROP me outside, how 'about dah? which hints at return oriented programming (ROP) - redirecting code execution by abusing a buffer overflow vulnerability. And indeed, when hammering the input with a lot of characters we get a seg fault: $ ./ropme ROP...","categories": ["challenges"],
        "tags": ["ROP","pwn"],
        "url": "/challenges/RopMe/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - Time",
        "excerpt":"Overview This is a brief walkthrough for the box Time from HackTheBox with some remarks on file/directory permissions in the appendix. Getting a shell on the box, user flag As only port 22 and 80 are open we take a look at the website and find an online beautifier and...","categories": ["boxes"],
        "tags": ["linux"],
        "url": "/boxes/Time/",
        "teaser": null
      },{
        "title": "Writeup: HackTheBox - Schooled",
        "excerpt":"Overview I always like to see different operating systems than Linux and Windows so I looked forward for this FreeBSD box and was not disappointed. Most of the user part required exploiting the learning platform Moodle which I enjoyed even more so because of being a teacher myself. For root,...","categories": ["protected"],
        "tags": ["freebsd","bsd","moodle","pkg"],
        "url": "/protected/Schooled-active/",
        "teaser": null
      },{
        "title": "HackTheBox - Debugging Interface",
        "excerpt":"Overview Neat little challenge to learn the basics. Getting started Before getting into it we read the challenge description We accessed the embedded device’s asynchronous serial debugging interface while it was operational and captured some messages that were being transmitted over it. Can you decode them? and note the captured...","categories": ["protected"],
        "tags": ["hardware","baud"],
        "url": "/protected/debugging_interface/",
        "teaser": null
      },{
        "title": "HackTheBox - The Needle",
        "excerpt":"Overview Another neat little challenge to learn some basics. Getting started As the challenge description did not really matter for me I’m skipping it here. We start by taking a look at the file given: $ file firmware.bin firmware.bin: Linux kernel ARM boot executable zImage (big-endian) $ binwalk firmware.bin DECIMAL...","categories": ["protected"],
        "tags": ["hardware"],
        "url": "/protected/theneedle/",
        "teaser": null
      },{
        "title": "HackTheBox - Factory",
        "excerpt":"Overview The challenge description in this case is helpful and reads the following: Our infrastructure is under attack! The HMI interface went offline and we lost control of some critical PLCs in our ICS system. Moments after the attack started we managed to identify the target but did not have...","categories": ["protected"],
        "tags": ["hardware"],
        "url": "/protected/factory/",
        "teaser": null
      },{
        "title": "HackTheBox - Sharp",
        "excerpt":"Recon The nmap scan shows an open smbport which we try to enum anonymously via $ smbclient -L 10.10.10.219 Enter WORKGROUP\\kali's password: Anonymous login successful Sharename Type Comment --------- ---- ------- ADMIN$ Disk Remote Admin C$ Disk Default share dev Disk IPC$ IPC Remote IPC kanban Disk SMB1 disabled --...","categories": ["boxes"],
        "tags": ["c sharp","windows","RE"],
        "url": "/boxes/Sharp/",
        "teaser": null
      }]
