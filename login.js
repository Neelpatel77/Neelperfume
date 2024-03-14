// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0HQ-OBjuy39U4I5e2sHW_6scyrbvshgA",
    authDomain: "perfume-3c5fa.firebaseapp.com",
    projectId: "perfume-3c5fa",
    storageBucket: "perfume-3c5fa.appspot.com",
    messagingSenderId: "271666106212",
    appId: "1:271666106212:web:29f47676d0ed9b67887471"
};
firebase.initializeApp(firebaseConfig);

// Reference to Firebase authentication
const auth = firebase.auth();

// Function to create a new account
function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('signupMessage').textContent = "Account created successfully!";
            clearForm('signupForm');
        })
        .catch(error => {
            document.getElementById('signupMessage').textContent = error.message;
        });
}

// Function to log in to an existing account
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('loginMessage').textContent = "Login successful!";
            clearForm('loginForm');
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