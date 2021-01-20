
const {nationalities} = require('./nationality')
const {wtuNationalities} = require('./wtuNationalities')
const fs = require('fs');

const output = [];
for (const nationality of nationalities){
    const tel = wtuNationalities.find(x=> x.name.toLowerCase() === nationality.name.toLowerCase());
    if (tel){
        nationality.telCode = tel.tel;
        tel.matched = 'true'
    }
}
fs.writeFileSync('nationalitiesWithTelCode.json', JSON.stringify(nationalities));
fs.writeFileSync('wtuMatched.json', JSON.stringify(wtuNationalities));
