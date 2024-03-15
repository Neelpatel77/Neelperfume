

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user's email from localStorage
    const firebaseConfig = {
        apiKey: "AIzaSyA0HQ-OBjuy39U4I5e2sHW_6scyrbvshgA",
        authDomain: "perfume-3c5fa.firebaseapp.com",
        databaseURL: "https://perfume-3c5fa-default-rtdb.firebaseio.com",
        projectId: "perfume-3c5fa",
        storageBucket: "perfume-3c5fa.appspot.com",
        messagingSenderId: "271666106212",
        appId: "1:271666106212:web:78f54192781bdd1b887471"
      };
    // Check if Firebase is not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Get a reference to the Firebase authentication
    const auth = firebase.auth();

    // Add an authentication state change listener
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const userId = user.uid;
            const userEmail = user.email;

            // Update welcome message
            const welcomeMessage = document.querySelector('.welcome-message');
            welcomeMessage.innerHTML = `<strong>Welcome, ${userEmail}!</strong>`;

            // Get a reference to the Firestore database
            const db = firebase.firestore();

            // Retrieve user's data from Firestore based on email
            db.collection("orders").where("email", "==", userEmail).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        // Update profile page with retrieved data
                        document.querySelector('.profile-name').textContent = "Name: " + data.name;
                        document.querySelector('.profile-email').textContent = "Email: " + data.email;
                        // Add other profile details here
                    });
                })
                .catch((error) => {
                    console.error("Error getting documents: ", error);
                });
        } else {
            // No user is signed in, redirect to login page or handle accordingly
            console.log('No user logged in');
            window.location.href = 'login.html';
        }
    });
});