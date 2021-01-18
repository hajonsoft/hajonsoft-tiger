import moment from "moment";
import { nameParts } from "../../../util/nameParts";
import JSZip from "jszip";
import firebase from "../../../firebaseapp";
import axios from "axios";

const storage = firebase.storage();

export function getTravellersJSON(travellers, data) {
  let packageTravellers;
  if (data && data.name) {
    const packageName = data.name;
    packageTravellers = travellers[packageName];
  } else {
    packageTravellers = travellers;
  }
  return packageTravellers.map((t) => {
    const _nameParts = nameParts(t.name);
    let _nameArabicParts = nameParts(t.nameArabic);
    if (_nameArabicParts[0] === "invalid") {
      _nameArabicParts = ["", "", "", ""];
    }
    return {
      nationality: { name: t.nationality },
      name: {
        full: t.name.replace(/[^A-Z ]/g,' '),
        first: _nameParts[0],
        last: _nameParts[3],
        father: _nameParts[1],
        grand: _nameParts[2],
      },
      nameArabic: {
        full: t.nameArabic,
        first: _nameArabicParts[0],
        last: _nameArabicParts[3],
        father: _nameArabicParts[1],
        grand: _nameArabicParts[2],
      },
      mobileNumber: t.phone,
      gender: t.gender,
      dob: { dmy: moment(t.birthDate).format("DD/MM/YYYY"), dmmmy: moment(t.birthDate).format("DD-MMM-YYYY") },
      passIssueDt: { dmy: moment(t.passIssueDt).format("DD/MM/YYYY"), dmmmy: moment(t.passIssueDt).format("DD-MMM-YYYY") },
      passExpireDt: { dmy: moment(t.passExpireDt).format("DD/MM/YYYY"), dmmmy: moment(t.passExpireDt).format("DD-MMM-YYYY") },
      birthPlace: t.birthPlace,
      profession: t.profession,
      address: t.address,
      passportNumber: t.passportNumber,
      placeOfIssue: t.passPlaceOfIssue,
      codeline: t.codeLine,
    };
  });
}

export async function zipWithPhotos(
  jsonData,
  travellers,
  packageData,
  setShareProgress
) {
  var zip = new JSZip();
  zip.file("data.json", jsonData);
  var photos = zip.folder("photos");
  var passports = zip.folder("passports");
  let travellerArray;
  if (packageData && packageData.name) {
    travellerArray = travellers[packageData.name];
  } else {
    travellerArray = travellers;
  }
  const travellersCount = travellerArray.length;
  for (let index = 0; index < travellersCount; index++) {
    const traveller = travellerArray[index];
    const photoData = await getStorageBlob(
      `${traveller.nationality}/${traveller.passportNumber}.jpg`
    );
    const passportData = await getStorageBlob(
      `${traveller.nationality}/${traveller.passportNumber}_passport.jpg`
    );
    if (photoData) {
      photos.file(`${traveller.passportNumber}.jpg`, photoData);
    }
    if (passportData) {
      passports.file(`${traveller.passportNumber}.jpg`, passportData);
    }
    setShareProgress(
      (s) => (s = { ...s, value: (index / travellersCount) * 100 })
    );
  }
  return zip;
}

const getStorageBlob = async (blobPath) => {
  try {
    const blobRef = storage.ref(blobPath);
    const blobUrl = await blobRef.getDownloadURL();
    const blobData = await axios.get(blobUrl, { responseType: "blob" });
    return blobData.data;
  } catch (err) {
    console.log(
      "%c 🍚 err: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      err
    );
  }
};
