

// Get the form and input elements
const loginForm = document.querySelector('.wrapper form');
const usernameInput = document.querySelector('.input-box input[type="text"]');
const passwordInput = document.querySelector('.input-box input[type="password"]');

// Create an error message element (will be added only if needed)
const errorMessage = document.createElement('div');
errorMessage.style.color = '#ff3333';
errorMessage.style.marginBottom = '15px';
errorMessage.style.fontSize = '14px';
errorMessage.style.textAlign = 'center';
errorMessage.style.display = 'none';

// Insert error message before the button
const loginButton = document.querySelector('.btn');
loginForm.insertBefore(errorMessage, loginButton);

// Add submit event listener to the form
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    const url = `${window.location.origin}/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    fetch(url, {credentials: 'include'})
        .then(response => response.json()) 
        .then(data => {
            if (data.error) {
                // Display error message if login fails
                console.log("Login failed:", data.error); // Log the error for debugging
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            } else {
                // Redirect to the dashboard or another page on successful login
                window.location.href = 'admin.html';
            }
        });
    
});