// this exists to make sure the URI works - Nathan
const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

async function testEvent() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const event = new Event({
      eventName: 'Test Event 3',
      OrganizationName: 'Test Organization',
      organizerEmail: 'test@example.com',
      eventDate: '2025-05-15',
      eventAdress: '123 Test St, Test City',
      eventDescription: 'This is a test event for pagination.',
      location: '37.7749, -122.4194',
      teams: [
        {
          name: 'Test Team 1',
          size: 5,
          description: 'This is a test team.',
        },
      ],
      status: 'pending',
    });

    const savedEvent = await event.save();
    console.log('Event saved:', savedEvent);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
    mongoose.connection.close();
  }
}

testEvent();