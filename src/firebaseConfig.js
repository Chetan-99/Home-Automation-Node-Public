const firebase = require("firebase/app");
require("firebase/database");
const config = require("../config.json");

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
