fs = require('fs');
const axios = require('axios');
var _ = require('lodash')
var sql = require("mssql/msnodesqlv8");

const { exit } = require('process');
const { fileURLToPath } = require('url');

const sql2FirebaseConfiguration = {};




// 2- Enter firebase database url - enable firebase writes to everyone temporarily to avoid writing authentication code
// sql2FirebaseConfiguration.firebaseUrl = 'https://archive-tables.firebaseio.com/';
sql2FirebaseConfiguration.firebaseUrl = 'https://haj-mission-of-cote-divoire.firebaseio.com/';

// 3- Enter you desired table name; This will be at the root of your firebase database ex. /abcde
sql2FirebaseConfiguration.firebaseNewTableName = 'customer';
// 4- Enter sql database connection info in this format

function mapper(record) {
    return {
        modified: {
            name: record.FullName,
            onSoftId: record.HajId,
            imageId: record.ImageId,
            codeLine: record.CodeLine || record.Comment,
            relationship: record.Relationship,
            birthDate: record.DOB,
            phone: record.Cell,
            email: record.Email,
            nationality: record.Nationality,
            preNationality: record.PreviousNationality,
            gender: record.Sex,
            passportNumber: record.PassportNumber,
            passIssueDt: record.PassportIssueDate,
            passExpireDt: record.PassportExireDate,
            birthPlace: record.PlaceOfBirth,
            CreateDt: record.CreateDt,
            profession: record.Occupation,
            passPlaceOfIssue: record.PassportIssuePlace,
            mahramName: record.MuhramName,
            nameArabic: record.FullNameArabic,
            idNumber: record.CivilId,
            idNumberIssueDate: record.cidIssueDate,
            idNumberExpireDate: record.cidExpireDate,
        },
        path: [sanitizeKey(record.PackageName), record.HajId].join('/'),
        // path: [record.PackageName ? record.PackageName.toString().replace(/[^a-zA-z0-9\- )()]/g, '') : 'nopackage', record.Nationality].join('/')

    }
}

function sanitizeKey(key) {
    if (key) {
        const result = _.trim(key.replace(/[^a-zA-Z0-9 ]/g, ''))
        if (result) {
            return result;
        }
    }

    return 'unknown'

}

main()

async function main() {

    const companies = await getSqlRecords(`select name , companyId from hajcompany where parentcompanyid is null and companyId = 8730`)

    for (let i = 0; i < companies.length; i++) {
        const records = await getSqlRecords(`select * from hajcustomer  where companyid = ${companies[i].companyId}`)
        if (records && records.length > 0) {
            const firebaseObject = await getFirebaseObject(records);
            await writeFirebaseFile(firebaseObject, `customers_${companies[i].companyId}_${companies[i].name}`)
        }
    }

}
// async function PostToDatabase(record, printIndex, retryIndex, fails) {

//     try {

//         const result = await axios.post(`${sql2FirebaseConfiguration.firebaseUrl}${sql2FirebaseConfiguration.firebaseNewTableName}/${mapper(record).path}/.json`, mapper(record).modified, axiosConfig)
//         if (retryIndex > 0) {
//             console.log(sql2FirebaseConfiguration.firebaseNewTableName + '/' + mapper(record).path)
//             console.log(`record: ${retryIndex} [for ${printIndex}] (total: ${fails.length}) ==> ${result.statusText}`);

//         } else {
//             console.log('record: ' + printIndex + ' ==> ' + result.statusText);
//         }

//     } catch (error) {
//         console.log('record: ' + printIndex + ' ==> ' + error.message);
//         fs.appendFileSync('fail.txt', printIndex + ',');

//     }
// }


async function getSqlRecords(query, config) {
    let records = [];
    let connectionConfig = config;
    if (!connectionConfig) {
        connectionConfig = {
            server: 'localhost',
            database: 'onsoft_ireland_restore',
            options: {
                trustedConnection: true
            }
        };
    }

    const pool = new sql.ConnectionPool({
        database: 'onsoft_ireland_restore',
        server: 'localhost',
        driver: 'msnodesqlv8',
        options: {
            trustedConnection: true
        }
    })
    await pool.connect();
    const recordSet = await pool.request().query(query);

    return recordSet.recordset;
}

async function getFirebaseObject(records) {

    let firebaseObject = {}
    records.forEach(async function (record) {
        const mapped = _.pickBy(mapper(record), _.identity);
        let firebaseRecord = mapped.modified;
        const firebasePath = mapped.path.split('/');
        let newFirebaseRecord = {}
        _.set(newFirebaseRecord, firebasePath.slice(0, firebasePath.length - 1).join('.'), { [firebaseRecord.onSoftId]: firebaseRecord });
        _.merge(firebaseObject, newFirebaseRecord);
    })
    return firebaseObject;
}

async function writeFirebaseFile(firebaseObject, outgoingFile) {

    const firebaseJson = JSON.stringify(firebaseObject);
    if (!fs.existsSync('outgoing')){
        fs.mkdirSync('outgoing');
    }
    fs.writeFileSync('outgoing/' + outgoingFile + ".json", firebaseJson, 'utf8');

}

