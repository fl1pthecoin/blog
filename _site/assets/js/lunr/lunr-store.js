var store = [{
        "title": "Write-up: HackThebox - ServMon",
        "excerpt":"Overview This is an interesting box as it has gotten a lot of heat - mostly due to the steps required for root - and I can see why: The web interface might be slowish and buggy under load but also people can mess with each other - pushing the...","categories": ["boxes"],
        "tags": ["boxes","windows"],
        "url": "http://localhost:4000/boxes/ServMon/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - PlayerTwo",
        "excerpt":"Overview PlayerTwo is MrR3boot’s follow-up box to his box Player - this time created in collaboration with b14ckh34rt. It requires quite a bit of fuzzing and research on twirp to start the box, a little bit of binary exploitation for user and and even more so to get root without...","categories": ["boxes"],
        "tags": ["heap","binary exploitation","linux"],
        "url": "http://localhost:4000/boxes/player2/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - Travel",
        "excerpt":"Starting the travel - Overview Travel is an interesting box created by jkr and his team member xct. It required some fuzzing and enumerating to get a foothold, exploiting memcached abusing a SSRF vulnerability and finally modifying users by taking advantage of our LDAP privileges. Recon Since the nmap scan...","categories": ["boxes"],
        "tags": ["memcached","docker","ldap"],
        "url": "http://localhost:4000/boxes/travel/",
        "teaser": null
      },{
        "title": "Write-up: HackThebox - RopMe",
        "excerpt":"Overview Running the binary just asks us to ROP me outside, how 'about dah? which hints at return oriented programming (ROP) - redirecting code execution by abusing a buffer overflow vulnerability. And indeed, when hammering the input with a lot of characters we get a seg fault: $ ./ropme ROP...","categories": ["challenges"],
        "tags": ["ROP","pwn"],
        "url": "http://localhost:4000/challenges/RopMe/",
        "teaser": null
      },{
        "title": "Write-up: HackTheBox - Time",
        "excerpt":"Overview This is a brief walkthrough for the box Time from HackTheBox with some remarks on file/directory permissions in the appendix. Getting a shell on the box, user flag As only port 22 and 80 are open we take a look at the website and find an online beautifier and...","categories": ["boxes"],
        "tags": ["linux"],
        "url": "http://localhost:4000/boxes/Time/",
        "teaser": null
      }]
