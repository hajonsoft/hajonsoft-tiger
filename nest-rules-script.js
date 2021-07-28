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
