import jszip from "jszip";
import moment from "moment";
import { nationalities } from "../../../data/nationality";
import firebase from "../../../firebaseapp";
import { createCodeline } from "../../../util/codeline";
import { nameParts } from "../../../util/nameParts";

const storage = firebase.storage();

export function getPassengersJSON(passengers, data) {
  let packageTravellers;
  if (data && data.name) {
    const packageName = data.name;
    packageTravellers = passengers[packageName];
  } else {
    packageTravellers = passengers;
  }
  const exportData = packageTravellers.map((passenger) => {
    const _nameParts = nameParts(passenger.name);
    let _nameArabicParts = nameParts(passenger.nameArabic);
    if (_nameArabicParts[0] === "invalid") {
      _nameArabicParts = ["", "", "", ""];
    }
    const issuerCode = passenger.codeLine?.substring(2, 5);

    return {
      nationality: {
        name: passenger.nationality,
        code: nationalities.find((x) => x.name === passenger.nationality)?.code,
        telCode: nationalities.find((x) => x.name === passenger.nationality)?.telCode,
      },
      issuer: {
        name: nationalities.find((x) => x.code === issuerCode)?.name,
        code: issuerCode,
        telCode: nationalities.find((x) => x.code === issuerCode)?.telCode,
      },
      name: {
        full: passenger.name.replace(/[^A-Z ]/g, " "),
        given: _nameParts.slice(0, -1).join(' ').trim(),
        first: _nameParts[0],
        last: _nameParts[3],
        father: _nameParts[1],
        grand: _nameParts[2],
      },
      nameArabic: {
        full: passenger.nameArabic,
        given: _nameArabicParts.slice(0, -1).join(' '),
        first: _nameArabicParts[0],
        last: _nameArabicParts[3],
        father: _nameArabicParts[1],
        grand: _nameArabicParts[2],
      },
      mobileNumber: passenger.phone,
      gender: passenger.gender,
      dob: {
        dmy: moment(passenger.birthDate).format("DD/MM/YYYY"),
        dmmmy: moment(passenger.birthDate).format("DD-MMM-YYYY"),
        dd: moment(passenger.birthDate).format("DD"),
        mm: moment(passenger.birthDate).format("MM"),
        mmm: moment(passenger.birthDate).format("MMM"),
        yyyy: moment(passenger.birthDate).format("YYYY"),
        age: moment()
          .diff(moment(passenger.birthDate), "years", true)
          .toFixed(2),
      },
      passIssueDt: {
        dmy: moment(passenger.passIssueDt).format("DD/MM/YYYY"),
        dmmmy: moment(passenger.passIssueDt).format("DD-MMM-YYYY"),
        dd: moment(passenger.passIssueDt).format("DD"),
        mm: moment(passenger.passIssueDt).format("MM"),
        mmm: moment(passenger.passIssueDt).format("MMM"),
        yyyy: moment(passenger.passIssueDt).format("YYYY"),
      },
      passExpireDt: {
        dmy: moment(passenger.passExpireDt).format("DD/MM/YYYY"),
        dmmmy: moment(passenger.passExpireDt).format("DD-MMM-YYYY"),
        dd: moment(passenger.passExpireDt).format("DD"),
        mm: moment(passenger.passExpireDt).format("MM"),
        mmm: moment(passenger.passExpireDt).format("MMM"),
        yyyy: moment(passenger.passExpireDt).format("YYYY"),
      },
      birthPlace: passenger.birthPlace,
      profession: passenger.profession || 'unknown',
      address: passenger.address || '123 utopia street',
      passportNumber: passenger.passportNumber,
      placeOfIssue: passenger.passPlaceOfIssue,
      codeline: passenger.codeLine || createCodeline(passenger),
      shortCodeline: (passenger.codeLine || createCodeline(passenger))?.substring(0, 44 + 27),
    };
  });

  return exportData;
}

export async function zipWithPhotos(data, packageData) {
  var zip = new jszip();
  let passengers;
  if (packageData && packageData.name) {
    passengers = data[packageData.name];
  } else {
    passengers = data.travellers;
  }
  const travellersCount = passengers.length;
  for (let index = 0; index < travellersCount; index++) {
    const traveller = passengers[index];
    const photoUrl = await getStorageUrl(
      `${traveller.nationality.name}/${traveller.passportNumber}.jpg`
    );
    const passportUrl = await getStorageUrl(
      `${traveller.nationality.name}/${traveller.passportNumber}_passport.jpg`
    );
    let vaccineUrl = await getStorageUrl(
      `${traveller.nationality.name}/${traveller.passportNumber}_vaccine.jpg`
    );
    if (!vaccineUrl) {
      vaccineUrl = passportUrl;
    }
    traveller.images = {
      photo: photoUrl,
      passport: passportUrl,
      vaccine: vaccineUrl,
    };
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
