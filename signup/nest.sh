#!/usr/bin/zsh
cd ..
firebase logout
firebase login
rm .firebaserc
firebase use --add $1
git switch master
git pull
firebase auth:export --format json signup/users
read -t 5
cat signup/users
firebase apps:sdkconfig > $1.js
firebase init hosting:github < signup/nest-input
read -t 30 
mv $1.js src/firebaseConfigs
cp .github/workflows/template .github/workflows/$1.yml
node signup/nest-script $1
read -t 20 
cp ./signup/database.rules.json .
firebase deploy --only database -p ./signup
read -t 30
cp ./signup/storage.rules .
firebase deploy --only storage
rm .github/workflows/firebase-hosting-pull-request.yml
gsutil cors set ./signup/cors.json gs://$1.appspot.com
# npm run build
# firebase deploy --only hosting
git restore src/firebaseConfig.js
git add .
git commit -m $1
# git show HEAD
