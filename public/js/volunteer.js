console.log('volunteer.js loaded');
// Get DOM elements
const eventsContainer = document.getElementById('eventsContainer');
const paginationButtons = document.querySelectorAll('.page-btn');
const emptyStateMessage = document.querySelector('.empty-state');


// Add event listener for status filter
fetchEvents('approved', 1); // Initial fetch on page load

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
        <p>Location: ${event.eventAdress}</p>
        <p>Organizer: ${event.OrganizationName}</p>
        <a href="/signup.html?eventId=${encodeURIComponent(event._id)}">
            <button class="signup-btn">Sign Up</button>
        </a>
        <a href="/details.html?eventId=${encodeURIComponent(event._id)}">
            <button class="details-btn">Details</button>
        </a>
    `;

    return card;
}

// Function to fetch events (real)
async function fetchEvents(status, page) {
    console.log(`Fetching ${status} events for page ${page}`);
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
