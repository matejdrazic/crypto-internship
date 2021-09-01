import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXgaykFLxW17jRRnafgdYaTNoJUcz2ARA",
    authDomain: "createatoken.firebaseapp.com",
    projectId: "createatoken",
    storageBucket: "createatoken.appspot.com",
    messagingSenderId: "582935882635",
    appId: "1:582935882635:web:34a0f619b07f2b45861d8e",
    measurementId: "G-6S28FJQ61W"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore()

export default firestore