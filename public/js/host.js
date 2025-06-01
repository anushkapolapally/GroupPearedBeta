let teamCount = 1;
        
function addTeam() {
    teamCount++;
    const newTeam = document.createElement('div');
    newTeam.className = 'team-container';
    newTeam.id = 'team' + teamCount;
    newTeam.innerHTML = `
        <div class="team-header">
            <h4>Team ${teamCount}</h4>
            <button type="button" class="btn btn-danger" onclick="removeTeam('team${teamCount}')">Remove</button>
        </div>
        
        <div class="form-group">
            <label for="teamName${teamCount}">Team Name*</label>
            <input type="text" id="teamName${teamCount}" name="teamName${teamCount}" required>
        </div>
        
        <div class="form-group">
            <label for="teamSize${teamCount}">Number of Volunteers Needed*</label>
            <input type="number" id="teamSize${teamCount}" name="teamSize${teamCount}" min="1" required>
        </div>
        
        <div class="form-group">
            <label for="teamDescription${teamCount}">Team Description*</label>
            <textarea id="teamDescription${teamCount}" name="teamDescription${teamCount}" placeholder="Describe what this team will be doing..." required></textarea>
        </div>
    `;
    
    document.getElementById('teamsContainer').appendChild(newTeam);
}

function removeTeam(teamId) {
    if (document.querySelectorAll('.team-container').length > 1) {
        document.getElementById(teamId).remove();
    } else {
        alert('You must have at least one team.');
    }
}

document.getElementById('hostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const eventData = {
        eventName: formData.get("eventName"),
        OrganizationName: formData.get("OrganizationName"),
        organizerEmail: formData.get("organizerEmail"),
        eventDate: formData.get("eventDate"),
        eventAdress: formData.get("eventAddress"),
        eventDescription: formData.get("eventDescription"),
        location: formData.get("location"),
        teams: []
    };

    for (let i = 1; i <= teamCount; i++) {
        eventData.teams.push({
            name: formData.get("teamName" + i),
            size: parseInt(formData.get("teamSize" + i)),
            description: formData.get("teamDescription" + i),
        });
    }

    console.log("Submitting event data:", eventData);

    fetch(`${window.location.origin}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert(data.message || "Event submitted successfully!");
        document.getElementById("hostForm").reset();
    })
    .catch(err => {
        alert("Error submitting event. Please try again.");
        console.error("Submission error:", err);
    });
});

let map, marker;

function initMap() {
    map = L.map('map').setView([37.7749, -122.4194], 13); // Default to San Francisco

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker([37.7749, -122.4194], { draggable: true }).addTo(map);

    marker.on('dragend', function (e) {
        const position = marker.getLatLng();
        document.getElementById('location').value = `${position.lat}, ${position.lng}`;
    });

    map.on('click', function (e) {
        const position = e.latlng;
        marker.setLatLng(position);
        document.getElementById('location').value = `${position.lat}, ${position.lng}`;
    });
}

window.onload = initMap;