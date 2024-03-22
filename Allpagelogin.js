import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0HQ-OBjuy39U4I5e2sHW_6scyrbvshgA",
    authDomain: "perfume-3c5fa.firebaseapp.com",
    databaseURL: "https://perfume-3c5fa-default-rtdb.firebaseio.com",
    projectId: "perfume-3c5fa",
    storageBucket: "perfume-3c5fa.appspot.com",
    messagingSenderId: "271666106212",
    appId: "1:271666106212:web:78f54192781bdd1b887471"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth(firebaseApp);

// Variable to hold the session timeout
let timeout;

// Function to start the session timeout
function startSessionTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // Log out the user when the session expires
        signOut(auth).then(() => {
            console.log("User logged out due to session expiration");
            // Redirect to login page
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    }, 600 * 1000); // 1 minute
}

// Function to reset the session timeout
function resetSessionTimeout() {
    clearTimeout(timeout);
    startSessionTimeout();
}

// Check the authentication state when it changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        console.log("User is signed in");
        // Start session timeout
        startSessionTimeout();
        document.getElementById('content').classList.add('visible');

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // Redirect to login page
        window.location.href = 'login.html';
    }
});

// Listen for mouse movements and keypress events to reset the session timeout
document.addEventListener("mousemove", resetSessionTimeout);
document.addEventListener("keypress", resetSessionTimeout);
