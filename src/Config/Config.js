import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDAHWzluuzWf31mXmBokFEAwGVKQBxAss4",
    authDomain: "coba1-458da.firebaseapp.com",
    databaseURL: "https://coba1-458da.firebaseio.com",
    projectId: "coba1-458da",
    storageBucket: "coba1-458da.appspot.com",
    messagingSenderId: "749991281227",
    appId: "1:749991281227:web:6b4d33a96df57cd7dcc3ce",
    measurementId: "G-N9HVT6CVZL"
};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();
export const time = Firebase.database.ServerValue.TIMESTAMP;