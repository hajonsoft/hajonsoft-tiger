const parse = require('mrz').parse;
const fs = require('fs');
const path = require('path');
const util = require('util');
var moment = require('moment')
var  axios = require('axios')

const readdir = util.promisify(fs.readdir);


async function main() {
  const pkgName = 'INTERIEUR C-Z (BAC2)';
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
};
    axios.post(`https://hajj-mission-of-cote-de-ivoir.firebaseio.com/customer/${pkgName}/.json`, { deleteMe: 'Delete this record and import at this level' }, axiosConfig)

}

main();
