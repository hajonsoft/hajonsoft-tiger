const fs = require("fs");

const usersData = JSON.parse(fs.readFileSync("./users", "utf-8"));
console.log('%cMyProject%cline:3%cusersData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(23, 44, 60);padding:3px;border-radius:2px', usersData)
const hajonSoftuser = usersData.users.find(user=> user.email.toLowerCase() === "hajonsoft@gmail.com")
const sortedUsers =   usersData.users.filter(user=> user.email.toLowerCase() !== "hajonsoft@gmail.com").sort((a, b) => {
    return parseInt(a.createdAt) - parseInt(b.createdAt)
  })

const firstUserId = hajonSoftuser.localId;
const secondUserId = sortedUsers[0].localId;

const dbRules = fs.readFileSync('./database.rules.template.json','utf-8');
const newRules = dbRules.replace(/UUID1/g,firstUserId).replace(/UUID2/g,secondUserId);
fs.writeFileSync('./database.rules.json',newRules);
