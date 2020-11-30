import axios from 'axios';

const dataService = {
    getExternalResponse: async (url: string) => {
        const importedRecords = await axios.get(url);
        return importedRecords;
    },
    createRecord: async ({ user, projectId, folder, record }) => {
        const fbCustomer = await axios.post(`https://${projectId}.firebaseio.com/${folder}.json?auth=${user.idToken}`, record);
        return fbCustomer;
    },
    updateRecord: async ({ user, projectId, folder, record , recordId}) => {
        await axios.put(`https://${projectId}.firebaseio.com/${folder}/${recordId}.json?auth=${user.idToken}`, record);
        return { ...record, id: recordId };
    },
    deleteRecord: async ({ user, projectId, folder, recordId}) => {
        await axios.delete(`https://${projectId}.firebaseio.com/${folder}/${recordId}.json?auth=${user.idToken}`);
        return { id: recordId };
    },
    deleteTable: async (fbUser: any, projectId: string, folder: string) => {
        await axios.delete(`https://${projectId}.firebaseio.com/${folder}.json?auth=${fbUser.idToken}`);
    },
    getRecord: async (fbUser: any, projectId: string, folder: string, recordId: string,) => {
        const fbCustomer = await axios.get(`https://${projectId}.firebaseio.com/${folder}/${recordId}.json?auth=${fbUser.idToken}`);
        return fbCustomer;
    },
    getRecords: async ({ user, projectId, folder }) => {
        const result = await axios.get(`https://${projectId}.firebaseio.com/${folder}.json?auth=${user.idToken}`);
        return result;
    },
    getRecordsShallow: async ({ user, projectId, folder }) => {
        const result = await axios.get(`https://${projectId}.firebaseio.com/${folder}.json?shallow=true&auth=${user.idToken}`);
        return result;
    },
    // getImageUrl: async (fileName) => {
    //     const url = await storage.ref('images').child(fileName).getDownloadURL();
    //     return url;
    // }
}

export { dataService as default };