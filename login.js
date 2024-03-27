import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0HQ-OBjuy39U4I5e2sHW_6scyrbvshgA",
    authDomain: "perfume-3c5fa.firebaseapp.com",
    databaseURL: "https://perfume-3c5fa-default-rtdb.firebaseio.com",
    projectId: "perfume-3c5fa",
    storageBucket: "perfume-3c5fa.appspot.com",
    messagingSenderId: "271666106212",
    appId: "1:271666106212:web:78f54192781bdd1b887471"
};
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

// Function to log in to an existing account
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById('loginMessage').textContent = "Login successful!";
            clearForm('loginForm');
            // Redirect to index.html upon successful login
            window.location.href = 'index.html';
        })
        .catch(error => {
            document.getElementById('loginMessage').textContent = error.message;
        });
}


// Function to clear form fields
function clearForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

