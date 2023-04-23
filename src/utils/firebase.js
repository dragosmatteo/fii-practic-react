import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD6o-u48USiQ88In15sCl1I9OP-msrwQ3c",
  authDomain: "fiipractic-f30ea.firebaseapp.com",
  projectId: "fiipractic-f30ea",
  storageBucket: "fiipractic-f30ea.appspot.com",
  messagingSenderId: "350779711775",
  appId: "1:350779711775:web:9f392d7461b0d4c796902a",
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, db, storage }
export default firebase
