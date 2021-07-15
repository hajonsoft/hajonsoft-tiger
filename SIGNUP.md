# Sign up process

To signup a new customer (a.k.a travel agent)

### Create firebase account

```

zsh nest project_name


- Send training to customer to add hajonsoft@gmail.com as an admin to their firebase account. https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR
- login to firebase.google.com using hajonsoft@gmail.com and verify or create
    * new project, make sure the name is readable and record the name ex. forhajjnow
    * Authentication: enable email/password, and google incognito - it may error if not incognito, verify hajonsoft@gmail.com is a user
- zsh nest project_name this should deploy database rules, create github a new action 
- git push and notify customer sign up is completed
```

![image](https://user-images.githubusercontent.com/9623964/121272329-86ea4f00-c87a-11eb-83d5-fbbb948e5e56.png)

### Setup github actions

If firebase-CLI is not installed => `npm install -g firebase-tools`

### Migrate data from sql server (if needed)
make sure sql server is running
relax database and storage rules using Testing mode below 
configure migration/py/hajcustomer_sql_2_realtime.py (sql and firebase)
run migration/py/hajcustomer_sql_2_realtime.py companyid
configure migration/py/photos_sql_2_storage
configure migration/py/photos_sql_2_storage companyid

Test customers using the command
firebase database:get --shallow --pretty --limit-to-first=3 /customer
