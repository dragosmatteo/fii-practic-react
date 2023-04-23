import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDLeYV0RtXJpUH5w4C4ukdJEQJbDiIWRk4",
  authDomain: "fii-practic-memes.firebaseapp.com",
  projectId: "fii-practic-memes",
  storageBucket: "fii-practic-memes.appspot.com",
  messagingSenderId: "429868905828",
  appId: "1:429868905828:web:ffb3447a7ecbc69b9b7671",
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, db, storage }
export default firebase
