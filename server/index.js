const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes and origins
app.use(cors());

// Existing code
app.use(express.json());

// Function to generate events
const generateEvents = (center) => {
  const categories = [
    "Community Cleanup",
    "Food Bank Assistance",
    "Senior Support",
    "Youth Mentoring",
    "Animal Shelter Help"
  ];

  const names = [
    "Manny's", "Jeoffy's", "Alice's", "Bob's", "Cara's",
    "Derek's", "Eliza's", "Fred's", "Gina's", "Xi's",
    "Ash's", "HSHacks's"
  ];

  const addDaysToDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const today = new Date();
  return categories.flatMap(category => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDays = Math.floor(Math.random() * 6) + 1;
    const eventDate = addDaysToDate(today, randomDays).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    return {
      name: `${randomName} ${category}`,
      category,
      date: eventDate,
      location: {
        lat: center.lat + (Math.random() * 0.016),
        lng: center.lng + (Math.random() * 0.016)
      },
      link: "https://www.volgistics.com/appform/496382677",
    };
  });
};

app.get("/events", (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).send("Latitude and longitude are required.");
  }
  const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
  const events = generateEvents(center);
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
