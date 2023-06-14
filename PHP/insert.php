<?php
// Replace database credentials with your own
$servername = "localhost";
$username = "admin";
$password = "36XiJoZ8";
$dbname = "oblibenememes";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from AJAX request
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['meme_url'];

// Prepare SQL statement to insert data into a table named "memes"
$stmt = $conn->prepare("INSERT INTO memes (meme_url) VALUES (?)");
if (!$stmt) {
    die("Error: " . $conn->error);
}

// Bind data to prepared statement
if (!$stmt->bind_param("s", $name)) {
    die("Error: " . $stmt->error);
}

// Execute prepared statement
if (!$stmt->execute()) {
    die("Error: " . $stmt->error);
}

$conn->close();
?>
