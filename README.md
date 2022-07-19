
[![GitHub issues](https://img.shields.io/github/issues/hajonsoft/hajonsoft-tiger)](https://github.com/hajonsoft/hajonsoft-tiger/issues)

 ### HAJonSoft Tiger
 ---

Home for Nest suite of applications. Nest consist of Dove 🕊  and Humming Bird combined. The code repo itself is called Tiger 🐅 (Animal). 
Repo uses an animal name while customer facing modules uses a bird name. I am starting to come up with names for every thing otherwise everything is called HAJonSoft and things starts getting confusing.

* Humming Bird (Bird) allows a Munazim to login and manage passengers, apply for visa, scan passports, create online advertisements, print reports, manage payments, etc...
* Dove (Bird) allows passengers to find trips, make a reservatoin, learn about the Munazim, etc...


To learn about HAJonSoft repos please watch this video [![image](https://user-images.githubusercontent.com/9623964/121062683-40adc680-c77a-11eb-8cc0-7488bd23c13e.png)](https://share.vidyard.com/watch/obRrErJQBGMkwu6khqmUiZ?)


## Quick start
---

```
yarn start or npm start
```

## Copilot

Let's use copilot,  some tips are [here](https://travis.media/how-to-use-github-copilot-vscode/)

## Redux and Toolkit
---
For redux code walkthrough see video (public)
https://drive.google.com/file/d/1gl3-zDJ306pjZTFNpzU6rxknu-n1I-oT/view?usp=sharing
### Environment Resolution
---

To start Nest locally and connect to specific Munazim change src/firebaseConfig.js

ex. `import firebaseConfig from './firebaseConfigs/breno-tours'; `

Which will utilize breno-tours firebase account

_Note: This file will be overwritten during automated deployment but not if you `firebase deploy --hosting'_

# Commit format
---
I come a cross an interesting commit message format and I try to use it 
fix: To express a fix to the code ex. `fix: build error`
feat: To introduce a new feature to the code ex. `feat: apply for visa`
refactor: Code refactor ex. `refactor: apply for visa`
doc: Update to documentation only ex. `docs: spell check`
style: Update to style only ex. `style: apply for visa`
test: Create or update tests ex. `test: apply for visa`

_Sometimes this it helps me with the commit messages._

# Git and SSH
---
If you want to have two github accounts on your local machine, you can use ssh to manage more than one github account. Ex. work vs personal. here is a guide

https://medium.com/@pinglinh/how-to-have-2-github-accounts-on-one-machine-windows-69b5b4c5b14e

important ssh commands 
```zsh
ssh-keygen -t ed25519 -C "your_github_email@example.com"
save it as  `~/.ssh/id_hajonsoft`
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_hajonsoft
pbcopy < ~/.ssh/id_hajonsoft.pub
open ~/.ssh/config
```
![image](https://user-images.githubusercontent.com/9623964/122631031-385c6200-d07d-11eb-854b-3266c2e3a91b.png)

~/.ssh/config

```
Host github.com-
  HostName hajonsoft.github.com
  User git
  IdentityFile ~/.ssh/id_hajonsoft
  AddKeysToAgent yes
  UseKeychain yes
```

![image](https://user-images.githubusercontent.com/9623964/122631290-b15cb900-d07f-11eb-9d09-e0c0142363e0.png)

git remote set-url origin git@hajonsoft.github.com:hajonsoft/hajonsoft-tiger.git
git config user.name YOUR_USER_NAME
git config user.email YOUR_EMAIL

### Communication [Slack]
---

We use slack for communication, it is better than whatsapp and has more features.

* Sign up through https://join.slack.com/t/hajonsoft/signup
* Go through steps of confirming email, agreeing to terms, enter name, and select password
* Add profile picture to Slack in Profile & Settings section

### Scrum
---
We use ZenHub to manage stories and epics. install ZenHub extension to see epics and stories right in your google chrome when browsing github.

Virtual standup is held on slack using `/remind me every [day/hour] at [time] to [your message]`

/remind #dev every day at 07:00 to 

Virtual standup :virtual-meeting ! If you want to share something with the team, please thread :thread with

1- What specific things did you complete yesterday and would like to share, and how would you briefly describe your approach to these things?
2- What specific things do you plan to work on today and would like to share, and how would you briefly describe the approach you intend to take?
3- What would allow you to go faster or do better?


_We’ll meet in the #dev channel._

### Firebase
---
Munazim's authorize hajonsoft@gmail.com as an owner to their firebase account. You can login to any Munazim's firebase or Nest. To administer the project go to firebase.google.com and login using hajonsoft@gmail.com to find all Munazims and administer their firebase account.

The signup documentation is here https://github.com/hajonsoft/hajonsoft-react/blob/master/doc/SIGNUP.md

### Internationalization
---

We use i18n-ally extension instead of babel. This is a great extension and allows you to manage all translations from the sidebar.

To translate a string, simply select it, press COMMAND+P, find the command
i18n Ally: Extract text into i18n message
_I usually create a keyboard short cut for it as SHIFT+OPTION+COMMAND+T_
Follow the instructions to create an internationalization entry key, then use the key in your code. To translate, hover over the key inserted in the code and click the globe next to the language to translate. 

_Note: you will need to import t from the correct relative path. ex. '../../../shared/util/trans';_

_This is the easiest and cheapest solution I could find and I am having a lot of fun with it._

### Video instructions [vidyard]
---
It is very easy to communicate with videos, If you want to share something, I recommend recording your voice and screen using vidyard, you can create your own account or use hajonsoft account.
Login to vidyard using hajonsoft@gmail.com 

### Figma
---
We don't have a Figma design yet, but we would love to design before coding one day

### Video Training [TalentLMS]
---

We use TalentLMS.com to create Munazim training videos, the free account provides 6 lessons. Each lesson can have videos, questions and assignments. to login to TalentLMS.com use hajonsoft.com federated google login.

To record videos use one of the following tools
recordcast.com. login with hajonsoft@gmail.com
Quick time
Kap
Vidyard

you can also use Krisp for noise cancelling
https://www.descript.com/ for trancription

If the camera is open in a video we usually start with
My name is ... and my job is to ... so you can .....

### Puppeteer
---
We use puppeteer to submit passengers to various visa websites. Video https://youtu.be/BMtcwF96j6I

### git-autoconfig

Is a useful extension to switch your git configuration between HAJonSoft and your other work related git config's

### Hubspot
---
Hubspot is an interesting customer relationship management system and it has now all the HAJonSoft customers imported. You can use federated google login to access it. login with hajonsoft@gmail.com and here is a video showing it beyond the login page https://share.vidyard.com/watch/o8FrgwzsA4MbHQHXNs8MpK?

### Help desk for "visa by proxy" [Spiceworks]
---
We use https://on.spiceworks.com/ to manage "visa by proxy" tickets. login with hajonsoft@gmail.com

### Patreon
---
Our patreon page is https://www.patreon.com/Hajonsoft if you want to edit login using hajonsoft@gmail.com

# Credits
---
Favicon Generator https://realfavicongenerator.net/

Favicon article https://serverless-stack.com/chapters/add-app-favicons.html

Material secondary color https://material-ui.com/customization/color/#color

Color Harmony generator https://coolors.co/

SVG images https://undraw.co/

Database Rules https://firebase.google.com/docs/database/security/

private, restricted routes https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e

Firebase hooks https://www.npmjs.com/package/react-firebase-hooks

Firebase Rest https://firebase.google.com/docs/reference/rest/database

Firebase Deploy https://www.robinwieruch.de/firebase-deploy-react-js 

Firebase Deploy docs https://firebase.google.com/docs/rules/manage-deploy#generate_a_configuration_file

Firebase Auth https://www.youtube.com/watch?v=zq0TuNqV0Ew

firebase CLI https://firebase.google.com/docs/cli

Web Automation https://github.com/puppeteer/recorder

Islamic Geometric patterns https://www.vecteezy.com/free-vector/geometric-background

url-handler registry https://stackoverflow.com/questions/389204/how-do-i-create-my-own-url-protocol-e-g-so

## Vision
---
Revolutionize the industry by creating an integrated digital platform for travel agents, passengers and our employees who serve them – by harnessing
science and technology to help passengers achieve the best possible travel experience.

## We need your help!


HAJonSoft is a work in progress and needs a lot of improvement. There are unimplemented stuff waiting for your help! You can find them at github issue tracker or read the code and find @TODO tags! To contribute please send us an email hajonsoft@gmail.com

There are two areas you can help. If you like React then you can help implementing features for Tiger. If you are professional in Javascript, Node.js and/or web crawling then you can help us by implementing external system integration with puppeteer.

We also would like to extend personal assistance and would like input around how to do that competently.

To start contributing, either send us an email to be added as a contributer to the repo, or simply fork the git repo from github, clone the forked repository locally, make your changes. Then send a pull request. We will discuss your changes and once approved and merged it will deployed to all Munazims!

© HAJonSoft 2021
