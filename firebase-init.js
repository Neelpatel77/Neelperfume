const firebaseConfig = {
    apiKey: "AIzaSyA0HQ-OBjuy39U4I5e2sHW_6scyrbvshgA",
    authDomain: "perfume-3c5fa.firebaseapp.com",
    databaseURL: "https://perfume-3c5fa-default-rtdb.firebaseio.com",
    projectId: "perfume-3c5fa",
    storageBucket: "perfume-3c5fa.appspot.com",
    messagingSenderId: "271666106212",
    appId: "1:271666106212:web:78f54192781bdd1b887471"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
