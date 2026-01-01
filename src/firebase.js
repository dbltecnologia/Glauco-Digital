import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDej98FTdiwS8EKjytVnbPqCs-nP1CC9Og",
    authDomain: "antoniofilho-ef6a2.firebaseapp.com",
    databaseURL: "https://antoniofilho-ef6a2-default-rtdb.firebaseio.com",
    projectId: "antoniofilho-ef6a2",
    storageBucket: "antoniofilho-ef6a2.appspot.com",
    messagingSenderId: "637424531884",
    appId: "1:637424531884:web:7d4a895452c6faf9516209",
    measurementId: "G-4WV3FP1MPY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
