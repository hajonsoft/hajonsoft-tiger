import firebase from './../../../firebaseapp';
import _ from 'lodash';

// called from saga src\redux\saga.js ^p
// reducer at src\redux\reducer.js ^p
const travellerService = {
    getTravellers: async ({ path }) => {
        const result = await firebase.database().ref(path).once('value');
        return flatten(result)
    },
    createTraveller: async ({ path, data }) => {
        if (!data) data = { name: 'Default Traveller' }
        const dataWithoutUndefined = _.omit(data, _.filter(_.keys(data), function(key) { return _.isUndefined(data[key]) }));
        const result = await firebase.database().ref(path).push(dataWithoutUndefined);
        return { ...dataWithoutUndefined, _fid: result.key };
    },
    updateTraveller: async ({ path, data }) => {
        const updateRef = firebase.database().ref(path);
        updateRef.update(data);
        return { updated: data };
    },
    deleteTraveller: async ({ path, data }) => {
        const removeRef = firebase.database().ref(path);
        removeRef.remove();
        if (data && data.nationality && data.passportNumber) {
            const photoRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}.jpg`);
            photoRef.delete();
            const passportRef = firebase.storage().ref(`${data.nationality}/${data.passportNumber}_passport.jpg`);
            passportRef.delete();
        }

    }
}

const flatten = (snapshot) => {
    const output = {};
    const data = snapshot.toJSON();
    if (!data) return { 'No Caravans Found': [{ _fid: '0', name: 'No Travellers Found' }] }
    const caravans = Object.keys(data);

    caravans.forEach(caravan => {
        const fireIds = Object.keys(data[caravan])
        output[caravan] = []
        fireIds.forEach(_fid => {
            output[caravan].push({ ...data[caravan][_fid], _fid })
        })
    })
    return output;
}
export default travellerService;
