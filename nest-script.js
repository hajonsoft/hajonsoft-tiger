const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./users", "utf-8"));
const sortedUsers =   users.users.sort((a, b) => {
    return parseInt(a.createdAt) - parseInt(b.createdAt)
  })

const firstUserId = sortedUsers[0].localId;
const secondUserId = sortedUsers[1].localId;

const dbRules = fs.readFileSync('./database.rules.template.json','utf-8');
const newRules = dbRules.replace(/UUID1/g,firstUserId).replace(/UUID2/g,secondUserId);
fs.writeFileSync('./database.rules.json',newRules);

let firebaseConfig = fs.readFileSync('./src/firebaseConfigs/' + process.argv[2] + '.js', 'utf-8')
firebaseConfig = firebaseConfig.replace(/firebase\.initializeApp\(/g,'const firebaseConfig = ')
firebaseConfig = firebaseConfig.replace(/\);/g,';\nexport default firebaseConfig;')

fs.writeFileSync('./src/firebaseConfigs/' + process.argv[2] + '.js',firebaseConfig)


let githubAction = fs.readFileSync('./.github/workflows/' + process.argv[2] + '.yml', 'utf-8')
githubAction = githubAction.replace(/projectidhere/g,process.argv[2])
githubAction = githubAction.replace(/PROJECTIDHERE/g,process.argv[2].toUpperCase().replace(/-/g,'_'))

fs.writeFileSync('./.github/workflows/' + process.argv[2] + '.yml',githubAction)