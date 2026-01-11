<?php
session_start();

if (!isset($_SESSION['logged_in'])) {
    header("Location: login.php");
    exit();
}

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
$user_id = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task List Application</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- <script src="js/script.js"></script> -->
</head>
<body>
    <div class="container">
        <nav>
            <a href="https://www.aad.org/public/everyday-care/skin-care-basics/hair/how-to-shave">Don't know how to shave? Click here</a>
            <!-- Add logout form -->
            <form action="actions/logout_action.php" method="post">
                <button type="submit" name="logout">Logout</button>
            </form>
        </nav>
        <h1>My Prioritization</h1>
        <h2>To do:</h2>
        <input type="checkbox" class="toggle-switch" id="cb-sort1">
        <label for="cb-sort1">Sort by Date</label>

        <input type="checkbox" class="toggle-switch" id="cb-sort2">
        <label for="cb-sort2">Filter completed tasks</label>

        <div class="tasks-container">
            <ul class="task-list">
                <?php
                // Loop through the results and print tasks
                $sql = "SELECT id, text, date, done FROM task WHERE user_id = ?";
                $stmt = $conn->prepare($sql);
                if ($stmt === false || $stmt === null) {
                die('Error in prepare statement: ' . $conn->error);
                }
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $stmt->bind_result($id, $text, $date, $done);
                while ($stmt->fetch()){
                    $date = date_format(date_create_from_format('Y-m-d', $date), 'd/m/Y');
                //     //if ($done === '0') {
                //       printTask ($id, $text, $date);
                //     } else {
                //       printTaskDone ($id, $text, $date);
                //  //   }
                  if ($done == 1){
                    $checked = '<img src="check.png" alt="Check">';
                  }
                  else {
                    $checked = '<img src="empty.png" alt="Empty">';
                  }
                  echo
                    '<li class="task">
                    <form action="actions/update_action.php" method="post">
                    <button id="checkboxButton" type="submit" class="checkbox task-done checkbox-icon" name="cb-task' . $id . '">
                    '.$checked.'
                    </button>
                    <input type="hidden" name="taskid" value="' . $id .'">

                    </form>
                    <label for="cb-task' . $id . '">' . $text . '</label>
                    <span class="date">' . $date . '</span>
                    <form action="actions/delete_action.php" method="post">
                    <button class="task-delete material-icon"><img src="Delete.png" alt="Delete"></button>
                    <input type="hidden" name="delete-task" value="'.$id.'">

                    </form>
                    </li>';  
                }
                $stmt->close();
                ?>
            </ul>
        </div>

        <form action="actions/create_action.php" method="post">
            <div>
                <label for="Description" class="task-description">Task Description:</label>
                <input class="task-description" type="text" id="Description" name="task" required>
            </div>
            <div>
                <label for="date" class="task-date">Task Date:</label><br>
                <input type="date" id="date" name="date" required>
            </div>
            <div>
                <button type="submit" name="submit-task" class="selector">Create Task</button>
            </div>
        </form>
    </div>
</body>
</html>
