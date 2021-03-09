const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBSO2Mq6xMU6TLMDiidmijEhUu_RanBtNo",
  authDomain: "kiei-451-cf945.firebaseapp.com",
  projectId: "kiei-451-cf945",
  storageBucket: "kiei-451-cf945.appspot.com",
  messagingSenderId: "560315995791",
  appId: "1:560315995791:web:ab7bdbd4392ad8f90382fa"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase