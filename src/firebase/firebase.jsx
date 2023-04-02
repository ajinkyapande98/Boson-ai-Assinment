// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM74Jk33ZrUoXh9JbyTIPCFGmFYfMEFKU",
  authDomain: "boson-ai-2.firebaseapp.com",
  projectId: "boson-ai-2",
  storageBucket: "boson-ai-2.appspot.com",
  messagingSenderId: "443673593097",
  appId: "1:443673593097:web:8216b6ec6f783a8597ffd8",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBpQg7AvVCVlR5Fl21GF7q6fzPeioHG8fg",
//   authDomain: "boson-ai.firebaseapp.com",
//   projectId: "boson-ai",
//   storageBucket: "boson-ai.appspot.com",
//   messagingSenderId: "94884979297",
//   appId: "1:94884979297:web:a8102cd7d68a320f7b8020",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
