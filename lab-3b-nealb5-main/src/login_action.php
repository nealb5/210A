<?php
// ./actions/login_action.php

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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $check_username_sql = "SELECT * FROM user WHERE username=?";
    $stmt = $conn->prepare($check_username_sql);
    if ($stmt === false) {
        die('Error in prepare statement: ' . $conn->error);
    }
    $stmt->bind_param("s", $username);

    if ($stmt === false) {
        $errors[] = "Preparation of statement failed: " . $conn->error;
    } else {
        if (!$stmt->execute()) {
            $errors[] = "Execution of statement failed: " . $conn->error;
        }
    }

    $result = $stmt->get_result();
    if ($result === false) {
        $errors[] = "Getting result failed: " . $conn->error;
    } else {
        $user_data = $result->fetch_assoc();
        if ($user_data === null) {
            $errors[] = "Username not found";
        } else {
            $stored_password = $user_data['password'];
            if (!password_verify($password, $stored_password)) {
                $errors[] = "Incorrect password";
            } else {
                session_start();
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $username;
                $_SESSION['user_id'] = $user_data['id'];

                $user_id = $user_data['id'];
                $update_logged_in_sql = "UPDATE user SET logged_in = true WHERE id=?";
                $stmt = $conn->prepare($update_logged_in_sql);
                $stmt->bind_param("i", $user_id);
                if ($stmt === false || !$stmt->execute()) {
                    $errors[] = "Update failed: " . $conn->error;
                }
            }
        }
    }

    if (!empty($errors)) {
        session_start();
        $_SESSION['errors'] = $errors;
        header("Location: login.php");
        exit();
    } else {
        header("Location: index.php");
        exit();
    }
}
?>
