<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
</head>
<body>
    <h2>User Login</h2>
    
    <?php

    if(isset($_SESSION['errors']) && !empty($_SESSION['errors'])) {
        echo "<div style='color:red;'>";
        foreach($_SESSION['errors'] as $error) {
            echo "<p>$error</p>";
        }
        echo "</div>";
        unset($_SESSION['errors']);
    }
    ?>
    
    <form action="login_action.php" method="post">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <button type="submit">Login</button>
            <a href="register.php">Create</a>
        </div>
    </form>
</body>
</html>
