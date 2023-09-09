import {initializeApp} from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBPk0fSgUJai0iSOZCXC9ImW3KX7TZlNz8",
    authDomain: "phonebook-6b750.firebaseapp.com",
    projectId: "phonebook-6b750",
    storageBucket: "phonebook-6b750.appspot.com",
    messagingSenderId: "374469505909",
    appId: "1:374469505909:web:b673e84df5a7d10a8b193c"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// export the Firestore instance
export {db}

// export Firebase Firestore functions
export {
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
}