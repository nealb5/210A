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
$id = $_SESSION['user_id'];
if (isset($_POST['submit-task'])) {
    $dateinput = htmlspecialchars($_POST['date']);
    $taskinput = htmlspecialchars($_POST['task']);
    $stmt = $conn->prepare("INSERT INTO task(`id`, `user_id`, `text`, `date`, `done`) 
    VALUES ('0', $id, ?, ?, '0')");
    $stmt->bind_param("ss", $taskinput, $dateinput, );
    $stmt->execute();
    $stmt->close();
    header("Location: ../index.php");
}
$conn->close();

?>
