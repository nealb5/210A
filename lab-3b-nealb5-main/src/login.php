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
    // Check if there are any error messages stored in the session
    if(isset($_SESSION['errors']) && !empty($_SESSION['errors'])) {
        echo "<div style='color:red;'>";
        foreach($_SESSION['errors'] as $error) {
            echo "<p>$error</p>";
        }
        echo "</div>";
        // Clear the error messages from the session after displaying them
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
            <a href="register.php">Register</a>
        </div>
    </form>
</body>
</html>
