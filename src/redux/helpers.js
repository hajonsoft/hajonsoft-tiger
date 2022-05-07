import moment from "moment";

export const flatten = (snapshot, name = "data") => {
  const data = snapshot.toJSON();
  // input => {key1: {fid1: {name: ''}, fid2: {name: ''}}, key2: {fid3: {name: ''}, fid4: {name: ''}} }
  // output => {key1: [{fid1: '', name: ''}, {fid2: '', name: ''}], key2: [{fid3: '', name: ''}, {fid4: '', name: ''}]}
  if (!data)
    return { [`No ${name} found`]: [{ _fid: "0", name: "No data Found" }] };

  const duplicateMap = {};
  let targetData = {};
  let targetPaxList = [];

  // caravan loop (small)
  Object.entries(data).forEach(([caravan, paxMap]) => {
    targetPaxList = [];
    // pax loop
    Object.entries(paxMap).forEach(([id, paxRecord]) => {
      // duplicate check
      if (duplicateMap[paxRecord.passportNumber]) {
        if (duplicateMap[paxRecord.passportNumber][paxRecord.nationality]) {
          duplicateMap[paxRecord.passportNumber][
            paxRecord.nationality
          ].count += 1;
          duplicateMap[paxRecord.passportNumber][
            paxRecord.nationality
          ].isDuplicate =
            duplicateMap[paxRecord.passportNumber][paxRecord.nationality]
              .count > 0;
        } else {
          duplicateMap[paxRecord.passportNumber][paxRecord.nationality] = {
            count: 0,
          };
        }
      } else {
        duplicateMap[paxRecord.passportNumber] = {
          [paxRecord.nationality]: { count: 0 },
        };
      }
      // Push target pax to an array
      const targetPax = {
        ...paxRecord,
        _fid: id,
        isDuplicate:
          duplicateMap[paxRecord.passportNumber]?.[paxRecord.nationality]
            ?.isDuplicate || false,
        duplicateCount:
          duplicateMap[paxRecord.passportNumber]?.[paxRecord.nationality]
            ?.count,
      };
      targetPaxList.push(targetPax);
    });
    // Push target data, caravan as key and target pax and list of pax
    targetData = { ...targetData, [caravan]: targetPaxList };
  });

  return targetData;
};

export const flattenOnlineCaravans = (snapshot) => {
  const output = [];
  const data = snapshot.toJSON();
  if (!data) return output;
  const mergeKeys = Object.keys(data);

  mergeKeys.forEach((mergeKey) => {
    output.push({ ...data[mergeKey], _fid: mergeKey });
  });
  return output;
};

export const isResult = (passenger, word) => {
  const searchWord = word?.toString().toLowerCase();
  // If search word is a date, then search by date within one month of birthDate, issue date, expiry date
  if (searchWord.match(/^\d{2,4}.?\d{2}.?\d{2,4}$/)) {
    const searchDate = moment(word);
    if (searchDate.isValid()) {
      const searchDateAhead = moment(searchDate).add(1, "month");
      const searchDateBehind = moment(searchDate).subtract(1, "month");
      const isBetweenBirthDate = moment(passenger?.birthDate).isBetween(
        searchDateBehind,
        searchDateAhead
      );
      const isBetweenIssueDate = moment(passenger?.passIssueDt).isBetween(
        searchDateBehind,
        searchDateAhead
      );
      const isBetweenExpiryDate = moment(passenger?.passExpireDt).isBetween(
        searchDateBehind,
        searchDateAhead
      );

      return isBetweenBirthDate || isBetweenIssueDate || isBetweenExpiryDate;
    }
    return false;
  }

  const passportNumber = passenger?.passportNumber?.toString();
  const isPassportResult = passportNumber?.toLowerCase()?.includes(searchWord);
  const isNameResult = passenger?.name?.toLowerCase()?.includes(searchWord);
  const isNationalityResult = passenger?.nationality
    ?.toLowerCase()
    ?.includes(searchWord);

  return isNameResult || isPassportResult || isNationalityResult;
};
