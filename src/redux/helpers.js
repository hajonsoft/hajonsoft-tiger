export const flatten = (snapshot, name = "data") => {
    const output = {};
    const data = snapshot.toJSON();
    console.log('%cMyProject%cline:3%cdata', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(96, 143, 159);padding:3px;border-radius:2px', data)
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