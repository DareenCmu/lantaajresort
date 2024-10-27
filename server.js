const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors

const app = express();
const corsOptions = {
  origin: ['https://lantaajresort.com', 'https://lantaajresort.onrender.com'], // Allow your live frontend and backend domains
  methods: 'GET,POST,PUT,DELETE', // Allow necessary HTTP methods
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Enable CORS for all routes
// Serve static files
app.use(express.static('public'));

// Create connection pool
const db = mysql.createPool({
  connectionLimit: 10, // Adjust based on your needs
  host: 'srv1649.hstgr.io',
  user: 'u786554873_lantaaj',
  password: 'Chiangmai1929!',
  database: 'u786554873_hotel_booking'
});

// Create a route to fetch available rooms
app.get('/available-rooms', (req, res) => {
  const { checkin, checkout } = req.query;

  const query = `
    SELECT room_type, MIN(rooms.price) AS price, GROUP_CONCAT(DISTINCT images.image_url) AS images, COUNT(room_type) AS available_rooms, rooms.description
    FROM rooms
    LEFT JOIN images ON rooms.id = images.room_id
    WHERE rooms.is_available = 1
      AND rooms.id NOT IN (
          SELECT room_id FROM bookings 
          WHERE (check_in < ? AND check_out > ?)
      )
    GROUP BY rooms.room_type , rooms.id 
    ORDER BY rooms.room_type;
`;

  db.query(query, [checkout, checkin], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database query error' });
    }

    // Convert the concatenated images to an array
    results = results.map(room => ({
      ...room,
      images: room.images ? room.images.split(',') : []  // Make sure images are returned as an array
    }));

    res.json(results);
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));