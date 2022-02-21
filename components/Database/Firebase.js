import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyAVrPJf9Q8Ku-zsel1Z8gYdskaD12KHzUQ",

    authDomain: "nwtproject-f6e73.firebaseapp.com",

    projectId: "nwtproject-f6e73",

    storageBucket: "nwtproject-f6e73.appspot.com",

    messagingSenderId: "132207537255",

    appId: "1:132207537255:web:985f01e6bcb01909d178c2"

};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore()

export default firestore