const JSZip = require("jszip");
var parseString = require("xml2js").parseString;
var xpath = require("xml2js-xpath");
const parse = require("mrz").parse;
var moment = require("moment");

//TODO: Read nationalities from data foler
const nats = JSON.parse(
  `[{"Comments":"ETH","name":"Ethiopia"},{"Comments":"ABW","name":"Aruba"},{"Comments":"ERI","name":"Eritrea"},{"Comments":"ESP","name":"Spain"},{"Comments":"AFG","name":"Afghanistan"},{"Comments":"ALB","name":"Albania"},{"Comments":"DEU","name":"Germany"},{"Comments":"AGO","name":"Angola"},{"Comments":"AIA","name":"Anguilla"},{"Comments":"IDN","name":"Indonesia"},{"Comments":"URY","name":"Uruguay"},{"Comments":"UGA","name":"Uganda"},{"Comments":"AZE","name":"Azerbaijan"},{"Comments":"ARM","name":"Armenia"},{"Comments":"AUS","name":"Australia"},{"Comments":"EST","name":"Estonia"},{"Comments":"UKR","name":"Ukraine"},{"Comments":"ARE","name":"United Arab Emirates"},{"Comments":"ARG","name":"Argentina"},{"Comments":"JOR","name":"Jordan"},{"Comments":"ECU","name":"Ecuador"},{"Comments":"BHR","name":"Bahrain"},{"Comments":"BRA","name":"Brazil"},{"Comments":"PRT","name":"Portugal"},{"Comments":"BIH","name":"Bosnia and Herzegovina"},{"Comments":"GAB","name":"Gabon"},{"Comments":"MNE","name":"MONTENEGRO"},{"Comments":"DZA","name":"Algeria"},{"Comments":"DMA","name":"Aldmanakan"},{"Comments":"DNK","name":"Denmark"},{"Comments":"SLV","name":"Salvador"},{"Comments":"SEN","name":"Senegal"},{"Comments":"SDN","name":"Sudan"},{"Comments":"SWE","name":"Sweden"},{"Comments":"SOM","name":"Somalia"},{"Comments":"CHN","name":"China"},{"Comments":"IRQ","name":"Iraq"},{"Comments":"VAT","name":"Vatican City"},{"Comments":"PHL","name":"Philippines"},{"Comments":"CMR","name":"Cameroon"},{"Comments":"COG","name":"Congo Dem"},{"Comments":"KWT","name":"Kuwait"},{"Comments":"MDV","name":"Maldives"},{"Comments":"HUN","name":"Hungary"},{"Comments":"MAR","name":"Morocco"},{"Comments":"MEX","name":"Mexico"},{"Comments":"SAU","name":"Kingdom Saudi Arabia"},{"Comments":"GBR","name":"United Kingdom"},{"Comments":"NOR","name":"Norway"},{"Comments":"AUT","name":"Austria"},{"Comments":"NER","name":"Niger"},{"Comments":"IND","name":"India"},{"Comments":"USA","name":"United States"},{"Comments":"JPN","name":"Japan"},{"Comments":"YEM","name":"Yemen"},{"Comments":"GRC","name":"Greece"},{"Comments":"ATG","name":"Antigua and Barbuda"},{"Comments":"AND","name":"Andorra"},{"Comments":"UZB","name":"Uzbekistan"},{"Comments":"IRN","name":"Iran"},{"Comments":"IRL","name":"Ireland"},{"Comments":"ISL","name":"Iceland"},{"Comments":"ITA","name":"Italy"},{"Comments":"PNG","name":"Papua New Guinea"},{"Comments":"PRY","name":"Paraguay"},{"Comments":"BRB","name":"Barbados"},{"Comments":"BRD","name":"Barbados"},{"Comments":"PAK","name":"Pakistan"},{"Comments":"PLW","name":"Palau"},{"Comments":"BMU","name":"Bermuda"},{"Comments":"BRN","name":"Brunei"},{"Comments":"BEL","name":"Belgium"},{"Comments":"BGR","name":"Bulgaria"},{"Comments":"BLZ","name":"Belize"},{"Comments":"BGD","name":"Bangladesh"},{"Comments":"PAN","name":"Panama"},{"Comments":"BEN","name":"Benin"},{"Comments":"BTN","name":"Bhutan"},{"Comments":"BWA","name":"Botswana"},{"Comments":"PRI","name":"Puerto Rico"},{"Comments":"BFA","name":"Burkina Faso"},{"Comments":"BDI","name":"Burundi"},{"Comments":"POL","name":"Poland"},{"Comments":"BOL","name":"Bolivia"},{"Comments":"PYF","name":"French Polynesia"},{"Comments":"PER","name":"Peru"},{"Comments":"BLR","name":"Belarus"},{"Comments":"THA","name":"Thailand"},{"Comments":"TWN","name":"Taiwan"},{"Comments":"TKM","name":"Turkmenistan"},{"Comments":"TUR","name":"Turkey"},{"Comments":"TTO","name":"Trinidad and tobago"},{"Comments":"TCD","name":"Chad"},{"Comments":"CHL","name":"Chile"},{"Comments":"TZA","name":"Tanzania"},{"Comments":"TGO","name":"Togo"},{"Comments":"TUV","name":"Tuvalu"},{"Comments":"TKL","name":"Tokelau"},{"Comments":"TON","name":"Tonga Islands"},{"Comments":"TUN","name":"Tunisia"},{"Comments":"JAM","name":"Jamaica"},{"Comments":"GMB","name":"Gambia"},{"Comments":"GIB","name":"Gibraltar"},{"Comments":"GRL","name":"Green Land"},{"Comments":"GRD","name":"Grenada"},{"Comments":"FLK","name":"Islands - Falkland"},{"Comments":"BHS","name":"Bahamas"},{"Comments":"COM","name":"Comoros Islands"},{"Comments":"TCA","name":"Turks and Caicos Islands"},{"Comments":"SLB","name":"Solomon Islands"},{"Comments":"VGB","name":"US Virgin Islands"},{"Comments":"VIR","name":"British Virgin Islands"},{"Comments":"CYM","name":"Cayman Islands"},{"Comments":"COK","name":"Cook Islands"},{"Comments":"CCK","name":"Cocos Islands"},{"Comments":"MHN","name":"Marshall Islands"},{"Comments":"MHL","name":"Marshall Islands"},{"Comments":"CXR","name":"Christmas Island"},{"Comments":"NFK","name":"Norfolk Island"},{"Comments":"SSD","name":"SOUTH SUDAN"},{"Comments":"CZE","name":"Czech Republic"},{"Comments":"DOM","name":"Dominican Republic"},{"Comments":"SVK","name":"Slovakia"},{"Comments":"MDA","name":"Moldavia"},{"Comments":"CAF","name":"Central African Republic"},{"Comments":"ZAF","name":"South Africa"},{"Comments":"GTM","name":"Guatemala"},{"Comments":"GUM","name":"Guam"},{"Comments":"GUF","name":"French Guiana"},{"Comments":"GEO","name":"Georgia"},{"Comments":"GUY","name":"Guyana"},{"Comments":"DJI","name":"Djibouti"},{"Comments":"RWA","name":"Rwanda"},{"Comments":"RUS","name":"Russia"},{"Comments":"ROU","name":"Romania"},{"Comments":"COD","name":"Democratic Republic of Congo"},{"Comments":"ZMB","name":"Zambia"},{"Comments":"ZIM","name":"Zimbabwe"},{"Comments":"WSM","name":"Western Samoa"},{"Comments":"ASM","name":"American Samoa"},{"Comments":"SMR","name":"San Marino"},{"Comments":"LCA","name":"St. Lucia"},{"Comments":"LKA","name":"Sri Lanka"},{"Comments":"SVN","name":"Slovenia"},{"Comments":"SGP","name":"Singapore"},{"Comments":"SWZ","name":"Swaziland"},{"Comments":"SYR","name":"Syria"},{"Comments":"SUR","name":"Suriname"},{"Comments":"CHE","name":"Switzerland"},{"Comments":"SLE","name":"Sierra Leone"},{"Comments":"SYC","name":"Seychelles"},{"Comments":"TMP","name":"East Timor"},{"Comments":"SRB","name":"Serbia"},{"Comments":"TJK","name":"Tajikistan"},{"Comments":"GHA","name":"Ghana"},{"Comments":"GIN","name":"Guinea"},{"Comments":"GNQ","name":"Equatorial Guinea"},{"Comments":"GNB","name":"Guinea Bissau"},{"Comments":"VUT","name":"Vanuatu"},{"Comments":"FRA","name":"France"},{"Comments":"PSE","name":"Palestine"},{"Comments":"VEN","name":"Venezuela"},{"Comments":"FIN","name":"Finland"},{"Comments":"FJI","name":"Fiji"},{"Comments":"VNM","name":"Vietnam"},{"Comments":"CYP","name":"Cyprus"},{"Comments":"KGZ","name":"Kyrgyzstan"},{"Comments":"QAT","name":"Qatar"},{"Comments":"CPV","name":"Cape Verde Islands"},{"Comments":"KAZ","name":"Kazakhstan"},{"Comments":"KHM","name":"Cambodia"},{"Comments":"HRV","name":"Croatia"},{"Comments":"CAN","name":"Canada"},{"Comments":"CUB","name":"Cuba"},{"Comments":"CIV","name":"Cote Divoire"},{"Comments":"KOR","name":"South Korea"},{"Comments":"PRK","name":"North Korea"},{"Comments":"CRI","name":"Costa Rica"},{"Comments":"RKS","name":"Kosovo"},{"Comments":"COL","name":"Colombia"},{"Comments":"KIR","name":"Kiribati"},{"Comments":"KEN","name":"Kenya"},{"Comments":"LVA","name":"Latvia"},{"Comments":"LAO","name":"Laos"},{"Comments":"LBN","name":"Lebanon"},{"Comments":"LTU","name":"Lithuania"},{"Comments":"LUX","name":"Luxembourg"},{"Comments":"LBY","name":"Libya"},{"Comments":"LBR","name":"Liberia"},{"Comments":"LSO","name":"Lesotho"},{"Comments":"MAC","name":"Macau"},{"Comments":"MKD","name":"Macedonia"},{"Comments":"MWI","name":"Malawi"},{"Comments":"MLT","name":"Malta"},{"Comments":"MLI","name":"Mali"},{"Comments":"MYS","name":"Malaysia"},{"Comments":"MYT","name":"Mayotte"},{"Comments":"MDG","name":"Madagascar"},{"Comments":"EGY","name":"Egypt"},{"Comments":"MNG","name":"Mongolia"},{"Comments":"MRT","name":"Mauritania"},{"Comments":"MUS","name":"Mauritius"},{"Comments":"MOZ","name":"Mozambique"},{"Comments":"MCO","name":"Monaco"},{"Comments":"MSR","name":"Montserrat"},{"Comments":"MMR","name":"Myanmar"},{"Comments":"NAM","name":"Namibia"},{"Comments":"NRU","name":"Nauru"},{"Comments":"NPL","name":"Nepal"},{"Comments":"NGA","name":"Nigeria"},{"Comments":"NIC","name":"Nicaragua"},{"Comments":"NCL","name":"New Caledonia"},{"Comments":"NZL","name":"New Zealand"},{"Comments":"NIU","name":"Niue"},{"Comments":"HTI","name":"Haiti"},{"Comments":"HND","name":"Honduras"},{"Comments":"NLD","name":"Netherlands"},{"Comments":"SHN","name":"St. Helena"},{"Comments":"YUG","name":"Yugoslavia"},{"Comments":"ZWE","name":"Zimbabwe ZWE"},{"Comments":"GBO","name":"United Kingdom GBO"},{"Comments":"GBD","name":"United Kingdom GBD"},{"Comments":"GBS","name":"United Kingdom GBS"},{"Comments":"GBP","name":"United Kingdom GBP"},{"Comments":"GBN","name":"United Kingdom GBN"},{"Comments":"DMA","name":"Dominican DMA"},{"Comments":"XXB","name":"Stateless XXB"},{"Comments":"XXX","name":"Stateless XXX"},{"Comments":"SRB","name":"Serbia 381"},{"Comments":"XXA","name":"Stateless XXA"},{"Comments":"LIE","name":"Liechtenstein"},{"Comments":"COD","name":"Congo COD"}]`
);
function getNationality(code) {
  const nat = nats.filter((x) => x.Comments === code);
  if (nat && nat[0]) return nat[0].name;

  return code;
}

async function getZipEntries(file) {
  return new Promise(async (resolve, reject) => {
    let files = [];
    let zip = await JSZip.loadAsync(file);
    zip.forEach(function (relativePath, zipEntry) {
      files.push(zipEntry);
    });
    resolve(files);
  });
}

function ParseXmlString(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      resolve(result);
    });
  });
}

async function ParseZip(file) {
  return new Promise(async (resolve, reject) => {
    let zipEntries = await getZipEntries(file);
    let record = {};
    let xmlFound = false;
    for (let entry of zipEntries) {
      if (entry.name.includes(".xml")) {
        try {
          xmlFound = true;
          let content = await entry.async("string");
          let json = await ParseXmlString(content);
          let mrz1, mrz2;

          mrz1 = xpath.find(json, "//field[@id='MRZ1']")[0]["$"].fieldvalue;
          mrz2 = xpath.find(json, "//field[@id='MRZ2']")[0]["$"].fieldvalue;

          record = parse([mrz1, mrz2]).fields;
          record.codeLine = mrz1 + mrz2;
        } catch (er) {
          record.failed = true;
        }
      } else if (entry.name.includes("VIZ_FACE")) {
        let image = await entry.async("blob");

        record.image = image;
      }
    }
    if (!xmlFound) {
      record.failed = true;
    }
    resolve(record);
  });
}

function parseDetailsFromTxt(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (result) => {
      let string = reader.result;
      string.replace(/(\r\n|\n|\r)/gm, ""); // I don't know why this doesn't work.
      let mrz1 = string.substring(0, 44),
        mrz2 = string.substring(45, 89);
      let record = {};
      try {
        let parsed = parse([mrz1, mrz2]);
        record = parsed.fields;
        record.codeLine = mrz1 + mrz2;
      } catch (er) {
        record.failed = true;
      }

      resolve(record);
    };
    reader.readAsText(file);
  });
}

async function getRecords(ComboFiles, ThreeMFiles) {
  return new Promise(async (resolve, reject) => {
    let records = [];
    for (let file of ComboFiles) {
      let record = await ParseZip(file);
      record.id = file.name;
      records.push(record);
    }
    for (let key of Object.keys(ThreeMFiles)) {
      let record = {};
      let detailsFile = ThreeMFiles[key].find((x) => x.name.includes("CODELINE"));
      let imageFile = ThreeMFiles[key].find((x) => x.name.includes("IMAGEPHOTO"));
      if (detailsFile) {
        record = await parseDetailsFromTxt(detailsFile);
      } else {
        record.failed = true;
      }
      if (imageFile) {
        record.image = imageFile;
      }
      postMessage({ type: "debug", data: record });
      record.id = key;
      records.push(record);
    }
    resolve(records);
  });
}

function formatRecord(record) {
  let birthDate = moment(record.birthDate, "YYMMDD");
  if (birthDate.isAfter(moment())) {
    birthDate = birthDate.subtract(100, "years");
  }
  let passExpireDt = moment(record.expirationDate, "YYMMDD");
  if (passExpireDt.isBefore(moment())) {
    passExpireDt = passExpireDt.add(100, "years");
  }

  const formattedRecord = {
    name: record.firstName + " " + record.lastName,
    codeLine: record.codeLine,
    birthDate: birthDate.format(),
    nationality: getNationality(record.nationality),
    gender: record.sex === "female" ? "Female" : "Male",
    passPlaceOfIssue: getNationality(record.issuingState),
    passportNumber: record.documentNumber,
    passExpireDt: passExpireDt.format(),
    createDt: moment().format(),
  };
  formattedRecord.passIssueDt = defaultIssueDate(passExpireDt,formattedRecord);
  return formattedRecord;
}

function defaultIssueDate(passExpireDt,record) {
  let issueDate;
  const age = moment().diff(record.birthDate, 'years')
  switch (record.nationality) {
    case "United States":
    case "France":
    case "Italy":
    case "India":
    case "Austria":
    case "South Africa":
    case "Algeria":
      if (age < 19 && age > 0) {
        issueDate = passExpireDt.subtract(5, 'years').add(1, 'days');
      }

      break;
    case "Canada":
      issueDate = passExpireDt.subtract(5, 'years')
      if (issueDate.isAfter(moment())) {
        issueDate = passExpireDt.subtract(10, 'years')
      }
      break;
    case "Thailand":
    case "Palestine":
    case "Jordan":
    case "Nigeria":
    case "Tunisia":
    case "Belgium":
    case "Brunei":
    case "Cote Divoire":
      issueDate = passExpireDt.subtract(5, 'years').add(1, 'days');
      break;
    case "Egypt":
    case "EGY":
      issueDate = passExpireDt.subtract(7, 'years').add(1, 'days');
      break;
    case "Morocco":
    case "Maldives":
    case "Malaysia":
      issueDate = passExpireDt.subtract(5, 'years')
      break;
    case "Pakistan":
      issueDate = passExpireDt.subtract(5, 'years').add(1, 'days');
      break;
    case "Iraq":
      issueDate = passExpireDt.subtract(8, 'years').add(1, 'days');
      break;
    case "Azerbaijan":
      break;
    default:
      if (age > 10) {
        issueDate = passExpireDt.subtract(10, 'years');
      }
      else if (age > 5) {
        issueDate = passExpireDt.subtract(5, 'years');
      }
      else {
        issueDate = passExpireDt.subtract(3, 'years');
      }
      break;
  }

  return issueDate.format();
}
onmessage = async (msg) => {
  let files = msg.data.files;
  // let packageName = msg.data.packageName;
  let ThreeMFiles = {};
  let ComboFiles = [];
  postMessage("labas");
  for (const file of files) {
    if (file.type === "application/x-zip-compressed" || file.type === "application/zip") {
      postMessage({ type: "debug", data: file });
      ComboFiles.push(file);
    } else {
      let index = file.name.split("-")[0];
      if (index in ThreeMFiles) {
        ThreeMFiles[index].push(file);
      } else {
        ThreeMFiles[index] = [file];
      }
    }
  }
  postMessage({
    type: "found different customers",
    data: [
      ...Object.keys(ThreeMFiles).map((x) => x),
      ...Object.values(ComboFiles).map((x) => x.name),
    ],
  });
  let records = await getRecords(ComboFiles, ThreeMFiles);
  for (let record of records) {
    postMessage({ type: "debug", data: record });
    if (record.failed) {
      postMessage({ type: "record failed", id: record.id });
    } else {
      let formattedRecord = formatRecord(record);
      formattedRecord.image = record.image;
      postMessage({
        type: "import prepared",
        import: formattedRecord,
        id: record.id,
      });
    }
  }

  postMessage("ate");
};
