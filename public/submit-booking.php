<?php
// Include the database connection file
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db_connect.php';  // Your database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize form data from POST request
    $first_name = htmlspecialchars(trim($_POST['first_name']));
    $surname = htmlspecialchars(trim($_POST['surname']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $country = htmlspecialchars(trim($_POST['country']));
    $visited_before = htmlspecialchars(trim($_POST['visited_before']));
    $comments = htmlspecialchars(trim($_POST['comments']));
    $payment_method = htmlspecialchars(trim($_POST['payment_method']));
    $total_price = isset($_POST['total_price']) ? floatval($_POST['total_price']) : 0;
    $room_count = isset($_POST['room_count']) ? $_POST['room_count'] : 1;
    $nights = isset($_POST['nights']) ? $_POST['nights'] : 1;
    $room_type = isset($_POST['room_type']) ? htmlspecialchars(trim($_POST['room_type'])) : '';

    // Debug: Display collected form data
    echo "<h2>Collected Form Data for Debugging</h2>";
    echo "First Name: $first_name<br>";
    echo "Surname: $surname<br>";
    echo "Email: $email<br>";
    echo "Country: $country<br>";
    echo "Phone: $phone<br>";
    echo "Visited Before: $visited_before<br>";
    echo "Comments: $comments<br>";
    echo "Payment Method: $payment_method<br>";
    echo "Total Price: $total_price<br>";
    echo "room_count: $room_count<br>";
    echo "nights: $nights<br>";
    echo "Room Type: $room_type<br>";
    // Ensure all required fields are filled
    if (empty($first_name) || empty($surname) || empty($email)) {
        echo "Error: Missing required form fields.<br>";
        exit;
    }
    // Check if the connection is still alive
    if ($conn->ping()) {
        echo "Connection is still alive.<br>";
    } else {
        echo "Connection is closed.<br>";
    }
    // Add $room_count and $nights to your SQL query
    $sql = "INSERT INTO guestbooking (first_name, surname, email, phone, country, visited_before, comments, payment_method, total_price, room_count, nights, room_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // Debug: Display SQL query for verification
    echo "SQL Query: $sql<br>";

    // Prepare and execute the query
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssssddis", $first_name, $surname, $email, $phone, $country, $visited_before, $comments, $payment_method, $total_price, $room_count, $nights, $room_type);
        if ($stmt->execute()) {
            echo "Booking successful!";
        } else {
            echo "SQL Execution Error: " . $stmt->error . "<br>";
        }
        $stmt->close();
    } else {
        echo "SQL Preparation Error: " . $conn->error . "<br>";
    }

    // Close the connection
    $conn->close();
}
?>
