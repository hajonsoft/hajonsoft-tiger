import { nationalities } from "../data/nationality";
import { nameParts } from "./nameParts";
import moment from "moment";

const checkDigitDiagram = {
  "<": 0,
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
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

export function createCodeline(passenger) {
  let codeline1;
  let codeline2;

  var names = nameParts(passenger.name);
  for (var i = 0; i < names.Count; i++) {
    names[i] = names[i].Trim().Replace(" ", "<");
  }

  var nationality = nationalities.find((p) => p.name === passenger.nationality);
  if (nationality != null) {
    codeline1 =
      "P<" +
      nationality.code +
      names[3] +
      "<<" +
      names[0] +
      "<" +
      names[1] +
      "<" +
      names[2];
    codeline1 = codeline1.padEnd(44, "<").replace(/[-]/g, "<");
    if (codeline1.length > 44) codeline1 = codeline1.substring(0, 44);
    var icaoPassportNumber = passenger.passportNumber.padEnd(9, "<");
    codeline2 = icaoPassportNumber;
    codeline2 = codeline2 + checkDigit(icaoPassportNumber); //Check digit
    if (passenger.birthDate != null)
      codeline2 =
        codeline2 +
        nationality.code +
        moment(passenger.birthDate).format("YYMMDD") +
        checkDigit(moment(passenger.birthDate).format("YYMMDD"));

    codeline2 = codeline2 + passenger.gender.substring(0, 1);

    if (passenger.passExpireDt != null)
      codeline2 =
        codeline2 +
        moment(passenger.passExpireDt).format("YYMMDD") +
        moment(passenger.passExpireDt).format("YYMMDD");

    codeline2 = codeline2.padEnd(42, "<") + "0";

    //Composite check digit for characters of machine readable data of the lower line in positions 1 to 10, 14 to 20 and 22 to 43, including values for
    //letters that are a part of the number fields and their check digits.
    const compositeCheckDigit = checkDigit(
      codeline2.substring(0, 10) +
        codeline2.substring(13, 20) +
        codeline2.substring(21, 43)
    );
    codeline2 = codeline2 + compositeCheckDigit.replace(/[-]/g, "<");
  }

  return codeline1 + codeline2;
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
