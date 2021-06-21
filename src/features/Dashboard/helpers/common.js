import jszip from "jszip";
import moment from "moment";
import { nationalities } from "../../../data/nationality";
import firebase from "../../../firebaseapp";
import { nameParts } from "../../../util/nameParts";

const storage = firebase.storage();

export function getTravellersJSON(travellers, data) {
  let packageTravellers;
  if (data && data.name) {
    const packageName = data.name;
    packageTravellers = travellers[packageName];
  } else {
    packageTravellers = travellers;
  }
  const exportData = packageTravellers.map((t) => {
    const _nameParts = nameParts(t.name);
    let _nameArabicParts = nameParts(t.nameArabic);
    if (_nameArabicParts[0] === "invalid") {
      _nameArabicParts = ["", "", "", ""];
    }
    const issuerCode = t.codeLine?.substring(2, 5);

    return {
      nationality: {
        name: t.nationality,
        code: nationalities.find((x) => x.name === t.nationality)?.code,
        telCode: nationalities.find((x) => x.name === t.nationality)?.telCode,
      },
      issuer: {
        name: nationalities.find((x) => x.code === issuerCode)?.name,
        code: issuerCode,
        telCode: nationalities.find((x) => x.code === issuerCode)?.telCode,
      },
      name: {
        full: t.name.replace(/[^A-Z ]/g, " "),
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
      dob: {
        dmy: moment(t.birthDate).format("DD/MM/YYYY"),
        dmmmy: moment(t.birthDate).format("DD-MMM-YYYY"),
        dd: moment(t.birthDate).format("DD"),
        mm: moment(t.birthDate).format("MM"),
        mmm: moment(t.birthDate).format("MMM"),
        yyyy: moment(t.birthDate).format("YYYY"),
        age: moment()
          .diff(moment(t.birthDate), "years", true)
          .toFixed(2),
      },
      passIssueDt: {
        dmy: moment(t.passIssueDt).format("DD/MM/YYYY"),
        dmmmy: moment(t.passIssueDt).format("DD-MMM-YYYY"),
        dd: moment(t.passIssueDt).format("DD"),
        mm: moment(t.passIssueDt).format("MM"),
        mmm: moment(t.passIssueDt).format("MMM"),
        yyyy: moment(t.passIssueDt).format("YYYY"),
      },
      passExpireDt: {
        dmy: moment(t.passExpireDt).format("DD/MM/YYYY"),
        dmmmy: moment(t.passExpireDt).format("DD-MMM-YYYY"),
        dd: moment(t.passExpireDt).format("DD"),
        mm: moment(t.passExpireDt).format("MM"),
        mmm: moment(t.passExpireDt).format("MMM"),
        yyyy: moment(t.passExpireDt).format("YYYY"),
      },
      birthPlace: t.birthPlace,
      profession: t.profession,
      address: t.address,
      passportNumber: t.passportNumber,
      placeOfIssue: t.passPlaceOfIssue,
      codeline: t.codeLine,
    };
  });

  return exportData;
}

export async function zipWithPhotos(data, packageData, setShareProgress) {
  var zip = new jszip();
  let travellerArray;
  if (packageData && packageData.name) {
    travellerArray = data[packageData.name];
  } else {
    travellerArray = data.travellers;
  }
  const travellersCount = travellerArray.length;
  for (let index = 0; index < travellersCount; index++) {
    const traveller = travellerArray[index];
    const photoUrl = await getStorageUrl(
      `${traveller.nationality.name}/${traveller.passportNumber}.jpg`
    );
    const passportUrl = await getStorageUrl(
      `${traveller.nationality.name}/${traveller.passportNumber}_passport.jpg`
    );
    traveller.images = {
      photo: photoUrl,
      passport: passportUrl,
    };
    setShareProgress(
      (s) => (s = { ...s, value: (index / travellersCount) * 100 })
    );
  }
  const jsonData = JSON.stringify(data);
  zip.file("data.json", jsonData);
  return zip;
}

const getStorageUrl = async (blobPath) => {
  try {
    const blobRef = storage.ref(blobPath);
    const blobUrl = await blobRef.getDownloadURL();
    return blobUrl;
  } catch (err) {
    console.log(
      "%c 🍚 err: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      err
    );
  }
};
