const fs = require('fs');
const path = require('path');
var _ = require('lodash')

const util = require('util');
var moment = require('moment')

const readdir = util.promisify(fs.readdir);

async function merge() {
    let merged = {};
    const files = await readdir('outgoing/');
    for (let i = 0; i < files.length; i++) {
        const content = fs.readFileSync('outgoing/' + files[i]);
        const mergeItem = JSON.parse(content);
        const rootKey = _.head(_.last(files[i].split('_')).split('.'))
        _.merge(merged,{[rootKey]: mergeItem});
        // fs.unlink('outgoing/' +files[i]);

    }
    fs.writeFileSync('outgoing/merged.json', JSON.stringify(merged), 'utf8');


}


function main() {
    merge();
}

main();
