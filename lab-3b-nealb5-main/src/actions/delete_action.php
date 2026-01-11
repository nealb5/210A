<?php
$mysql_servername = getenv("MYSQL_SERVERNAME");
$mysql_user = getenv("MYSQL_USER");
$mysql_password = getenv("MYSQL_PASSWORD");
$mysql_database = getenv("MYSQL_DATABASE");
$conn = new mysqli($mysql_servername, $mysql_user, $mysql_password, $mysql_database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
session_start();
$id = $_POST['delete-task'];
$sql = "DELETE FROM `task` WHERE `id` = '$id';";
if (!mysqli_query($conn, $sql)) {
    $_SESSION['message'] = mysqli_error($conn);
    header("Location: ../index.php");
} else  {
    header("Location: ../index.php");
}
?>
