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
        _fid: id,
        ...paxRecord,
        isDuplicate:
          duplicateMap[paxRecord.passportNumber]?.[paxRecord.nationality]
            ?.isDuplicate,
        duplicateCount:
          duplicateMap[paxRecord.passportNumber]?.[paxRecord.nationality]
            ?.count,
      };
      targetPaxList.push(targetPax);
    });
    // Push target data, caravan as key and target pax and list of pax
    targetData = {...targetData,  [caravan]: targetPaxList };
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
  console.log('%c 🍲 passenger: ', 'font-size:20px;background-color: #42b983;color:#fff;', passenger);
  const searchWord = word?.toLowerCase();
  return (
    passenger?.name?.toLowerCase()?.includes(searchWord) ||
    passenger?.passportNumber?.toLowerCase()?.includes(searchWord) ||
    passenger?.nationality?.toLowerCase()?.includes(searchWord)
  );
};
