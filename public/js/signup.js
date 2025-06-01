const params = new URLSearchParams(window.location.search);
console.log(params);
const eventId = params.get('eventId');

const infoContainer = document.querySelector('.info-container');
infoContainer.innerHTML = eventId;

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);
    const personData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email")
    };
    console.log("Submitting event data:", personData)
    fetch(`${window.location.origin}/api/signup?eventId=${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert(data.message || "Person submitted successfully!");
        window.location.href = 'volunteer.html';
    })
    .catch(err => {
        alert("Error signing up. Please try again.");
        console.error("Submission error:", err);
    });
});

