### HajOnSoft Web

This react project allows hajonsoft customers to login to their own firebase account and perform haj and umrah tasks

edit master translation 
edit customers 
save chat log
edit other looks up 
connect to any other firebase project as owner

# Getting started 
```
1- setup a firebase project
2- create database and storage use custom names as much as possible
3- setup security rules after migration https://firebase.google.com/docs/rules/insecure-rules#database
```

# security rule 
**Testing Mode** Full Access

```
{
  "rules": {
    "foo": {
      ".read": true,
      ".write": false
    }
  }
}
```
![image](https://user-images.githubusercontent.com/9623964/96530553-885bfe00-123c-11eb-95f9-cacd2359cfb6.png)



**Production Mode** Full Access only to user folder

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
![image](https://user-images.githubusercontent.com/9623964/97191219-e40a1800-1763-11eb-86ad-b1cd278ac793.png)

![image](https://user-images.githubusercontent.com/9623964/97191402-13b92000-1764-11eb-8077-e8813c677bc9.png)

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

Web Automation https://github.com/puppeteer/recorder