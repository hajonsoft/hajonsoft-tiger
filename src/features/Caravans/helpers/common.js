import jszip from "jszip";
import moment from "moment";
import { nationalities } from "../../../data/nationality";
import firebase from "../../../firebaseapp";
import { createCodeLine } from "../../../shared/util/codeline";
import { nameParts } from "../../../shared/util/name";

const storage = firebase.storage();

export function getPassengersJSON(passengers, data) {
  let packageTravelers;
  if (data && data.name) {
    const packageName = data.name;
    packageTravelers = passengers[packageName];
  } else {
    packageTravelers = passengers;
  }
  let sortedTravelers;
  const adultMales = packageTravelers.filter(traveler => traveler.gender === "Male" && moment().diff(traveler.birthDate, 'years') > 18).sort((a, b) => moment(a.birthDate).isAfter(b.birthDate) ? 1 : -1); //oldest first
  const adultFemales = packageTravelers.filter(traveler => traveler.gender !== "Male" && moment().diff(traveler.birthDate, 'years') > 18).sort((a, b) => moment(a.birthDate).isAfter(b.birthDate) ? 1 : -1); //oldest first
  const minors = packageTravelers.filter(traveler => moment().diff(traveler.birthDate, 'years') <= 18).sort((a, b) => moment(a.birthDate).isAfter(b.birthDate) ? 1 : -1); //oldest first
  sortedTravelers = adultMales || [];
  sortedTravelers.push(...adultFemales);
  sortedTravelers.push(...minors);

  const exportData = sortedTravelers.map((passenger) => {
    const _nameParts = nameParts(passenger.name);
    let _nameArabicParts = nameParts(passenger.nameArabic);
    if (_nameArabicParts[0] === "invalid") {
      _nameArabicParts = ["", "", "", ""];
    }

    const codeLine = passenger?.codeLine?.trim() || createCodeLine(passenger);
    if (!codeLine){
      return '';
    }
    const issuerCode = codeLine?.substring(2, 5);

    return {
      slug: `${passenger.name} ${moment().diff(moment(passenger.birthDate), "years", true)
        .toFixed(2)} ${passenger.gender} ${passenger.nationality}`,
      nationality: {
        name: passenger.nationality,
        code: nationalities.find((x) => x.name === passenger.nationality)?.code,
        telCode: nationalities.find((x) => x.name === passenger.nationality)?.telCode,
        isArabic: nationalities.find((x) => x.name === passenger.nationality)?.isArabic,
      },
      issuer: {
        name: nationalities.find((x) => x.code === issuerCode)?.name,
        code: issuerCode,
        telCode: nationalities.find((x) => x.code === issuerCode)?.telCode,
      },
      name: {
        full: passenger.name.replace(/[^A-Z ]/g, " ")?.trim(),
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
      idIssueDt: {
        dmy: moment(passenger.idNumberIssueDate).format("DD/MM/YYYY"),
        dmmmy: moment(passenger.idNumberIssueDate).format("DD-MMM-YYYY"),
        dd: moment(passenger.idNumberIssueDate).format("DD"),
        mm: moment(passenger.idNumberIssueDate).format("MM"),
        mmm: moment(passenger.idNumberIssueDate).format("MMM"),
        yyyy: moment(passenger.idNumberIssueDate).format("YYYY"),
      },
      idExpireDt: {
        dmy: moment(passenger.isNumberExpireDate).format("DD/MM/YYYY"),
        dmmmy: moment(passenger.isNumberExpireDate).format("DD-MMM-YYYY"),
        dd: moment(passenger.isNumberExpireDate).format("DD"),
        mm: moment(passenger.isNumberExpireDate).format("MM"),
        mmm: moment(passenger.isNumberExpireDate).format("MMM"),
        yyyy: moment(passenger.isNumberExpireDate).format("YYYY"),
      },
      birthPlace: passenger.birthPlace,
      profession: passenger.profession || 'unknown',
      address: passenger.address || '123 utopia street',
      passportNumber: passenger.passportNumber,
      idNumber: passenger.idNumber,
      mofaNumber: passenger.mofaNumber,
      eNumber: passenger.eNumber,
      placeOfIssue: passenger.passPlaceOfIssue,
      codeline: codeLine,
    };
  });

  return exportData.filter(d => d && d !== '');
}

export async function zipWithPhotos(data, packageData) {
  var zip = new jszip();
  let passengers;
  if (packageData && packageData.name) {
    passengers = data[packageData.name];
  } else {
    passengers = data.travellers;
  }
  passengers = passengers.filter(d=> d && d !== '');
  const travelersCount = passengers.length;
  for (let index = 0; index < travelersCount; index++) {
    const traveler = passengers[index];
    let [photoUrl, passportUrl, vaccineUrl, idUrl, vaccine2Url] = await Promise.all([
      getStorageUrl(
      `${traveler.nationality.name}/${traveler.passportNumber}.jpg`
    ),
    getStorageUrl(
      `${traveler.nationality.name}/${traveler.passportNumber}_passport.jpg`
    ),
    getStorageUrl(
      `${traveler.nationality.name}/${traveler.passportNumber}_vaccine.jpg`
    ),
    getStorageUrl(
      `${traveler.nationality.name}/${traveler.passportNumber}_id.jpg`
    ),
    getStorageUrl(
      `${traveler.nationality.name}/${traveler.passportNumber}_vaccine2.jpg`
    )
    ]);
    if (!photoUrl) {
      photoUrl = 'https://via.placeholder.com/200';
    }

    if (!passportUrl){
      passportUrl = 'https://via.placeholder.com/400x300';
    }
    if (!idUrl){
      idUrl = 'https://via.placeholder.com/400x300';
    }
    if (!vaccineUrl) {
      vaccineUrl = passportUrl;
    }
    if (!vaccine2Url) {
      vaccine2Url = passportUrl;
    }
    traveler.images = {
      photo: photoUrl,
      passport: passportUrl,
      id: idUrl,
      vaccine: vaccineUrl,
      vaccine2: vaccine2Url,
    };
  }

  const jsonData = JSON.stringify(data);
  zip.file("data.json", jsonData);
  return zip;
}

export const getStorageUrl = async (blobPath) => {
  try {
    const blobRef = storage.ref(blobPath);
    const blobUrl = await blobRef.getDownloadURL();
    //TODO: Store the url back to the traveller
    return blobUrl;
  } catch (err) {
    console.log(
      "%c 🍚 err: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      err
    );
  }
};
