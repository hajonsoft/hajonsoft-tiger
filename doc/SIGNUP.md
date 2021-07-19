# Sign up process

To signup a new customer (a.k.a Munazim or travel agent), please see this video https://share.vidyard.com/watch/X3B3RdTUC7htQ3Eu91U4P3?

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

### Migrate data from sql server (if needed)
make sure sql server is running
relax database and storage rules using Testing mode below 
configure migration/py/hajcustomer_sql_2_realtime.py (sql and firebase)
run migration/py/hajcustomer_sql_2_realtime.py companyid
configure migration/py/photos_sql_2_storage
configure migration/py/photos_sql_2_storage companyid

Test customers using the command
firebase database:get --shallow --pretty --limit-to-first=3 /customer
