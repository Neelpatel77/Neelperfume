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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to retrieve user's data and update profile
function updateProfile(user) {
    if (user) {
        // User is signed in
        const userEmail = user.email;
        // Update welcome message
        document.querySelector('.welcome-message').innerHTML = `<strong>Welcome, ${userEmail}!</strong>`;
        // Display user's name and email
        document.querySelector('.profile-email').textContent = `Email: ${userEmail}`;
        document.querySelector('.profile-name').textContent = `Name: ${user.displayName}`; // Assuming you have user's name in Firebase Auth
        // Show content
        document.getElementById('content').classList.add('visible');
    } else {
        // No user is signed in
        console.log('No user logged in');
        window.location.href = 'login.html';
    }
}

// Check the authentication state when it changes
auth.onAuthStateChanged(updateProfile);

// Logout button functionality
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', function() {
    auth.signOut().then(() => {
        console.log('User signed out');
        // Redirect to login page after logout
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});
