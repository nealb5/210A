<?php
// ./actions/logout_action.php

// Read variables and create connection
$mysql_servername = getenv("MYSQL_SERVERNAME");
$mysql_user = getenv("MYSQL_USER");
$mysql_password = getenv("MYSQL_PASSWORD");
$mysql_database = getenv("MYSQL_DATABASE");
$conn = new mysqli($mysql_servername, $mysql_user, $mysql_password, $mysql_database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$errors = [];

session_start();
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    $username = $_SESSION['username'];
    $update_logged_in_sql = "UPDATE user SET logged_in= 0 WHERE username=?";
    $stmt = $conn->prepare($update_logged_in_sql);
    $stmt->bind_param("s", $username);

    if ($stmt === false) {
        $errors[] = "Update preparation failed: " . $conn->error;
    } else {
        if ($stmt->execute() === false) {
            $errors[] = "Update failed: " . $conn->error;
        }
    }

    session_unset();
    session_destroy();
}

if (!empty($errors)) {
    foreach ($errors as $error) {
        echo $error . "<br>";
    }
    exit();
}

header("Location: ../login.php");
exit();
?>
