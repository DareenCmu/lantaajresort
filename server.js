const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors

const app = express();
const corsOptions = {
  origin: 'https://lantaajresort.com', // Allow requests only from this domain
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.static('public'));

// Create connection
const db = mysql.createConnection({
  host: 'srv1649.hstgr.io',  // Make sure the host is correct for your MySQL instance
  user: 'u786554873_lantaaj',
  password: 'Chiangmai1929!',
  database: 'u786554873_hotel_booking'
});

// No need to manually connect. Queries will auto-connect

// Create a route to fetch available rooms
app.get('/available-rooms', (req, res) => {
  const { checkin, checkout } = req.query;

  const query = `
      SELECT rooms.*, GROUP_CONCAT(images.image_url) AS images
      FROM rooms
      LEFT JOIN images ON rooms.id = images.room_id
      WHERE rooms.is_available = 1
        AND rooms.id NOT IN (
            SELECT room_id FROM bookings 
            WHERE (check_in < ? AND check_out > ?)
        )
      GROUP BY rooms.id
  `;

  db.query(query, [checkout, checkin], (err, results) => {
      if (err) {
          console.error(err);
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
