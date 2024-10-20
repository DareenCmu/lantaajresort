require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
//app.use(express.static('public')); // Ensure 'public' is the correct path to your static files
app.use(express.static(path.join(__dirname, 'public')));
// Define a POST route for sending email
app.post("/send-email", (req, res) => {  // Corrected 'POST' to 'post'
    const { name, email, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',  // Correct service name
      port: 587,
      secure: false, 
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Use authenticated user's email
        to: process.env.EMAIL_USER,    // Send email to authenticated user or another desired recipient
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error sending message' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true, message: 'Message sent successfully!' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



