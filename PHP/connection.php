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

// SQL query to retrieve data from a table named "users"
$sql = "SELECT meme_url FROM memes";
$result = $conn->query($sql);

// Convert result set to JSON object
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);

$conn->close();
?>
