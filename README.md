### HAJonSoft Tiger

Home of Dove 🕊  and Humming Bird 🦅 sites. The code repo is called Tiger 🐅 (Animal). 
Repo uses an animal name while customer facing modules will use a bird name.

Humming Bird allows HAJonSoft customers to login to their own firebase account and administer travellers to manage relationship, scan passports and apply for visa.
Dove allows travellers to look at advertized packages to reserve or manage them.


To learn about hajonsoft repos please watch this video [![image](https://user-images.githubusercontent.com/9623964/121062683-40adc680-c77a-11eb-8cc0-7488bd23c13e.png)](https://share.vidyard.com/watch/obRrErJQBGMkwu6khqmUiZ?)


## Quick start

---

### Local Development

To start the application

```
npm start 
```

To connect to a specific customer firebase account, Change src/firebaseConfig 


`import firebaseConfig from './firebaseConfigs/hajj-mission-of-cote-de-ivoir'; `

# Git and SSH

ssh commands key 
```zsh
ssh-keygen -t ed25519 -C "your_github_email@example.com"
save at ~/.ssh/id_hajonsoft
eval "$(ssh-agent -s)"
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
ssh-add ~/.ssh/id_hajonsoft

![image](https://user-images.githubusercontent.com/9623964/122631290-b15cb900-d07f-11eb-9d09-e0c0142363e0.png)

git remote set-url origin git@hajonsoft.github.com:hajonsoft/hajonsoft-tiger.git


### Scrum
We use zenhub to manage stories and epics. install zenhub extension to see epics and stories right in your google chrome when browsing github.


Virtual standup every today is held on slack – please Slack your updates. Happy Scrumming!!
 
We will cover these three things:
 
What specific things did you complete yesterday, and how would you briefly describe your approach to these things?
What specific things do you plan to work on today, and how would you briefly describe the approach you intend to take?
What would allow you to go faster or do your work better?
 
We’ll meet in the development Slack channel.

### Slack

▪ Sign up through https://join.slack.com/t/hajonsoft/signup
▪ Select link and go through the setup steps of confirming email, agreeing to terms, enter name, and select password
▪ Add profile picture to Slack in Profile & Settings section

### Firebase

Customers authroize hajonsoft@gmail.com as an owner on their firebase account. You can login to any customer firebase hosted app. To administer the project go to firebase.google.com and login using hajonsoft@gmail.com to find all customers and administer their firebase account.

The signup documentation are here https://github.com/hajonsoft/hajonsoft-react/blob/master/SIGNUP.md


### Localization

### Video vidyard

### Figma


### TalentLMS

We use TalentLMS.com to create customer videos, the free account provides 6 lessons. Each lesson can have videos, questions and assignments. to login to TalentLMS.com use hajonsoft.com federated google login.

### Puppeteer

We use puppeteer to submit travellers to various visa websites. Video https://youtu.be/BMtcwF96j6I


### Hubspot

Hubspot is an interesting customer management system and it has now all the HAJonSoft customers imported. You can use federated google login to access it. login with hajonsoft@gmail.com and here is a video showing it beyond the login page https://share.vidyard.com/watch/o8FrgwzsA4MbHQHXNs8MpK?


# Credits

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

Firebase Auth https://www.youtube.com/watch?v=zq0TuNqV0Ew

firebase CLI https://firebase.google.com/docs/cli

Web Automation https://github.com/puppeteer/recorder

Islamic Geometric patterns https://www.vecteezy.com/free-vector/geometric-background

url-handler registry https://stackoverflow.com/questions/389204/how-do-i-create-my-own-url-protocol-e-g-so



## Vision

Revolutionize the industry by creating an integrated digital platform for travel agents, travellers and our employees who serve them – by harnessing
science and technology to help travellers achieve the best possible travel experience.


## We need your help!


HAJonSoft is a work in progress and needs a lot of improvement. There are unimplemented stuff waiting for your help! You can find them at github issue tracker or read the code and find @TODO tags! To contribute please send us an email hajonsoft@gmail.com

There are two areas you can help. If you like React then you can help implementing features for Tiger. If you are professional in Javascript and Node.js then you can help us by implementing external system interfaces with puppeteer.

We also would like to extend personal assistance and would like input around how to do that competently.

To start contributing, fork git repository from github, clone the forked repository and make your changes according to instructions below. Then send a pull request. We discuss changes you have made. After that you can see your changes merged in the main repository!

© HAJonSoft 2021
