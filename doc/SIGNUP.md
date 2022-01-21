# Sign up process

`zsh nest <project ID>`

To signup a new customer (a.k.a Munazim), please see this video https://share.vidyard.com/watch/X3B3RdTUC7htQ3Eu91U4P3?

### Steps

The main command is

```

zsh nest project_name


- The munazim will watch this https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR and send us an invite [image below]
- login to firebase.google.com using hajonsoft@gmail.com and verify or create
    * new project, make sure the name is the same as the project id
    * Authentication: Signin-method enable email/password, and google [note you may need to login incognito]
    * Authentication: users, make sure hajonsoft@gmail.com is a user
    * Realtime database: Check
    * Storage: Check
- zsh nest project_name this should deploy database rules, storage rules, create a mew github action 
- git push
```

![image](https://user-images.githubusercontent.com/9623964/121272329-86ea4f00-c87a-11eb-83d5-fbbb948e5e56.png)

If firebase-CLI is not installed => 
`npm install -g firebase-tools`

Test customers using the command
firebase database:get --shallow --pretty --limit-to-first=3 /customer

### Firebase storage CORS

Guide 
https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin/37765371#:~:text=The%20easiest%20way%20to%20configure,use%20it%20to%20configure%20CORS.&text=and%20you%20should%20be%20set.

download gsutil https://cloud.google.com/storage/docs/gsutil_install

Then issue this command (make sure cors.json is present)

gsutil cors set cors.json gs://exampleproject.appspot.com
wait for the message
Setting CORS on gs://breno-tours.appspot.com/...