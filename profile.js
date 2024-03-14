// Function to redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Function to display user profile
function displayProfile(user) {
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');

    profileName.textContent = user.displayName;
    profileEmail.textContent = user.email;
}

// Function to handle profile click event
function goToProfile() {
    // Redirect to profile page or perform any other action
    console.log("Redirecting to user's profile page...");
}

// Check if user is logged in on page load
window.onload = function() {
    checkLoggedIn()
        .then(user => {
            // User is logged in
            console.log('User is logged in:', user);
            displayProfile(user);
        })
        .catch(() => {
            // No user is logged in, redirect to login page
            console.log('No user is logged in');
            redirectToLogin();
        });
};
