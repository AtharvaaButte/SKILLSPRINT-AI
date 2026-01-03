const admin = require("firebase-admin");
const { getFirebaseConfig } = require("./env"); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(getFirebaseConfig()),
  });
}

module.exports = admin;
