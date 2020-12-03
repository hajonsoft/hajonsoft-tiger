# Sign up process

To signup a new customer (a.k.a travel agent)

### Create firebase account

- Create a new gmail account for the customer. password companyname2hajonsoft all small
- login to firebase.google.com
- create new project, make sure the name is readable and record the name ex. hajonsoft2020
- Authentication: enable email/password incognito - it may error if not incognito, create the first user (use user email above), default password is the same for email
- Realtime database: start in test mode
- storage: sign up and then change the security rules to true
- click project overview and change public facing name
- create an app, web app  and state at this page to copy the values into github YML

### Setup github actions

firebase logout
del firebase.json .firebaserc
firebase login
firebase init   
        answers public=build, configure as single-page-app=yes, setup automatic builds=yes, overwrite build/index.html=N
        enter github repo as hajonsoft/hajonsoft-react wait for account to be created for this repo in firebase, and this account to be uploaded to github
        run build every deploy = Yes
        when PR is merged=No
        rename the new yml file with company name. ex hajonsoft 
        change the name inside the file
        after actions/checkout@v2 (line 13) paste this
        ```
        - run: 'echo  "$EXPORT_FIREBASE_CONFIG" > src/firebaseConfig.js'
        shell: bash
        env:
          EXPORT_FIREBASE_CONFIG: 'export const firebaseConfig = { apiKey: "API-KEY-HERE", authDomain: "AUTH-DOMAIN-HERE", databaseURL: "DATABASE-URL-HERE", projectId: "PROJ-ID-HERE", storageBucket: "STORAGEBUCKET-HERE", messagingSenderId: "MESSAGE-SENDER-ID-HERE", appId: "APP-ID-HERE" };'
      - run: 'echo $FIREBASE_CONFIG'
        shell: bash
        env:
          FIREBASE_CONFIG: ${{ secrets.SECRET-HERE}}
      ```
      replace all HERE variables with the correct ones
      edit FIREBASE_CONFIG take the new secret key 5 lines below
      make sure channelId: live

push changes to master

### Migrate data from sql server
make sure sql server is running
script from 
enter company id
get customers
get images


### edit security rules for production mode

setup security rules after migration https://firebase.google.com/docs/rules/insecure-rules#database

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

