const fs = require("fs");

const usersData = JSON.parse(fs.readFileSync("./signup/users", "utf-8"));
const hajonSoftuser = usersData.users.find(user=> user.email.toLowerCase() === "hajonsoft@gmail.com")
const sortedUsers =   usersData.users.filter(user=> user.email.toLowerCase() !== "hajonsoft@gmail.com").sort((a, b) => {
    return parseInt(a.createdAt) - parseInt(b.createdAt)
  })

const firstUserId = hajonSoftuser.localId;
const secondUserId = sortedUsers[0].localId;

const dbRules = fs.readFileSync('./signup/database.rules.template.json','utf-8');
const newRules = dbRules.replace(/UUID1/g,firstUserId).replace(/UUID2/g,secondUserId);
fs.writeFileSync('./signup/database.rules.json',newRules);

let firebaseConfig = fs.readFileSync('./src/firebaseConfigs/' + process.argv[2] + '.js', 'utf-8')
firebaseConfig = firebaseConfig.replace(/firebase\.initializeApp\(/g,'const firebaseConfig = ')
firebaseConfig = firebaseConfig.replace(/\);/g,';\nexport default firebaseConfig;')

fs.writeFileSync('./src/firebaseConfigs/' + process.argv[2] + '.js',firebaseConfig)
fs.writeFileSync('./src/firebaseConfig.js',`import firebaseConfig from './firebaseConfigs/${process.argv[2]}';\nexport default firebaseConfig;`)


let githubAction = fs.readFileSync('./.github/workflows/' + process.argv[2] + '.yml', 'utf-8')
githubAction = githubAction.replace(/projectidhere/g,process.argv[2])
githubAction = githubAction.replace(/PROJECTIDHERE/g,process.argv[2].toUpperCase().replace(/-/g,'_'))

fs.writeFileSync('./.github/workflows/' + process.argv[2] + '.yml',githubAction)

console.log('Config, rules and workflow created')