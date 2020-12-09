# Sign up process

To signup a new customer (a.k.a travel agent)

### Create firebase account

```
- Create a new gmail account for the customer companyname2hajonsoft. password companyname22hajonsoftcountryname all small. ex forhajj2hajonsoft/forhaj23hajonsoftusa
- login to firebase.google.com
- create new project, make sure the name is readable and record the name ex. forhajjnow
- Authentication: enable email/password incognito - it may error if not incognito, create the first user (use user email above), default password is the same for email
- Realtime database: start in test mode
- storage: sign up and then change the security rules to true
- click project overview and change public facing name
- Click overview and create an app, web app  and state at this page to copy the values into github YML
- Setup github actions and deploy
```

### Setup github actions

```
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
        after actions/checkout@v2 (line 10) paste this
        - run: 'echo  "$EXPORT_FIREBASE_CONFIG" > src/firebaseConfig.js'
          shell: bash
          env:
            EXPORT_FIREBASE_CONFIG: 'export const firebaseConfig = { apiKey: "API-KEY-HERE", authDomain: "AUTH-DOMAIN-HERE", databaseURL: "DATABASE-URL-HERE", projectId: "PROJ-ID-HERE", storageBucket: "STORAGEBUCKET-HERE", messagingSenderId: "MESSAGE-SENDER-ID-HERE", appId: "APP-ID-HERE" };'
        - run: 'echo $FIREBASE_CONFIG'
          shell: bash
          env:
            FIREBASE_CONFIG: ${{ secrets.SECRET-HERE}}

      replace all HERE variables with the correct ones and make sure indentation is correct otherwise deployment will fail
      edit FIREBASE_CONFIG now in line 18 take the new secret key 5 lines below line 23
      make sure channelId: live is in line 24 just above projectId

push changes to master make sure action runs successfully and get the deployment url which should be 
projectId.web.app 
```
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
      ".read": true,
      ".write": true
  }
}
```

**Production Mode** Full Access only to user folder

```
{
  "rules": {
    "customer": {
    ".read": "auth != null",
    ".write": "auth != null"
    },
    "$uid" : {
      ".read" : "auth != null && auth.uid == $uid",
      ".write" : "auth != null && auth.uid == $uid"
    }

  }
}


#### Storage

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}


```

![image](https://user-images.githubusercontent.com/9623964/97191402-13b92000-1764-11eb-8077-e8813c677bc9.png)

