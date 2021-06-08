# Sign up process

To signup a new customer (a.k.a travel agent)

### Create firebase account

```
- Send video to customer to add you as an admin to their firebase account. hajonsoft@gmail.com 
        [vidyard](https://share.vidyard.com/watch/rT1rBy1t54MiBTSXygavNx?)
- login to firebase.google.com using this admin account and verify or 
- create new project, make sure the name is readable and record the name ex. forhajjnow
- Authentication: enable email/password incognito - it may error if not incognito, create the first user (use user email above), default password is the same for email
- Realtime database: start in test mode
- storage: sign up and then change the security rules to true
- click project overview and change public facing name
- Click overview and create an web app with the same project name, copy the config of SDK setup and configuration into src/firebaseConfigs/APP_NAME.js
- Setup github actions using firebase CLI (see below) then and deploy
- Make sure the new web application is searchable by you as an admin somewhere as well as any custom website created for the client. TBD
```

![image](https://user-images.githubusercontent.com/9623964/121272329-86ea4f00-c87a-11eb-83d5-fbbb948e5e56.png)

### Setup github actions

```
If firebase-CLI is not installed => `npm install -g firebase-tools`
firebase logout
`rm firebase.json .firebaserc`
firebase login
firebase init hosting
        Answers 
        - **public=build**
        - **Configure as single-page-app=y**
        - **Set up automatic builds and deploys with GitHub?=y**
        - File public/index.html already exists. Overwrite?=N
        - For which GitHub repository would you like to set up a GitHub workflow?
                Wait for account to be created for this repo in firebase, and this account to be uploaded to github [PRESS ENTER}
        - **Set up the workflow to run a build script before every deploy? y**
        - What script should be run before every deploy? [PRESS ENTER]
        - **Set up automatic deployment to your site's live channel when a PR is merged? n**
        - Rename the new yml file with to project Id. mv .github/workflows/firebase-hosting-pull-request.yml .github/workflows/PROJECT_ID.yml   
        - Change the name inside the file line 4
        - after actions/checkout@v2 (line ~10) paste this include the -
```

---

```
        - run: 'echo  "$EXPORT_FIREBASE_CONFIG" > src/firebaseConfig.js'
          shell: bash
          env:
             EXPORT_FIREBASE_CONFIG: "import firebaseConfig from './firebaseConfigs/PROJETID_HERE'; export default firebaseConfig;"
        - run: 'echo $FIREBASE_CONFIG'
          shell: bash
          env:
            FIREBASE_CONFIG: ${{ secrets.SECRET-HERE}}
```
        - Replace all HERE variables with the correct ones (PROJETID_HERE, SECRET-HERE) 
        - Make sure indentation is correct otherwise deployment will fail (Compare with a valid file)
        - Make sure or add **channelId: live** is just above projectId (line ~24)
        - Change to on pull_request to on push (Line ~5)
        - firebase deploy then `rm firebase.json .firebaserc` (these two files required for firebase deploy but not github action verify that)
        - Push changes to master make sure action runs successfully and get the deployment url which should be 
projectId.web.app 

### Migrate data from sql server (if needed)
make sure sql server is running
relax database and storage rules using Testing mode below 
configure migration/py/hajcustomer_sql_2_realtime.py (sql and firebase)
run migration/py/hajcustomer_sql_2_realtime.py companyid
configure migration/py/photos_sql_2_storage
configure migration/py/photos_sql_2_storage companyid

Test customers using the command
firebase database:get --shallow --pretty --limit-to-first=3 /customer

### Setup production mode

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
    ".read": "auth != null",
    ".write": "auth != null",
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

