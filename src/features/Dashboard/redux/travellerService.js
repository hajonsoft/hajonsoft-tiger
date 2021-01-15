import firebase from './../../../firebaseapp';
// called from saga src\redux\saga.js ^p
// reducer at src\redux\reducer.ts ^p
const travellerService = {
    getTravellers: async ({ path }) => {
        const result = await firebase.database().ref(path).once('value');
        return flatten(result)
    },
    createTraveller: async ({ path, data }) => {
        if (!data) data = {name: 'Default Traveller'}
        const result = await firebase.database().ref(path).push(data);
        return { ...data, _fid: result.key };
    },
    updateTraveller: async ({ path, data }) => {
        const updateRef = firebase.database().ref(path);
        updateRef.update(data);
        return {updated: data};
    },
    deleteTraveller: async ({ path, data }) => {
        const removeRef = firebase.database().ref(path);
        removeRef.remove();
        const photoRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}.jpg`);
        photoRef.delete();
        const passportRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}_passport.jpg`);
        passportRef.delete();

    }
}

const flatten = (snapshot) => {

    const output = {};
    const data = snapshot.toJSON();
    if (!data) return { 'No Groups Found': [{ _fid: '0', name: 'No Travellers Found' }] }
    const groupKeys = Object.keys(data);

    groupKeys.forEach(groupKey => {
        const fireIds = Object.keys(data[groupKey])
        output[groupKey] = []
        fireIds.forEach(_fid => {
            output[groupKey].push({ ...data[groupKey][_fid], _fid })
        })
    })
    return output;
}
export default travellerService;
