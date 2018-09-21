import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB8ntIpOmRjArOkh0pIgZCl1o_qJtm62xw",
  authDomain: "choice-words.firebaseapp.com",
  databaseURL: "https://choice-words.firebaseio.com",
  projectId: "choice-words",
  storageBucket: "choice-words.appspot.com",
  messagingSenderId: "487406040520"
};
firebase.initializeApp(config);

export default firebase;