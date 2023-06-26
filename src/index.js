import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

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
const q = query(booksRef, orderBy("createdAt"));

// real-time listener
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(booksRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

const bookRef = doc(db, "books", "j9NRDYS0HPXM3Dnil1bJ");
