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
const Authentication = firebase.auth;
const currentUser = auth.currentUser
const googleAuthProvider = firebase.auth.GoogleAuthProvider

// firebase collections
const usersCollection = db.collection('users')
const eventsCollection = db.collection('events')
const productsCollection = db.collection('products')
const photosCollection = db.collection('profilephotos')
const descriptionCollection = db.collection('descriptions')

// firebase functions
const functions = firebase.functions();
//const transfer = firebase.functions().httpsCallable('transfer');
//const helloWorld = firebase.functions().httpsCallable('helloWorld');

/*if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator('http://localhost:8080')
}*/

export default {
    db,
    auth,
    Authentication,
    currentUser,
    googleAuthProvider,
    usersCollection,
    eventsCollection,
    productsCollection,
    photosCollection,
    descriptionCollection,
    functions
    //transfer,
    //helloWorld
}