### HajOnSoft Web

This react project allows hajonsoft customers to login to their own firebase account to work on travellers to manage relationship, scan passports and apply for visa.

edit master translation 
edit customers 
save chat log
edit other looks up 
connect to any other firebase project as owner

# Getting started 

To signup a new customer (a.k.a travel agent)

```
- Sign up for a new firebase account,  companyInitials_hajonsoft@gmail.com password (Paris20companyInitials)
- Setup database, storage and hosting. Database rules, storage rules and enable email login and create a user and password (or record a video so the customer can create himself)
- setup security rules after migration https://firebase.google.com/docs/rules/insecure-rules#database
- migration customer data and images from sql server to firebase
- Setup github action to deploy and share the address with customer
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

**Deploy new account**

```
firebase logout
delete firebase.json and .firebaserc
firebase login
firebase init   answers public=build, configure as single-page-app=yes, setup automatic builds=yes, overwrite build/index.html=N
enter github repo as hajonsoft/hajonsoft-react wait for account to be created for this repo in firebase, and this account to be uploaded to github
run build every deploy = Yes
when PR is merged=No
Edit the new yml file after - uses: actions/checkout@v2 take from hajmission
edit  EXPORT_FIREBASE_CONFIG by copying from firebase config from firebase
edit FIREBASE_CONFIG take the new secret from github
channelId: live

```

Disable email notification about insecure rules. 

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
```
delete firebaserc, .firebasefolder firebase login, firebase init, 

```


Firebase Auth https://www.youtube.com/watch?v=zq0TuNqV0Ew

Web Automation https://github.com/puppeteer/recorder
