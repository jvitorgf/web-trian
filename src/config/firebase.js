import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsqlNU99vBSPzd3mRJA3M3dfP2XWK6VB4",
    authDomain: "proj-web2-118d7.firebaseapp.com",
    databaseURL: "https://proj-web2-118d7.firebaseio.com",
    projectId: "proj-web2-118d7",
    storageBucket: "proj-web2-118d7.appspot.com",
    messagingSenderId: "577273733352",
    appId: "1:577273733352:web:93f70f3010974eb8c4295d",
    measurementId: "G-GPZWP5Z76B"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
//firebase.analytics();
