// models/Event.js
const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  firstName: String, 
  lastName: String,
  email: String
})

const teamSchema = new mongoose.Schema({
  name: String,
  size: Number,
  description: String,
  people: [peopleSchema]
});



const eventSchema = new mongoose.Schema({
  eventName: String,
  OrganizationName: String,
  organizerEmail: String,
  eventDate: String,
  eventAdress: String,
  eventDescription: String,
  location: String,
  teams: [teamSchema],
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = {
  Event: mongoose.model('Event', eventSchema),
  Team: mongoose.model('Team', teamSchema),
  People: mongoose.model('People', peopleSchema)
};
