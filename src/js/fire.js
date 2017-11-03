import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBW2DnON1SFfQIRWk3fB7kj3I2YjdByHSI",
  authDomain: "senti-5ca31.firebaseapp.com",
  databaseURL: "https://senti-5ca31.firebaseio.com",
  projectId: "senti-5ca31",
  storageBucket: "senti-5ca31.appspot.com",
  messagingSenderId: "45207062216"
}

var fire = firebase.initializeApp(config)
export default fire
