import _ from "lodash";
import moment from "moment";
import React from "react";
import Barcode from "react-barcode";
import { nationalities } from "../../data/nationality";
import { sanitizeName } from "./name";

export function formatPassengers(passengers) {
  const formattedPassengers = [];
  for (let i = 0; i < passengers.length; i++) {
    const nameParts = passengers[i].name.split(" ");
    // const url = await getPassengerPhoto(passengers[i]);
    const nationality = nationalities?.find(
      (nationalityRecord) =>
        nationalityRecord.name === passengers?.[i]?.nationality
    )?.code;
    const issueCountry =
      passengers?.[i]?.codeLine?.substring(2, 5) || nationality;
    formattedPassengers.push({
      seq: i + 1,
      ...passengers[i],
      birthDate: moment(passengers[i].birthDate).format("D-MMM-YYYY"),
      idNumberIssueDate: moment(passengers[i].idNumberIssueDate).format(
        "D-MMM-YYYY"
      ),
      idNumberExpireDate: moment(passengers[i].idNumberExpireDate).format(
        "D-MMM-YYYY"
      ),
      passExpireDt: moment(passengers[i].passExpireDt).format("D-MMM-YYYY"),
      passIssueDt: moment(passengers[i].passIssueDt).format("D-MMM-YYYY"),
      amadeusNM: `NM1${_.last(nameParts)}/${_.head(nameParts)} ${gTitle(
        passengers[i]
      )}`,
      saber_: `-${_.head(nameParts)}/${_.last(nameParts)} ${gTitle(
        passengers[i]
      )}`,
      amadeusSRDOC: `SRDOCSXXHK1-P-${issueCountry}-${
        passengers?.[i]?.passportNumber
      }-${nationality}-${moment(passengers?.[i]?.birthDate).format(
        "DDMMMYY"
      )}-${passengers?.[i]?.gender?.substring(0, 1)}-${moment(
        passengers?.[i]?.passExpireDt
      ).format("DDMMMYY")}-${_.last(nameParts)}-${_.head(
        nameParts
      )}/P1`.toUpperCase(),
      saberSRDOC: `Not Implemented`,
      mofaNumberBarcode: (
        <div style={{ padding: "8px 16px, border: 5px solid brown" }}>
          <Barcode value={passengers[i].mofaNumber} displayValue={false} />
        </div>
      ),
      title: gTitle(passengers[i]),
      firstName: sanitizeName(passengers[i].name.split(" ")[0]),
      lastName: sanitizeName(_.last(passengers[i].name.split(" "))),
      eNumberBarcode: passengers[i].eNumber ? (
        <Barcode
          value={passengers[i].eNumber}
          displayValue={true}
          width="1"
          height="20"
        />
      ) : null,
    });
  }
  return formattedPassengers;
}

function gTitle(passenger, g = "amadeus") {
  if (!passenger.birthDate) return "XX";
  if (!passenger.gender) return "XX";
  const age = moment().diff(passenger.birthDate, "years");
  if (age <= 2) return "INF";
  if (age <= 12) return "CHD";
  if (passenger.gender === "Male") return "MR";
  if (passenger.gender === "Female") return "MRS";
  return "XXX";
}
