import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyBqvG6X-cV-epu2u5t2tFIGDfiU0u9-qDw",
    authDomain: "wuffee-app.firebaseapp.com",
    databaseURL: "https://wuffee-app.firebaseio.com",
    projectId: "wuffee-app",
    storageBucket: "wuffee-app.appspot.com",
    messagingSenderId: "960079910672",
    appId: "1:960079910672:web:7aec21c9383bbab4"
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const googleAuthProvider = firebase.auth.GoogleAuthProvider

// firebase collections
const usersCollection = db.collection('users')

// firebase functions
const functions = firebase.functions();
const transfer = firebase.functions().httpsCallable('transfer');

export default {
    db,
    auth,
    currentUser,
    googleAuthProvider,
    usersCollection,
    functions,
    transfer
}