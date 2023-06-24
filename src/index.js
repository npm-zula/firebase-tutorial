import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB8bPh1rM53neKjWV9_LllnQcQhedpJVE",
  authDomain: "fir-9-tutorial-b848a.firebaseapp.com",
  projectId: "fir-9-tutorial-b848a",
  storageBucket: "fir-9-tutorial-b848a.appspot.com",
  messagingSenderId: "783187250852",
  appId: "1:783187250852:web:6fadef4d346ce16ec4e031",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();

// // collecetion ref
const booksRef = collection(db, "books");

// // get documents
getDocs(booksRef)
  .then((snapshot) => {
    let books = [];
    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((error) => {
    console.log(error);
  });
