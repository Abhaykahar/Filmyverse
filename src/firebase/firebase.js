
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcEWAgla9z18JKZWGDDW3nS8JCDGH99Xk",
    authDomain: "filmyverse-7b9d9.firebaseapp.com",
    projectId: "filmyverse-7b9d9",
    storageBucket: "filmyverse-7b9d9.firebasestorage.app",
    messagingSenderId: "814846611580",
    appId: "1:814846611580:web:d50a7a9de32a57884f79f9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");


export default app;
