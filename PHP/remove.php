<?php
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
$url = $data['meme_url'];

// Prepare SQL statement to delete data from a table named "memes"
$stmt = $conn->prepare("DELETE FROM memes WHERE meme_url = (?)");
if (!$stmt) {
    die("Error: " . $conn->error);
}

// Bind data to prepared statement
if (!$stmt->bind_param("s", $url)) {
    die("Error: " . $stmt->error);
}

// Execute SQL statement
if ($stmt->execute()) {
    echo 'Meme deleted successfully!';
} else {
    echo 'Error deleting meme.';
}

$conn->close();
?>

