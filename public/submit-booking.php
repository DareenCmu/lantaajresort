<?php
// Include the database connection file
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

    // Ensure all required fields are filled
    if (empty($first_name) || empty($surname) || empty($email)) {
        echo "Error: Missing required form fields.<br>";
        exit;
    }

    // Prepare the SQL query
    $sql = "INSERT INTO guestbooking (first_name, surname, email, phone, country, visited_before, comments, payment_method, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Debug: Display SQL query for verification
    echo "SQL Query: $sql<br>";

    // Prepare and execute the query
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssssssssd", $first_name, $surname, $email, $phone, $country, $visited_before, $comments, $payment_method, $total_price);
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
