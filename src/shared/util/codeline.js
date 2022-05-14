import { nationalities } from "../../data/nationality";
import { nameParts } from "./name";
import moment from "moment";

const checkDigitDiagram = {
  "<": 0,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35,
};

export function createCodeLine(passenger) {
  try {
    let codeLine1;
    let codeLine2;

    var names = nameParts(passenger.name);
    for (var i = 0; i < names.Count; i++) {
      names[i] = names[i].Trim().Replace(/ /g, "<");
    }

    var nationality = nationalities.find(
      (p) => p.name === passenger.nationality
    );
    if (nationality != null) {
      codeLine1 =
        "P<" +
        nationality.code +
        names[3] +
        "<<" +
        names[0] +
        "<" +
        names[1] +
        "<" +
        names[2];
      codeLine1 = codeLine1.padEnd(44, "<").replace(/[-]/g, "<");
      if (codeLine1.length > 44) codeLine1 = codeLine1.substring(0, 44);
      var icaoPassportNumber = passenger.passportNumber.padEnd(9, "<");
      codeLine2 = icaoPassportNumber;
      codeLine2 = codeLine2 + checkDigit(icaoPassportNumber); //Check digit
      if (passenger.birthDate != null)
        codeLine2 =
          codeLine2 +
          nationality.code +
          moment(passenger.birthDate).format("YYMMDD") +
          checkDigit(moment(passenger.birthDate).format("YYMMDD"));

      codeLine2 = codeLine2 + passenger.gender.substring(0, 1);

      if (passenger.passExpireDt != null) {
        codeLine2 = codeLine2 + moment(passenger.passExpireDt).format("YYMMDD");
      }
      codeLine2 =
        codeLine2 + checkDigit(moment(passenger.passExpireDt).format("YYMMDD"));
      const filler = "<".repeat(42 - codeLine2.length);
      codeLine2 = codeLine2 + filler;
      codeLine2 = codeLine2 + checkDigit(filler);

      //Composite check digit for characters of machine readable data of the lower line in positions 1 to 10, 14 to 20 and 22 to 43, including values for
      //letters that are a part of the number fields and their check digits.
      const compositeCheckDigit = checkDigit(
        codeLine2.substring(0, 10) +
          codeLine2.substring(13, 20) +
          codeLine2.substring(21, 43)
      );
      codeLine2 = codeLine2 + compositeCheckDigit.replace(/[-]/g, "<");
    }

    return codeLine1 + codeLine2;
  } catch (error) {
    console.log(error);
    return "";
  }
}

function checkDigit(inputData) {
  //http://www.highprogrammer.com/alan/numbers/mrp.html#checkdigit
  let multiplier = 7;
  let total = 0;
  for (let i = 0; i < inputData.length; i++) {
    total = total + checkDigitDiagram[inputData[i]] * multiplier;
    if (multiplier === 7) multiplier = 3;
    else if (multiplier === 3) multiplier = 1;
    else if (multiplier === 1) multiplier = 7;
  }

  const result = total % 10;
  return result.toString();
}
