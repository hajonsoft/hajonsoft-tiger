import axios from 'axios';
// import firebase from 'firebase/app'
// import 'firebase/storage';



// firebase.initializeApp(firebaseConfig);

// var storage = firebase.storage();

const firebaseService = () => {
    return {
        getExternalResponse: async (url: string) => {
            const importedRecords = await axios.get(url);
            return importedRecords;
        },
        createRecord: async (fbUser: any, projectId: string, folder: string, record: any) => {
            const fbCustomer = await axios.post(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}.json?auth=${fbUser.idToken}`, record);
            return fbCustomer;
        },
        updateRecord: async (fbUser: any, projectId: string, folder: string, recordId: string, record: any) => {
            await axios.put(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}/${recordId}.json?auth=${fbUser.idToken}`, record);
            return { ...record, id: recordId };
        },
        deleteRecord: async (fbUser: any, projectId: string, folder: string, recordId: string) => {
            await axios.delete(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}/${recordId}.json?auth=${fbUser.idToken}`);
            return { id: recordId };
        },
        deleteTable: async (fbUser: any, projectId: string, folder: string) => {
            await axios.delete(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}.json?auth=${fbUser.idToken}`);
        },
        getRecord: async (fbUser: any, projectId: string, folder: string, recordId: string,) => {
            const fbCustomer = await axios.get(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}/${recordId}.json?auth=${fbUser.idToken}`);
            return fbCustomer;
        },
        getRecords: async (fbUser: any, projectId: string, folder: string) => {
            const result = await axios.get(`https://${projectId}.firebaseio.com/${fbUser.localId}/${folder}.json?auth=${fbUser.idToken}`);
            return result;
        },
        // getImageUrl: async (fileName) => {
        //     const url = await storage.ref('images').child(fileName).getDownloadURL();
        //     return url;
        // }
    }
}


// export { storage, firebaseService as default };
export { firebaseService as default };