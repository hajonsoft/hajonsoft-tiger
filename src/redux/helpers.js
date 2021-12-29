export const flatten = (snapshot, name = "data") => {
    const output = {};
    const data = snapshot.toJSON();
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