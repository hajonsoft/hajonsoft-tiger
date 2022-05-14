const jszip = require("jszip");
var parseString = require("xml2js").parseString;
var xpath = require("xml2js-xpath");
const parse = require("mrz").parse;
var moment = require("moment");
const { v4: uuidv4 } = require('uuid');

const { nationalities } = require("../data/nationality");

function getNationality(code) {
  const nat = nationalities.find((x) => x.code === code);
  if (nat) return nat.name;

  return code;
}

async function getZipEntries(file) {
  return new Promise(async (resolve, reject) => {
    let files = [];
    let zip = await jszip.loadAsync(file);
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
    const qualityPhotoRegex = /vxgen[0-9]{3,6}\.jp2/i;
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
          record = { ...record, ...parsedData };
          record.codeLine = mrz1 + mrz2;
        } catch (er) {
          record.failed = true;
        }
      } else if (
        entry.name.includes("VIZ_FACE") &&
        !zipEntries.find((entryRecord) => entryRecord.name === "RFID_FACE")
      ) {
        //  && !zipEntries.find(oneZipEntry => oneZipEntry.name.match(qualityPhotoRegex))) {
        let image = await entry.async("blob");
        record.image = image;
        // } else if (entry.name.match(qualityPhotoRegex)) {
        //   let qualityImage = await entry.async("blob");
        //   record.vxgenPhoto = qualityImage; // This is the high quality image but since it is in jp2 format and we can't convert from jp2 to jpg on the browser. we will ignore it for now
      } else if (entry.name.includes("RFID_FACE")) {
        let image = await entry.async("blob");
        record.image = image;
      } else if (entry.name.includes("image3")) {
        let passportImage = await entry.async("blob");
        record.passportImage = passportImage;
      } else if (entry.name.includes("image2")) {
        let passportImage = await entry.async("blob");
        record.passportImage = passportImage;
      } else if (entry.name.includes("image1")) {
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

function parseDetailsFromTxt(codelineFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (result) => {
      let codeLine = reader.result;
      let record = {};
      try {
        codeLine = codeLine
          .replace("/\r\n/", "")
          .replace("/\n/", "")
          .replace("/\r/", "");
        let mrz1 = codeLine.substring(0, 44),
          mrz2 = codeLine.substring(45, 89);
        let parsed = parse([mrz1, mrz2]);
        record = parsed.fields;
        record.codeLine = mrz1 + mrz2;
      } catch (er) {
        record.failed = true;
      }

      resolve(record);
    };
    reader.readAsText(codelineFile);
  });
}

function parseEagleFromJSON(eagleFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (result) => {
      let eagleDataRaw = reader.result;
      let eagleData = JSON.parse(eagleDataRaw);
      let eagleRecord = {};
      try {
        eagleRecord.passIssueDt = eagleData.passIssueDt;
        eagleRecord.comments = eagleData.comments;
      } catch (er) {
        eagleRecord.failed = true;
      }

      resolve(eagleRecord);
    };
    reader.readAsText(eagleFile);
  });
}

async function getRecords(ComboFiles, drop3MBinder) {
  return new Promise(async (resolve, reject) => {
    let records = [];
    for (let file of ComboFiles) {
      let record = await ParseZip(file);
      record.id = file.name;
      records.push(record);
    }
    for (let key of Object.keys(drop3MBinder)) {
      let record = {};
      let detailsFile = drop3MBinder[key].find((x) =>
        x.name.match(/CODELINE/i)
      );
      let eagleFile = drop3MBinder[key].find((x) => x.name.match(/EAGLE/i));
      let photo = drop3MBinder[key].find((x) => x.name.match(/SCDG2_PHOTO/i));
      if (!photo) {
        photo = drop3MBinder[key].find((x) => x.name.match(/IMAGEPHOTO/i));
      }
      let threeMPassportImage = drop3MBinder[key].find((x) =>
        x.name.match(/IMAGEVIS/i)
      );
      if (detailsFile) {
        record = await parseDetailsFromTxt(detailsFile);
      } else {
        record.failed = true;
      }
      if (eagleFile){
        const eagleRecord = await parseEagleFromJSON(eagleFile);
        record = { ...record, ...eagleRecord };
      }

      if (photo) {
        record.image = photo;
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

function getComments(comments) {
  if (!comments) {
    return "";
  }
  if (Array.isArray(comments)) {
    return comments.join("\n");
  } 
  return comments;
}

function formatRecord(record) {
  let birthDate = moment(record.birthDate, "YYMMDD");
  if (birthDate.isAfter(moment())) {
    birthDate = birthDate.subtract(100, "years");
  }
  const comments = getComments(record.comments);
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
    passIssueDt: record.passIssueDt,
    createDt: moment().format(),
    comments,
  };
  formattedRecord.passIssueDt = defaultIssueDate(passExpireDt, formattedRecord);
  return formattedRecord;
}

function defaultIssueDate(passExpireDt, record) {
  console.log('%cMyProject%cline:205%crecord', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(17, 63, 61);padding:3px;border-radius:2px', record)
  if (record.passIssueDt){
    return record.passIssueDt;
  }
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
      if (age > 0 && age < 19) {
        issueDate = passExpireDt.subtract(5, "years").add(1, "days");
      }
      issueDate = passExpireDt.subtract(10, "years").add(1, "days");
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
    } else if (/^[0-9]+-[A-Za-z]/.test(file.name)) {
      let index = file.name.split("-")[0];
      if (index in ThreeMFiles) {
        ThreeMFiles[index].push(file);
      } else {
        ThreeMFiles[index] = [file];
      }
    } else {
      // Upload one image file as a full customer. Customer name is the image name
      const uniqueNumber = uuidv4();
      // Passport number and nationality should not change later otherwise the photo and passport images will disappear
      const fileName = file.name.replace(/[^A-Za-z0-9 ]/, " ");
      const record = {
        id: uniqueNumber,
        birthDate: "701026",
        expirationDate: "251026",
        nationality: "Stateless XXX",
        firstName: fileName,
        lastName: "image file",
        codeLine: "",
        documentNumber: uniqueNumber,
        issuingState: "Stateless",
        comments: `imported from ${file.name}`,
      };
      let formattedRecord = formatRecord(record);
      // formattedRecord.image = file;
      formattedRecord.passportImage = file;
      postMessage({
        type: "import prepared",
        import: formattedRecord,
        id: uniqueNumber,
      });
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
