console.log('admin.js loaded');
// Get DOM elements
const statusFilter = document.getElementById('statusFilter');
const eventsContainer = document.getElementById('eventsContainer');
const paginationButtons = document.querySelectorAll('.page-btn');
const emptyStateMessage = document.querySelector('.empty-state');
// Add event listener for status filter
fetchEvents(statusFilter.value, 1); // Initial fetch on page load
statusFilter.addEventListener('change', function() {
    const selectedFilter = this.value;
    // In a real application, this would fetch filtered events from a server
    fetchEvents(selectedFilter, 1);
});

// Pagination event listeners
paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // In a real application, this would fetch the appropriate page of events
        const page = this.textContent.includes('Next') ? 
            parseInt(document.querySelector('.page-btn.active').textContent) + 1 : 
            parseInt(this.textContent);
        
        fetchEvents(statusFilter.value, page);
    });
});
function createEventCard(event) {
    // Create a card element for the event
    const card = document.createElement('div');
    card.classList.add('event-card');
    
    // Populate the card with event details
    card.innerHTML = `
        <h3>${event.eventName}</h3>
        <p>${event.eventAdress}</p>
        <p>Status: ${event.status}</p>
    `; // TODO: Approve/deny buttons and also is there a better way to handle this? - Nathan

    return card;
}

// Function to fetch events (real)
async function fetchEvents(status, page) {
    console.log(`Fetching ${status} events for page ${page}`);
    // test credentials for debugging
    let valid = false;
    // try {
    //     const response = await fetch(`http://localhost:3000/api/checkLogin`, { credentials: 'include' });
    //     if (response.ok) {
    //         const data = await response.json();
    //         valid = data.loggedIn; // Check if the user is logged in

    //     } else {
    //         throw new Error('Not logged in or session expired');
    //     }
    // } catch (error) {
    //     console.error('Error checking session:', error);
    //     // Redirect to login page or show an error message
    //     window.location.href = 'adminLogin.html';
    // }
    // // Fetch events from the server using the backend API with status filtering
    // if (!valid) {
    //     return; // Prevent fetching if not logged in
    // }
    // TODO: make this work lololol
    fetch(`${window.location.origin}/api/grabit?status=${status}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            // Clear the events container
            eventsContainer.innerHTML = ''; // Clear previous events
            
            // Iterate through the events and create event cards
            data.events.forEach(event => {
                const eventCard = createEventCard(event); // Assuming createEventCard returns an HTML element
                eventsContainer.appendChild(eventCard);
            });
            
            if (data.events.length === 0) {
                emptyStateMessage.style.display = 'block'; 
            } else {
                emptyStateMessage.style.display = 'none'; 
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}


// Function to handle event approval
function approveEvent(eventId) {
    // In a real application, this would send an API request to approve the event
    console.log(`Approving event ${eventId}`);
}

// Function to handle event denial
function denyEvent(eventId) {
    // In a real application, this would send an API request to deny the event
    console.log(`Denying event ${eventId}`);
}