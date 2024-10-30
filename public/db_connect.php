<?php
$servername = "srv1649.hstgr.io";  // Update this to match the host in your JavaScript
$username = "u786554873_lantaaj";  // Update this to match the username in your JavaScript
$password = "Chiangmai1929!";  // Update this to match the password in your JavaScript
$dbname = "u786554873_hotel_booking";  // Update this to match the database name in your JavaScript

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
