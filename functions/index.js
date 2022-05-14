const admin = require('firebase-admin');
const https = require('./https');

admin.initializeApp();

module.exports = { https };
