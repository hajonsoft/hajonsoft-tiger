import firebase from '../../../firebaseapp';
// called from saga src\redux\saga.js ^p
// reducer at src\redux\reducer.ts ^p
const visaSystemService = {
    getSystems: async ({ path }) => {
        const result = await firebase.database().ref(path).once('value');
        return flatten(result)
    },
    createSystem: async ({ path, data }) => {
        if (!data) return;
        const result = await firebase.database().ref(path).push(data);
        return { ...data, _fid: result.key };
    },
    updateSystem: async ({ path, data }) => {
        const updateRef = firebase.database().ref(path);
        updateRef.update(data);
        return {updated: data};
    },
    deleteSystem: async ({ path, data }) => {
        const removeRef = firebase.database().ref(path);
        removeRef.remove();
    }
}

const flatten = (snapshot) => {

    const output = [];
    const data = snapshot.toJSON();
    if (!data) return output;
    for (let [key, value] of Object.entries(data)){
        output.push({...value, _fid: key})
    }
    return output;
}
export default visaSystemService;
