import { CircularProgress, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import _ from "lodash";
import moment from "moment-hijri";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import React from "react";
import saveAs from "save-as";
import HotelPreview from "../../../assets/hotel.png";
import HotelHolyPreview from "../../../assets/hotel_holy.png";
import HotelWavePreview from "../../../assets/hotel_wave.png";
import OtagoPreview from "../../../assets/otago.png";
import OtagoBasicPreview from "../../../assets/otago_basic.png";
import OtagoBlurPreview from "../../../assets/otago_blur.png";
import OtagoLeafPreview from "../../../assets/otago_leaf.png";
import OtagoMadinahPreview from "../../../assets/otago_madinah.png";
import verticalBlank from "../../../assets/vertical_blank.png";
import bracelet from "../../../assets/bracelet.jpg";
import id4x4 from "../../../assets/id4x4.jpg";
import firebase from "../../../firebaseapp";
import t from "../../../shared/util/trans";
import S from "./styles";

const getIDPositionProps = (idType) => {
  if (idType.includes("otago")) {
    return {
      umrah: {
        x: 15,
        y: 15,
      },
      year: {
        x: 15,
        y: 30,
      },
      image: {
        x: 15,
        y: 40,
      },
      fullName: {
        x: 10,
        y: 125,
      },
      passportNumber: {
        x: 195,
        y: 125,
      },
      passportLabel: {
        x: 165,
        y: 125,
      },
      tripName: {
        x: 120,
        y: 83,
      },
      countryFlag: {
        x: 200,
        y: 155,
      },
      caravanLogo: {
        x: 180,
        y: 70,
      },
      telephone: {
        x: 120,
        y: 107,
      },
    };
  } else if (idType.includes("hotel")) {
    return {
      image: {
        x: 9,
        y: 85,
      },
      firstName: {
        x: 130,
        y: 32,
      },
      lastName: {
        x: 130,
        y: 20,
      },
      passportNumber: {
        x: 130,
        y: 44,
      },
      tripName: {
        x: 130,
        y: 54,
      },
      medinahHotel: {
        x: 10,
        y: 105,
      },
      mekahHotel: {
        x: 128,
        y: 105,
      },
      telephone: {
        x: 110,
        y: 140,
      },
    };
  } else if (idType.includes("vertical")) {
    return {
      verticalCaravanLogo: {
        x: 25,
        y: 190,
      },
      verticalCaravanName: {
        x: 5,
        y: 120,
      },
      verticalImage: {
        x: 60,
        y: 75,
      },
      verticalName: {
        x: 60,
        y: 62,
      },
      verticalPassportNumber: {
        x: 10,
        y: 50,
      },
      verticalPhoneNumber: {
        x: 10,
        y: 35,
      },
      verticalMedinahHotel: {
        x: 10,
        y: 19,
      },
      verticalMekahHotel: {
        x: 10,
        y: 4,
      },
      verticalCountryLogo: {
        x: 2,
        y: 153,
      },
      verticalBackground: {
        x: 0,
        y: 0,
      },
    };
  } else if (idType.includes("id4x4")) {
    return {
      "telephone-0": {
        x: 20,
        y: 50,
      },
      "telephone-1": {
        x: 310,
        y: 50,
      },
      "telephone-2": {
        x: 20,
        y: 410,
      },
      "telephone-3": {
        x: 310,
        y: 410,
      },
      "flag-0": {
        x: 180,
        y: 100,
      },
      "flag-1": {
        x: 460,
        y: 100,
      },
      "flag-2": {
        x: 180,
        y: 460,
      },
      "flag-3": {
        x: 460,
        y: 460,
      },
      "caravanLogo-0": {
        x: 30,
        y: 100,
      },
      "caravanLogo-1": {
        x: 320,
        y: 100,
      },
      "caravanLogo-2": {
        x: 30,
        y: 460,
      },
      "caravanLogo-3": {
        x: 320,
        y: 460,
      },
      "caravanName-0": {
        x: 100,
        y: 75,
      },
      "caravanName-1": {
        x: 380,
        y: 75,
      },
      "caravanName-2": {
        x: 100,
        y: 440,
      },
      "caravanName-3": {
        x: 380,
        y: 440,
      },
      "fullName-0": {
        x: 150,
        y: 110,
      },
      "fullName-1": {
        x: 430,
        y: 110,
      },
      "fullName-2": {
        x: 150,
        y: 470,
      },
      "fullName-3": {
        x: 430,
        y: 470,
      },
      "fullNameArabic-0": {
        x: 60,
        y: 130,
      },
      "fullNameArabic-1": {
        x: 350,
        y: 130,
      },
      "fullNameArabic-2": {
        x: 60,
        y: 490,
      },
      "fullNameArabic-3": {
        x: 350,
        y: 490,
      },
      "passportImage-0": {
        x: 50,
        y: 230,
      },
      "passportImage-1": {
        x: 340,
        y: 230,
      },
      "passportImage-2": {
        x: 50,
        y: 590,
      },
      "passportImage-3": {
        x: 340,
        y: 590,
      },
      "passportNumber-0": {
        x: 125,
        y: 160,
      },
      "passportNumber-1": {
        x: 410,
        y: 160,
      },
      "passportNumber-2": {
        x: 125,
        y: 520,
      },
      "passportNumber-3": {
        x: 410,
        y: 520,
      },
      "passportExpiryDate-0": {
        x: 125,
        y: 180,
      },
      "passportExpiryDate-1": {
        x: 410,
        y: 180,
      },
      "passportExpiryDate-2": {
        x: 125,
        y: 540,
      },
      "passportExpiryDate-3": {
        x: 410,
        y: 540,
      },
      "birthDate-0": {
        x: 125,
        y: 192,
      },
      "birthDate-1": {
        x: 410,
        y: 192,
      },
      "birthDate-2": {
        x: 125,
        y: 550,
      },
      "birthDate-3": {
        x: 410,
        y: 550,
      },
      "flightNumber-0": {
        x: 135,
        y: 210,
      },
      "flightNumber-1": {
        x: 418,
        y: 210,
      },
      "flightNumber-2": {
        x: 140,
        y: 562,
      },
      "flightNumber-3": {
        x: 418,
        y: 562,
      },
      "flightDate-0": {
        x: 140,
        y: 222,
      },
      "flightDate-1": {
        x: 420,
        y: 222,
      },
      "flightDate-2": {
        x: 135,
        y: 585,
      },
      "flightDate-3": {
        x: 420,
        y: 585,
      },
      "medinah-0": {
        x: 100,
        y: 245,
      },
      "medinah-1": {
        x: 380,
        y: 245,
      },
      "medinah-2": {
        x: 100,
        y: 605,
      },
      "medinah-3": {
        x: 380,
        y: 605,
      },
      "mekah-0": {
        x: 100,
        y: 258,
      },
      "mekah-1": {
        x: 380,
        y: 258,
      },
      "mekah-2": {
        x: 100,
        y: 620,
      },
      "mekah-3": {
        x: 380,
        y: 620,
      },
      "hajDate-0": {
        x: 100,
        y: 270,
      },
      "hajDate-1": {
        x: 380,
        y: 270,
      },
      "hajDate-2": {
        x: 100,
        y: 632,
      },
      "hajDate-3": {
        x: 380,
        y: 632,
      },
      "hajDate2-0": {
        x: 182,
        y: 335,
      },
      "hajDate2-1": {
        x: 467,
        y: 335,
      },
      "hajDate2-2": {
        x: 182,
        y: 690,
      },
      "hajDate2-3": {
        x: 467,
        y: 690,
      },
      "flag2-0": {
        x: 170,
        y: 320,
      },
      "flag2-1": {
        x: 460,
        y: 320,
      },
      "flag2-2": {
        x: 170,
        y: 675,
      },
      "flag2-3": {
        x: 460,
        y: 675,
      },
      "passportImage2-0": {
        x: 200,
        y: 320,
      },
      "passportImage2-1": {
        x: 490,
        y: 320,
      },
      "passportImage2-2": {
        x: 200,
        y: 675,
      },
      "passportImage2-3": {
        x: 490,
        y: 675,
      },
      "passengerNumber-0": {
        x: 100,
        y: 320,
      },
      "passengerNumber-1": {
        x: 400,
        y: 320,
      },
      "passengerNumber-2": {
        x: 100,
        y: 675,
      },
      "passengerNumber-3": {
        x: 400,
        y: 675,
      },
    };
  } else if (idType.includes("bracelet")) {
    return {
      verticalCaravanLogo: {
        x: 25,
        y: 190,
      },
      verticalCaravanName: {
        x: 5,
        y: 120,
      },
      image: {
        x: 150,
        y: 5,
      },
      fullName: {
        x: 230,
        y: 15,
      },
      passportNumber: {
        x: 230,
        y: 25,
      },
      telephone: {
        x: 400,
        y: 50,
      },
      medinahHotel: {
        x: 230,
        y: 40,
      },
      mekahHotel: {
        x: 230,
        y: 50,
      },
      birthDate: {
        x: 400,
        y: 25,
      },
    };
  }
};

async function getAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    // Register event listeners
    reader.addEventListener("loadend", (e) => resolve(e.target.result));
    reader.addEventListener("error", reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

const IDCard = ({ passengers, caravanName }) => {
  const [previewURL, setPreviewURL] = React.useState(null);
  const [companyLogo, setCompanyLogo] = React.useState();
  const [downloading, setDownloading] = React.useState(false);
  const [cardBackgroundColor, setCardBackgroundColor] =
    React.useState("r255g255b255");

  const downloadFiles = (pdfBytes, cb) => {
    const zip = new JSZip();
    let count = 0;

    pdfBytes.forEach(function (url, idx) {
      const filename = `${caravanName}-${idx}`;
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip.file(filename + ".pdf", data, { binary: true });
        count++;
        if (count === pdfBytes.length) {
          zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, caravanName + ".zip");
            cb(true);
          });
        }
      });
    });
  };

  const PDF4x4 = async (fourPassengers, values, caravanName) => {
    // Embed the Helvetica font
    const response = await fetch(`/pdfs/${values.idType}.pdf`);

    const existingPdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    let passengerNumber = 1;

    for (let i = 0; i < fourPassengers.length; i++) {
      try {
        let imageURL = "";

        try {
          imageURL = await firebase
            .storage()
            .ref(
              `${fourPassengers[i].nationality}/${fourPassengers[i].passportNumber}.jpg`
            )
            .getDownloadURL();
        } catch (err) {
          imageURL = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }

        const { data } = await axios.get("https://flagcdn.com/en/codes.json");

        let countryCode = "";

        for (const key in data) {
          if (
            data[key].toLowerCase() ===
            fourPassengers[i].nationality.toLowerCase()
          ) {
            countryCode = key;
            break;
          }
        }

        let jpgImage = "";

        if (imageURL) {
          const jpgImageBytes = await fetch(imageURL)
            .then((res) => res.arrayBuffer())
            .catch((err) => {});

          jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        }

        const flagImageBytes = await fetch(
          `https://flagcdn.com/32x24/${countryCode}.png`
        )
          .then((res) => res.arrayBuffer())
          .catch((err) => {});

        let flagImage;
        if (flagImageBytes) {
          flagImage = await pdfDoc.embedPng(flagImageBytes);
        }

        let logo;
        if (companyLogo) {
          const companyLogoBytes = await getAsByteArray(companyLogo);

          if (companyLogo.type.split("/")[1].includes("jp")) {
            logo = await pdfDoc.embedJpg(companyLogoBytes);
          } else {
            logo = await pdfDoc.embedPng(companyLogoBytes);
          }
        }

        // TODO: phone number, caravan name, country logo , fullName, passportNumber, issueDate, date of birth, arrival date, hajj year,

        // telephone-0

        // write telephone number
        firstPage.drawText(values?.telNumber, {
          x: getIDPositionProps(values.idType)[`telephone-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`telephone-${i}`].y,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write flag image
        firstPage.drawImage(flagImage, {
          x: getIDPositionProps(values.idType)[`flag-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`flag-${i}`].y,
          width: 40,
          height: 40,
        });

        // write caravan logo
        firstPage.drawImage(logo || jpgImage, {
          x: getIDPositionProps(values.idType)[`caravanLogo-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`caravanLogo-${i}`].y,
          width: 40,
          height: 40,
        });

        // write caravan name
        firstPage.drawText(caravanName, {
          x: getIDPositionProps(values.idType)[`caravanName-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`caravanName-${i}`].y,
          size: 10,
          font: helveticaFont,
          color: rgb(0 / 255, 0 / 255, 0 / 255),
        });

        // write full name
        const nameParts = fourPassengers[i].name.split(" ");
        const shortName = _.head(nameParts) + " " + _.last(nameParts);
        firstPage.drawText(shortName, {
          x: getIDPositionProps(values.idType)[`fullName-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`fullName-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write full name Arabic
        firstPage.drawText(shortName, {
          x: getIDPositionProps(values.idType)[`fullNameArabic-${i}`].x,
          y:
            height - getIDPositionProps(values.idType)[`fullNameArabic-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write passport number
        firstPage.drawText(fourPassengers[i].passportNumber, {
          x: getIDPositionProps(values.idType)[`passportNumber-${i}`].x,
          y:
            height - getIDPositionProps(values.idType)[`passportNumber-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write passport image
        if (jpgImage) {
          firstPage.drawImage(jpgImage, {
            x: getIDPositionProps(values.idType)[`passportImage-${i}`].x,
            y:
              height -
              getIDPositionProps(values.idType)[`passportImage-${i}`].y,
            width: 50,
            height: 65,
          });
        }

        // write passport expiry date
        firstPage.drawText(
          new Date(fourPassengers[i].passExpireDt).toLocaleDateString("en-US"),
          {
            x: getIDPositionProps(values.idType)[`passportExpiryDate-${i}`].x,
            y:
              height -
              getIDPositionProps(values.idType)[`passportExpiryDate-${i}`].y,
            size: 8,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          }
        );

        // write date of birth
        firstPage.drawText(
          new Date(fourPassengers[i].birthDate).toLocaleDateString("en-US"),
          {
            x: getIDPositionProps(values.idType)[`birthDate-${i}`].x,
            y: height - getIDPositionProps(values.idType)[`birthDate-${i}`].y,
            size: 8,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          }
        );

        // write flight number
        firstPage.drawText(passengerNumber.toString(), {
          x: getIDPositionProps(values.idType)[`flightNumber-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`flightNumber-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write date of flight
        firstPage.drawText(values.flightDate, {
          x: getIDPositionProps(values.idType)[`flightDate-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`flightDate-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write hajj date
        firstPage.drawText("Hajj 1443 / 2022", {
          x: getIDPositionProps(values.idType)[`hajDate-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`hajDate-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // write hajj year
        firstPage.drawText("Hajj 1443 / 2022", {
          x: getIDPositionProps(values.idType)[`hajDate2-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`hajDate2-${i}`].y,
          size: 8,
          font: helveticaFont,
          color: rgb(1, 1, 1),
        });

        // write passport image 2
        if (jpgImage) {
          firstPage.drawImage(jpgImage, {
            x: getIDPositionProps(values.idType)[`passportImage2-${i}`].x,
            y:
              height -
              getIDPositionProps(values.idType)[`passportImage2-${i}`].y,
            width: 28,
            height: 28,
          });
        }

        // write flag image 2
        firstPage.drawImage(flagImage, {
          x: getIDPositionProps(values.idType)[`flag2-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`flag2-${i}`].y,
          width: 28,
          height: 28,
        });

        // write Mekah Hotel Name
        firstPage.drawText(values.mekahHotel, {
          x: getIDPositionProps(values.idType)[`mekah-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`mekah-${i}`].y,
          size: 10,
          font: helveticaFont,
          color: rgb(1 / 255, 87 / 255, 155 / 255),
        });

        // write Medinah Hotel Name
        firstPage.drawText(values.medinahHotel, {
          x: getIDPositionProps(values.idType)[`medinah-${i}`].x,
          y: height - getIDPositionProps(values.idType)[`medinah-${i}`].y,
          size: 10,
          font: helveticaFont,
          color: rgb(27 / 255, 94 / 255, 32 / 255),
        });

        // write Medinah Hotel Name
        firstPage.drawText(passengerNumber.toString(), {
          x: getIDPositionProps(values.idType)[`passengerNumber-${i}`].x,
          y:
            height -
            getIDPositionProps(values.idType)[`passengerNumber-${i}`].y,
          size: 40,
          font: helveticaFont,
          color: rgb(27 / 255, 94 / 255, 32 / 255),
        });

        passengerNumber++;
      } catch (err) {
        console.log(err);
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    return url;

    // // write imag
  };

  const createPDF = async (
    idType,
    name,
    passportNumber,
    birthDate,
    tripName,
    nationality,
    telephone,
    medinahHotelName,
    mekahHotelName
  ) => {
    // Embed the Helvetica font
    const response = await fetch(`/pdfs/${idType}.pdf`);
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height, width } = firstPage.getSize();

    let imageURL = "";

    try {
      imageURL = await firebase
        .storage()
        .ref(`${nationality}/${passportNumber}.jpg`)
        .getDownloadURL();
    } catch (err) {}

    const { data } = await axios.get("https://flagcdn.com/en/codes.json");

    let countryCode = "";

    for (const key in data) {
      if (data[key].toLowerCase() === nationality.toLowerCase()) {
        countryCode = key;
        break;
      }
    }

    // write caravan Logo image
    if (getIDPositionProps(idType).verticalBackground !== undefined) {
      firstPage.drawRectangle({
        x: 0,
        y: 0,
        width: 150,
        height: 250,
        color: rgb(
          parseInt(cardBackgroundColor.substring(1, 4)) / 255,
          parseInt(cardBackgroundColor.substring(5, 8)) / 255,
          parseInt(cardBackgroundColor.substring(9)) / 255
        ),
        opacity: 1,
      });
    }

    let jpgImage = "";

    if (imageURL) {
      const jpgImageBytes = await fetch(imageURL)
        .then((res) => res.arrayBuffer())
        .catch((err) => {});

      jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    }

    const flagImageBytes = await fetch(
      `https://flagcdn.com/32x24/${countryCode}.png`
    )
      .then((res) => res.arrayBuffer())
      .catch((err) => {});

    let flagImage;
    if (flagImageBytes) {
      flagImage = await pdfDoc.embedPng(flagImageBytes);
    }

    let logo;
    if (companyLogo) {
      const companyLogoBytes = await getAsByteArray(companyLogo);

      if (companyLogo.type.split("/")[1].includes("jp")) {
        logo = await pdfDoc.embedJpg(companyLogoBytes);
      } else {
        logo = await pdfDoc.embedPng(companyLogoBytes);
      }
    }

    // write image
    if (getIDPositionProps(idType).image !== undefined && jpgImage) {
      firstPage.drawImage(jpgImage, {
        x: getIDPositionProps(idType).image.x,
        y: getIDPositionProps(idType).image.y,
        width: 50,
        height: 65,
      });
    }

    // write image
    if (getIDPositionProps(idType).verticalImage !== undefined && jpgImage) {
      firstPage.drawImage(jpgImage, {
        x: getIDPositionProps(idType).verticalImage.x,
        y: getIDPositionProps(idType).verticalImage.y,
        width: 85,
        height: 110,
      });
    }

    // write caravan Logo image
    if (getIDPositionProps(idType).caravanLogo !== undefined) {
      firstPage.drawImage(logo || jpgImage, {
        x: getIDPositionProps(idType).caravanLogo.x,
        y: height - getIDPositionProps(idType).caravanLogo.y,
        width: 55,
        height: 68,
      });
    }

    // write caravan Logo image
    if (getIDPositionProps(idType).verticalCaravanLogo !== undefined) {
      firstPage.drawImage(logo || jpgImage, {
        x: getIDPositionProps(idType).verticalCaravanLogo.x,
        y: getIDPositionProps(idType).verticalCaravanLogo.y,
        width: 100,
        height: 50,
      });
    }

    if (flagImage) {
      // write flag image
      if (getIDPositionProps(idType).countryFlag !== undefined) {
        firstPage.drawImage(flagImage, {
          x: getIDPositionProps(idType).countryFlag.x,
          y: height - getIDPositionProps(idType).countryFlag.y,
          width: 28,
          height: 28,
        });
      }

      // write vertical country flag logo
      if (getIDPositionProps(idType).verticalCountryLogo !== undefined) {
        firstPage.drawImage(flagImage, {
          x: getIDPositionProps(idType).verticalCountryLogo.x,
          y: getIDPositionProps(idType).verticalCountryLogo.y,
          width: 50,
          height: 30,
        });
      }
    }

    // write vertical nationality
    if (getIDPositionProps(idType).verticalCountryLogo !== undefined) {
      firstPage.drawText(nationality.toUpperCase(), {
        x: getIDPositionProps(idType).verticalCountryLogo.x,
        y: getIDPositionProps(idType).verticalCountryLogo.y - 10,
        size: 12,
        font: helveticaFont,
        color: rgb(240 / 255, 12 / 255, 12 / 255),
      });
    }

    // write vertical caravan name
    if (getIDPositionProps(idType).verticalCaravanName !== undefined) {
      const caravanNameParts = caravanName.trim().split(" ");
      for (let i = 0; i < caravanNameParts.length; i++) {
        firstPage.drawText(caravanNameParts[i], {
          x: getIDPositionProps(idType).verticalCaravanName.x,
          y: getIDPositionProps(idType).verticalCaravanName.y - i * 10,
          size: 10,
          font: helveticaFont,
          color: rgb(0 / 255, 0 / 255, 0 / 255),
        });
      }
    }

    // write UMRAH
    if (getIDPositionProps(idType).umrah !== undefined) {
      firstPage.drawText("UMRAH", {
        x: getIDPositionProps(idType).umrah.x,
        y: height - getIDPositionProps(idType).umrah.y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write UMRAH year
    if (getIDPositionProps(idType).year !== undefined) {
      firstPage.drawText(
        `${new Date().getFullYear()} / ${moment("2022", "YYYY")
          .endOf("iMonth")
          .format("iYYYY")}`,
        {
          x: getIDPositionProps(idType).year.x,
          y: height - getIDPositionProps(idType).year.y,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        }
      );
    }

    // Print a gird
    // for (let x = 0; x < 200; x += 50) {
    //   for (let y = 0; y < 250; y += 50) {
    //     firstPage.drawText('=', { x, y, size: 10, font: helveticaFont });
    //   }
    // }

    // write telephone
    if (getIDPositionProps(idType).telephone !== undefined) {
      firstPage.drawText(telephone, {
        x: getIDPositionProps(idType).telephone.x,
        y: height - getIDPositionProps(idType).telephone.y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write full name
    if (getIDPositionProps(idType).fullName !== undefined) {
      const nameParts = name.split(" ");
      const shortName = _.head(nameParts) + " " + _.last(nameParts);
      firstPage.drawText(shortName, {
        x: getIDPositionProps(idType).fullName.x,
        y: height - getIDPositionProps(idType).fullName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write passport Label
    if (getIDPositionProps(idType).passportLabel !== undefined) {
      firstPage.drawText("PASS #", {
        x: getIDPositionProps(idType).passportLabel.x,
        y: height - getIDPositionProps(idType).passportLabel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write vertical passport Label
    if (getIDPositionProps(idType).verticalPassportNumber !== undefined) {
      firstPage.drawText("Passport No:  " + passportNumber, {
        x: getIDPositionProps(idType).verticalPassportNumber.x,
        y: getIDPositionProps(idType).verticalPassportNumber.y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 77 / 255, 64 / 255),
      });
    }
    // vertical passport label line
    if (getIDPositionProps(idType).verticalPassportNumber !== undefined) {
      firstPage.drawLine({
        start: {
          x: 5,
          y: getIDPositionProps(idType).verticalPassportNumber.y - 5,
        },
        end: {
          x: width - 5,
          y: getIDPositionProps(idType).verticalPassportNumber.y - 5,
        },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }
    // write vertical phone Label
    if (getIDPositionProps(idType).verticalPhoneNumber !== undefined) {
      firstPage.drawText(telephone, {
        x: getIDPositionProps(idType).verticalPhoneNumber.x,
        y: getIDPositionProps(idType).verticalPhoneNumber.y,
        size: 10,
        font: helveticaFont,
        color: rgb(38 / 255, 50 / 255, 56 / 255),
      });
    }
    //write vertical phone label line
    if (getIDPositionProps(idType).verticalPhoneNumber !== undefined) {
      firstPage.drawLine({
        start: {
          x: 5,
          y: getIDPositionProps(idType).verticalPhoneNumber.y - 5,
        },
        end: {
          x: width - 5,
          y: getIDPositionProps(idType).verticalPhoneNumber.y - 5,
        },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }

    // write vertical medinah hotel
    if (getIDPositionProps(idType).verticalMedinahHotel !== undefined) {
      firstPage.drawText(medinahHotelName, {
        x: getIDPositionProps(idType).verticalMedinahHotel.x,
        y: getIDPositionProps(idType).verticalMedinahHotel.y,
        size: 10,
        font: helveticaFont,
        color: rgb(27 / 255, 94 / 255, 32 / 255),
      });
    }
    // vertical medinah hotel line
    if (getIDPositionProps(idType).verticalMedinahHotel !== undefined) {
      firstPage.drawLine({
        start: {
          x: 5,
          y: getIDPositionProps(idType).verticalMedinahHotel.y - 5,
        },
        end: {
          x: width - 5,
          y: getIDPositionProps(idType).verticalMedinahHotel.y - 5,
        },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }

    // write vertical mekha hotel
    if (getIDPositionProps(idType).verticalMekahHotel !== undefined) {
      firstPage.drawText(mekahHotelName, {
        x: getIDPositionProps(idType).verticalMekahHotel.x,
        y: getIDPositionProps(idType).verticalMekahHotel.y,
        size: 10,
        font: helveticaFont,
        color: rgb(1 / 255, 87 / 255, 155 / 255),
      });
    }

    /// write firstName
    if (getIDPositionProps(idType).firstName !== undefined) {
      firstPage.drawText(name.split(" ")[0], {
        x: getIDPositionProps(idType).firstName.x,
        y: height - getIDPositionProps(idType).firstName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write medinah hotel
    if (
      getIDPositionProps(idType)?.medinahHotel !== undefined &&
      medinahHotelName
    ) {
      firstPage.drawText(medinahHotelName, {
        x: getIDPositionProps(idType)?.medinahHotel?.x,
        y: height - getIDPositionProps(idType).medinahHotel.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }
    /// write mekah hotel
    if (
      getIDPositionProps(idType)?.mekahHotel !== undefined &&
      mekahHotelName
    ) {
      firstPage.drawText(mekahHotelName, {
        x: getIDPositionProps(idType)?.mekahHotel?.x,
        y: height - getIDPositionProps(idType)?.mekahHotel?.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write full name
    if (getIDPositionProps(idType).name !== undefined) {
      const nameParts = name.split(" ");
      const shortName = _.head(nameParts) + " " + _.last(nameParts);
      firstPage.drawText(shortName, {
        x: getIDPositionProps(idType).name.x,
        y: height - getIDPositionProps(idType).name.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // write full name
    if (getIDPositionProps(idType).verticalName !== undefined) {
      const nameParts = name.trim().split(" ");
      const shortName = _.head(nameParts) + " " + _.last(nameParts);
      firstPage.drawText(shortName, {
        x: getIDPositionProps(idType).verticalName.x,
        y: getIDPositionProps(idType).verticalName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write lastName
    if (getIDPositionProps(idType).lastName !== undefined) {
      firstPage.drawText(_.last(name.split(" ")), {
        x: getIDPositionProps(idType).lastName.x,
        y: height - getIDPositionProps(idType).lastName.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write passport number
    if (getIDPositionProps(idType).passportNumber !== undefined)
      firstPage.drawText(passportNumber, {
        x: getIDPositionProps(idType).passportNumber.x,
        y: height - getIDPositionProps(idType).passportNumber.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

    /// write birthDate
    if (getIDPositionProps(idType).birthDate !== undefined) {
      firstPage.drawText(new Date(birthDate).toLocaleDateString("en-US"), {
        x: getIDPositionProps(idType).birthDate.x,
        y: height - getIDPositionProps(idType).birthDate.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    /// write trip name
    if (getIDPositionProps(idType).tripName !== undefined) {
      firstPage.drawText(tripName, {
        x: getIDPositionProps(idType)?.tripName?.x,
        y: height - getIDPositionProps(idType)?.tripName?.y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    return url;
  };

  const colorItems = [];
  const minValue = 150;
  for (let r = minValue; r < 255; r += 50) {
    for (let g = minValue; g < 255; g += 50) {
      for (let b = minValue; b < 255; b += 50) {
        colorItems.push({ r, g, b });
      }
    }
  }

  const handleCardColorChange = (e) => {
    setCardBackgroundColor(e.target.value);
  };

  return (
    <S.Container>
      <S.Left>
        <Typography variant="h4" gutterBottom>
          {t("card-options")}
        </Typography>

        <Formik
          enableReinitialize
          initialValues={{
            idType: "",
            reportName: "",
          }}
          onSubmit={async (values, actions) => {
            setDownloading(true);

            let fns;

            if (values.idType === "id4x4") {
              fns = _.chunk(passengers, 4).map(async (fourPassengers) => {
                return await PDF4x4(fourPassengers, values, caravanName);
              });
            } else {
              fns = passengers.map(async (passenger) => {
                return await createPDF(
                  values?.idType,
                  passenger?.name,
                  passenger?.passportNumber,
                  passenger?.birthDate,
                  caravanName,
                  passenger?.nationality,
                  values?.telNumber,
                  values.medinahHotel,
                  values.mekahHotel
                );
              });
            }

            const results = Promise.all(fns);

            results
              .then((data) => {
                downloadFiles(data, (done) => {
                  if (done) {
                    setDownloading(false);
                  }
                });
              })
              .catch((err) => {
                console.log(err, "this is an error");
                alert("An error occurred!! - " + err.message);
                setDownloading(false);
              });
          }}
        >
          {({
            setFieldValue,
            isValid,
            values,
            errors,
            isSubmitting,
            touched,
          }) => {
            return (
              <Form>
                <S.Control>
                  <Typography>Design</Typography>
                  <Field
                    as={Select}
                    name="idType"
                    required={true}
                    id="idType"
                    variant="outlined"
                    fullWidth
                    error={!!errors.idType}
                    value={values.idType}
                    onChange={(e) => {
                      setFieldValue("idType", e.target.value);

                      if (e.target.value === "hotel_holy") {
                        setPreviewURL(HotelHolyPreview);
                      } else if (e.target.value === "hotel") {
                        setPreviewURL(HotelPreview);
                      } else if (e.target.value === "hotel_wave") {
                        setPreviewURL(HotelWavePreview);
                      } else if (e.target.value === "otago") {
                        setPreviewURL(OtagoPreview);
                      } else if (e.target.value === "otago_basic") {
                        setPreviewURL(OtagoBasicPreview);
                      } else if (e.target.value === "otago_blur") {
                        setPreviewURL(OtagoBlurPreview);
                      } else if (e.target.value === "otago_leaf") {
                        setPreviewURL(OtagoLeafPreview);
                      } else if (e.target.value === "otag_madinah") {
                        setPreviewURL(OtagoMadinahPreview);
                      } else if (e.target.value === "vertical_blank") {
                        setPreviewURL(verticalBlank);
                      } else if (e.target.value === "bracelet") {
                        setPreviewURL(bracelet);
                      } else if (e.target.value === "id4x4") {
                        setPreviewURL(id4x4);
                      }
                    }}
                  >
                    <MenuItem value="hotel"> Hotel </MenuItem>
                    <MenuItem value="hotel_holy">Hotel Holy</MenuItem>
                    <MenuItem value="hotel_wave">Hotel Wave</MenuItem>
                    <MenuItem value="otago"> Otago </MenuItem>
                    <MenuItem value="otago_basic">Otago Basic</MenuItem>
                    <MenuItem value="otago_blur">Otago Blur</MenuItem>
                    <MenuItem value="otago_leaf">Otago Leaf</MenuItem>
                    <MenuItem value="otago_madinah">Otago Madinah</MenuItem>
                    <MenuItem value="vertical_blank">Vertical</MenuItem>
                    <MenuItem value="bracelet">Bracelet</MenuItem>
                    <MenuItem value="id4x4">ID Laser 4x4</MenuItem>
                  </Field>
                  <FormHelperText error={!!errors.idType}>
                    {touched.idType && errors.idType}
                  </FormHelperText>
                </S.Control>
                <S.Control>
                  <Select
                    onChange={handleCardColorChange}
                    variant="outlined"
                    fullWidth
                  >
                    {colorItems.map((colorItem) => (
                      <MenuItem
                        value={`r${colorItem.r}g${colorItem.g}b${colorItem.b}`}
                        key={`r${colorItem.r}g${colorItem.g}b${colorItem.b}`}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "25px",
                            backgroundColor: `rgb(${colorItem.r},${colorItem.g},${colorItem.b})`,
                          }}
                        ></div>
                      </MenuItem>
                    ))}
                  </Select>
                </S.Control>
                <S.Control>
                  <Field
                    as={TextField}
                    fullWidth
                    name="telNumber"
                    required={true}
                    id="telNumber"
                    type="tel"
                    minLength="10"
                    placeholder="Telephone Number"
                    variant="outlined"
                    error={!!errors.telNumber}
                    value={values.telNumber}
                  />
                  <FormHelperText error={!!errors.telNumber}>
                    {touched.telNumber && errors.telNumber}
                  </FormHelperText>
                </S.Control>
                <S.Control>
                  <Field
                    as={TextField}
                    fullWidth
                    name="mekahHotel"
                    required={false}
                    id="mekahHotel"
                    type="text"
                    placeholder="Makkah Hotel Name"
                    variant="outlined"
                    error={!!errors.mekahHotel}
                    value={values.mekahHotel}
                  />

                  <FormHelperText error={!!errors.mekahHotel}>
                    {touched.mekahHotel && errors.mekahHotel}
                  </FormHelperText>
                </S.Control>
                <S.Control>
                  <Field
                    as={TextField}
                    fullWidth
                    name="medinahHotel"
                    required={false}
                    id="medinahHotel"
                    type="tel"
                    minLength="10"
                    placeholder="Medinah Hotel Name"
                    variant="outlined"
                    error={!!errors.medinahHotel}
                    value={values.medinahHotel}
                  />

                  <FormHelperText error={!!errors.medinahHotel}>
                    {touched.medinahHotel && errors.medinahHotel}
                  </FormHelperText>
                </S.Control>
                <S.Control>
                  <Field
                    as={TextField}
                    fullWidth
                    name="flightDate"
                    required={false}
                    id="flightDate"
                    type="tel"
                    minLength="10"
                    placeholder="Flight Date and time ( DD/MM/YYYY HH:MM )"
                    variant="outlined"
                    error={!!errors.flightDate}
                    value={values.flightDate}
                  />

                  <FormHelperText error={!!errors.flightDate}>
                    {touched.flightDate && errors.flightDate}
                  </FormHelperText>
                </S.Control>
                <S.Control>
                  <Button variant="outlined" component="label">
                    Choose Logo
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={async (e) => {
                        setCompanyLogo(e.target.files[0]);
                      }}
                    />
                  </Button>
                  {companyLogo && <p> {companyLogo.name} </p>}
                </S.Control>
                <S.Control>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={downloading || !isValid}
                    startIcon={downloading && <CircularProgress size={16} />}
                  >
                    {downloading ? "Creating..." : "Create Cards"}
                  </Button>
                </S.Control>
              </Form>
            );
          }}
        </Formik>
      </S.Left>

      <S.Right>
        <Typography variant="h4" gutterBottom>
          {t("card-preview")}
        </Typography>
        {previewURL && (
          <img
            src={previewURL}
            style={{
              width: "100%",
              backgroundColor: `rgb(${cardBackgroundColor.r},${cardBackgroundColor.g},${cardBackgroundColor.b})`,
            }}
            alt="id card type preview"
          />
        )}
      </S.Right>
    </S.Container>
  );
};

export default IDCard;
