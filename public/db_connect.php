<?php
$servername = "193.203.168.147"; // or srv1649.hstgr.io
$username = "u786554873_lantaaj";
$password = "Chiangmai1929!";
$dbname = "u786554873_hotel_booking";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: (" . $conn->connect_errno . ") " . $conn->connect_error);
} else {
    echo "Successfully connected to the database!";
}


?>
