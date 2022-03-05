# Sign up process

`zsh nest <project ID>`

To signup a new customer (a.k.a Munazim), please see this video https://share.vidyard.com/watch/X3B3RdTUC7htQ3Eu91U4P3?

### Steps

The main command is

```
cd signup

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

ls  -1 src/firebaseConfigs | sed -e 's/\.js$//'


gsutil cors set cors.json gs://almarwah-travel.appspot.com
gsutil cors set cors.json gs://atlantic-hajj-umrah-irel-56588.appspot.com
gsutil cors set cors.json gs://azaan-travel-aps.appspot.com
gsutil cors set cors.json gs://barakah-hajj.appspot.com
gsutil cors set cors.json gs://breno-tours.appspot.com
gsutil cors set cors.json gs://cashlessplus-2021.appspot.com
gsutil cors set cors.json gs://classyvisatour.appspot.com
gsutil cors set cors.json gs://cohohadj-travel2021.appspot.com
gsutil cors set cors.json gs://darelsalam-can.appspot.com
gsutil cors set cors.json gs://darelsalam-usa.appspot.com
gsutil cors set cors.json gs://forhajjnow.appspot.com
gsutil cors set cors.json gs://full-sail-45734.appspot.com
gsutil cors set cors.json gs://hajj-mission-of-cote-de-ivoir.appspot.com
gsutil cors set cors.json gs://hajj-umrah-2022.appspot.com
gsutil cors set cors.json gs://harmoniatravel-2021.appspot.com
gsutil cors set cors.json gs://hasan-travel.appspot.com
gsutil cors set cors.json gs://makkahtoursonline.appspot.com
gsutil cors set cors.json gs://mishkaat-norge.appspot.com
gsutil cors set cors.json gs://mission-haj-2022.appspot.com
gsutil cors set cors.json gs://moulaviumrah.appspot.com
gsutil cors set cors.json gs://ocean-travel-14092.appspot.com
gsutil cors set cors.json gs://phtravelumrah.appspot.com
gsutil cors set cors.json gs://safar-omra-france.appspot.com
gsutil cors set cors.json gs://st-umrah-2021.appspot.com
gsutil cors set cors.json gs://tawfiq-hajj.appspot.com
gsutil cors set cors.json gs://travelking-melbourne.appspot.com
gsutil cors set cors.json gs://trustwide-travel.appspot.com
gsutil cors set cors.json gs://umrah-1443.appspot.com
gsutil cors set cors.json gs://visa-mkm2022.appspot.com
gsutil cors set cors.json gs://yazan-tours.appspot.com
gsutil cors set cors.json gs://yt-u21.appspot.com