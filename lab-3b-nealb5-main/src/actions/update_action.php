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
$taskid = $_POST['taskid'];
$stmt = $conn->prepare("SELECT done FROM task WHERE id = ?");
$stmt->bind_param("i", $taskid );
    $stmt->execute();
    $stmt->bind_result($done);
    $stmt->fetch();
    $stmt->close();
if ($done == '0') {
    $stmt = "UPDATE `task` SET `done` = '1' WHERE id = '$taskid';";
    if (mysqli_query($conn, $stmt)) {
        header("Location: ../index.php");
    } else {
        $_SESSION['message'] = mysqli_error($conn);
        header("Location: ../index.php");
        }
} else {
    $stmt = "UPDATE `task` SET `done` = '0' WHERE id = '$taskid';";
    if (mysqli_query($conn, $stmt)) {
        header("Location: ../index.php");
    } 
    else {
    $_SESSION['message'] = mysqli_error($conn);
        header("Location: ../index.php");
    }
}

?>
