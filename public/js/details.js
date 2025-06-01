const params = new URLSearchParams(window.location.search);

const eventId = params.get('eventId');


fetch(`${window.location.origin}/api/events/${eventId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Event data:', data);
        document.querySelector('#eventName').innerHTML = data.eventName;
        document.querySelector('#eventDescription').innerHTML = data.eventDescription;
        document.querySelector('#eventDate').innerHTML = data.eventDate;
        document.querySelector('#eventLocation').innerHTML = data.eventAdress;
        document.querySelector('#organizerName').innerHTML = data.OrganizationName;
        document.querySelector('#organizerEmail').innerHTML = data.organizerEmail;
        document.querySelector('#volunteerCount').innerHTML = data.teams[0].size;
        for (let i = 0; i < data.teams[0].people.length; i++) {
            const person = data.teams[0].people[i];
            const personDiv = document.createElement('div');
            personDiv.className = 'person';
            personDiv.innerHTML = `${person.firstName} ${person.lastName} (${person.email})`;
            document.querySelector('.peopleContainer').appendChild(personDiv);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });