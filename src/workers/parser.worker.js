const jszip = require("jszip");
var parseString = require("xml2js").parseString;
var xpath = require("xml2js-xpath");
const parse = require("mrz").parse;
var moment = require("moment");
const {nationalities} = require("../data/nationality");

function getNationality(code) {
  const nat = nationalities.find((x) => x.code === code);
  if (nat) return nat.name;

  return code;
}

async function getZipEntries(file) {
  return new Promise(async (resolve, reject) => {
    let files = [];
    let zip = await jszip.loadAsync(file);
    zip.forEach(function(relativePath, zipEntry) {
      files.push(zipEntry);
    });
    resolve(files);
  });
}

function ParseXmlString(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function(err, result) {
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

          const parsedData = parse([mrz1, mrz2]).fields;
          record = {...record, ...parsedData};
          record.codeLine = mrz1 + mrz2;
        } catch (er) {
          record.failed = true;
        }
      } else if (entry.name.includes("VIZ_FACE")) {
        let image = await entry.async("blob");
        record.image = image;
      } else if (entry.name.includes("image3")) {
        let passportImage = await entry.async("blob");
        record.passportImage = passportImage;
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
      let detailsFile = ThreeMFiles[key].find((x) =>
        x.name.includes("CODELINE")
      );
      let imageFile = ThreeMFiles[key].find((x) =>
        x.name.includes("IMAGEPHOTO")
      );
      let threeMPassportImage = ThreeMFiles[key].find((x) =>
      x.name.includes("IMAGEVIS")
    );
      if (detailsFile) {
        record = await parseDetailsFromTxt(detailsFile);
      } else {
        record.failed = true;
      }
      if (imageFile) {
        record.image = imageFile;
      }
      if (threeMPassportImage) {
        record.passportImage = threeMPassportImage;
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
const nationality = getNationality(record.nationality);
  const formattedRecord = {
    name: record.firstName + " " + record.lastName,
    codeLine: record.codeLine,
    birthDate: birthDate.format(),
    nationality,
    birthPlace: nationality,
    gender: record.sex === "female" ? "Female" : "Male",
    passPlaceOfIssue: getNationality(record.issuingState),
    passportNumber: record.documentNumber,
    passExpireDt: passExpireDt.format(),
    createDt: moment().format(),
  };
  formattedRecord.passIssueDt = defaultIssueDate(passExpireDt, formattedRecord);
  return formattedRecord;
}

function defaultIssueDate(passExpireDt, record) {
  let issueDate;
  const age = moment().diff(record.birthDate, "years");
  switch (record.nationality) {
    case "United States":
    case "France":
    case "Italy":
    case "India":
    case "Austria":
    case "South Africa":
    case "Algeria":
      if (age < 19 && age > 0) {
        issueDate = passExpireDt.subtract(5, "years").add(1, "days");
      }

      break;
    case "Canada":
      issueDate = passExpireDt.subtract(5, "years");
      if (issueDate.isAfter(moment())) {
        issueDate = passExpireDt.subtract(10, "years");
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
      issueDate = passExpireDt.subtract(5, "years").add(1, "days");
      break;
    case "Egypt":
    case "EGY":
      issueDate = passExpireDt.subtract(7, "years").add(1, "days");
      break;
    case "Morocco":
    case "Maldives":
    case "Malaysia":
      issueDate = passExpireDt.subtract(5, "years");
      break;
    case "Pakistan":
      issueDate = passExpireDt.subtract(5, "years").add(1, "days");
      break;
    case "Iraq":
      issueDate = passExpireDt.subtract(8, "years").add(1, "days");
      break;
    case "Azerbaijan":
      break;
    default:
      if (age > 10) {
        issueDate = passExpireDt.subtract(10, "years");
      } else if (age > 5) {
        issueDate = passExpireDt.subtract(5, "years");
      } else {
        issueDate = passExpireDt.subtract(3, "years");
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
    if (
      file.type === "application/x-zip-compressed" ||
      file.type === "application/zip"
    ) {
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
      formattedRecord.passportImage = record.passportImage;
      postMessage({
        type: "import prepared",
        import: formattedRecord,
        id: record.id,
      });
    }
  }

  postMessage("ate");
};
