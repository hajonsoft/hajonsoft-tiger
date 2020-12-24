import firebase from './../../../firebaseapp';

const travellerService = {
    getTravellers: async () => {
        const result = await firebase.database().ref("customer").once('value');
        return result.toJSON();
    }
}

export default travellerService;
