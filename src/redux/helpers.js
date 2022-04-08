export const flatten = (snapshot, name = "data") => {
    const output = {};
    const data = snapshot.toJSON();
    // input => {key1: {fid1: {name: ''}, fid2: {name: ''}}, key2: {fid3: {name: ''}, fid4: {name: ''}} }
    // output => {key1: [{fid1: '', name: ''}, {fid2: '', name: ''}], key2: [{fid3: '', name: ''}, {fid4: '', name: ''}]}
    // TODO: Review the logic below there must be an easier way to convert 
    if (!data) return { [`No ${name} found`] : [{ _fid: '0', name: 'No data Found' }] }
    const topKeys = Object.keys(data);

    topKeys.forEach(topKey => {
        output[topKey] = []
        const mergeFirebaseIds = Object.keys(data[topKey])
        mergeFirebaseIds.forEach(_fid => {
            output[topKey].push({ ...data[topKey][_fid], _fid })
        })
    })
    return output;
}

export const flattenOnlineCaravans = (snapshot) => {
    const output = [];
    const data = snapshot.toJSON();
    if (!data) return output;
    const mergeKeys = Object.keys(data);

    mergeKeys.forEach(mergeKey => {
            output.push({ ...data[mergeKey], _fid: mergeKey });
    })
    return output;
}

export const isResult = (passenger, word) => {
    const searchWord = word?.toLowerCase();
    return passenger?.name?.toLowerCase()?.includes(searchWord) || passenger?.passportNumber?.toLowerCase()?.includes(searchWord) || passenger?.nationality?.toLowerCase()?.includes(searchWord)
  }