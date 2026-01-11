<?php
// ./actions/register_action.php
session_start();

// Read form variables
$username = $_POST['username'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Create connection
$mysql_servername = getenv("MYSQL_SERVERNAME");
$mysql_user = getenv("MYSQL_USER");
$mysql_password = getenv("MYSQL_PASSWORD");
$mysql_database = getenv("MYSQL_DATABASE");

$conn = new mysqli($mysql_servername, $mysql_user, $mysql_password, $mysql_database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if passwords match
if ($password !== $confirm_password) {
    $_SESSION['error'] = "Passwords do not match!";
    header("Location: ../register.php");
    exit();
}

// Check if username exists
$stmt = $conn->prepare("SELECT id FROM user WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $_SESSION['error'] = "Username already exists!";
    header("Location: ../register.php");
    exit();
}

$stmt->close();

// Hash the password and insert new user
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO user (username, password, logged_in) VALUES (?, ?, true)");
$stmt->bind_param("ss", $username, $hashed_password);
$stmt->execute();

// Set session variables and redirect
$_SESSION['logged_in'] = true;
$_SESSION['username'] = $username;
$_SESSION['id'] = $stmt->insert_id;

header("Location: ../index.php");
exit();
?>
