const express = require('express');
const router = express.Router();
const db = require('../model/db.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



// JWT verification middleware
async function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    let token = req.headers.authorization.split(' ')[1];

    // TODO: add check for if token is expired and process differently
    jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: `Error decoding token: ${err}` })
        }
        
        const expirationDate = new Date(decoded.exp*1000);
        if (expirationDate < Date.now() && req.path != "/logout") {
            return res.status(500).json({ error: 'Token has expired' });
        }

        req.userId = decoded.id;
        next();
    });
}

router.get('/listUsers', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [users] = await connection.query('SELECT * FROM Users');

        if (users.length > 0) {
            res.json({ status: 'success', data: users });
        } else {
            res.json({ status: 'success', data: [] });
        }

        connection.release();
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const [user] = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
    if (user.length === 0) {
        res.status(404).send({ error: "User not found" });
    } else {
        res.json(user[0]);
    }
});

router.post('/register', async (req, res) => {
    try {
        let { username, email, password, role = 'user' } = req.body;
        const connection = await db.getConnection();

        const result = await connection.query('INSERT INTO Users (username, email, password, role, isActive) VALUES (?, ?, ?, ?, 0)', [username, email, password, role]);
        const userId = result[0].insertId;
        console.log('User ID:', userId);

        await conn.query('INSERT INTO ProfilePictures (userId, filePath) VALUES (?, ?)', [userId, '/public/uploads/default-profile-pic.jpg']);
        connection.release();

        res.json({ status: 'success', message: 'User registered.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/addUser', verifyToken, async (req, res) => {
    try {
        const { role: userRole } = jwt.decode(req.headers.authorization.split(' ')[1]);  // get role from token

        if (userRole !== 'admin') {
            return res.status(403).json({ status: 'error', message: 'You need admin privileges to add a user.' });
        }

        const { username, email, password, role = 'user' } = req.body;
        const connection = await db.getConnection();

        const result = await connection.query('INSERT INTO Users (username, email, password, role, isActive) VALUES (?, ?, ?, ?, 1)', [username, email, password, role]);
        const userId = result[0].insertId;

        await connection.query('INSERT INTO ProfilePictures (userId, filePath) VALUES (?, ?)', [userId, '/public/uploads/default-profile-pic.jpg']);
        connection.release();

        res.json({ status: 'success', message: 'User added.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        const connection = await db.getConnection();

        const [users] = await connection.query(`SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`);
        let user = users[0];

        if (!user) {
            connection.release();
            return res.status(401).send('Invalid username or password.');
        }

        // the secret is "secret"
        const token = jwt.sign({ id: user.id, username: user.username, userEmail: user.email, password: user.password, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });

        await connection.query('UPDATE Users SET isActive = 1 WHERE id = ?', [user.id]);

        connection.release();
        res.json({ token, userId: user.id });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/logout', verifyToken, async (req, res) => {
    try {
        const connection = await db.getConnection();

        await connection.query('UPDATE Users SET isActive = 0 WHERE id = ?', [req.userId]);

        connection.release();
        res.send('User logged out.');
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


// Update profile information
router.put('/user/:userId', verifyToken, async (req, res) => {
    try {
        let { newUsername, oldPassword, newPassword, newEmail, newRole } = req.body; // extract new profile data from request body
        const userId = req.params.userId; // extract userId from the route parameter
        const connection = await db.getConnection();

        let updates = [];
        let params = [];

        if (newUsername !== undefined) {
            updates.push('username = ?');
            params.push(newUsername);
        }

        if (newPassword !== undefined) {
            updates.push('password = ?');
            params.push(newPassword);
        }

        if (newEmail !== undefined) {
            updates.push('email = ?');
            params.push(newEmail);
        }

        if (newRole !== undefined) {
            updates.push('role = ?');
            params.push(newRole);
        }

        if (updates.length === 0) {
            return res.status(400).json({ status: 'error', message: 'No fields to update.' });
        }

        // Add userId to parameters for SQL query
        params.push(userId);

        // Join all updates to create the SQL query
        const sql = `UPDATE Users SET ${updates.join(', ')} WHERE id = ?`;

        // Update the user in the database
        await connection.query(sql, params);
        connection.release();

        // Grab updated user info
        const [users] = await connection.query(`SELECT * FROM Users WHERE id = ?`, [userId]);
        let user = users[0];

        if (!user) {
            connection.release();
            return res.status(401).send('Invalid user ID.');
        }

        // create a new token with updated information
        // the secret is "secret"
        const token = jwt.sign({ id: user.id, username: user.username, userEmail: user.email, password: user.password, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ token, userId, message: 'Profile updated successfully.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.put('/update-password/:userId', verifyToken, async (req, res) => {
    try {
        let { password } = req.body; // extract new password from request body
        const userId = req.params.userId; // extract userId from the route parameter
        const connection = await db.getConnection();

        if (!password) {
            return res.status(400).json({ status: 'error', message: 'Password is required.' });
        }

        // Update the user's password in the database
        await connection.query('UPDATE Users SET password = ? WHERE id = ?', [password, userId]);

        connection.release();

        res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.delete('/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId; // extract userId from the route parameter
        const connection = await db.getConnection();

        const [users] = await connection.query('SELECT * FROM Users WHERE id = ?', [userId]);
        if (users.length === 0) {
            res.status(404).send({ error: "User not found" });
        } else {
            // Delete associated Basket
            await connection.query('DELETE FROM Baskets WHERE userId = ?', [userId]);

            // Delete the User
            await connection.query('DELETE FROM Users WHERE id = ?', [userId]);

            connection.release();

            res.json({ message: 'User deleted.' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


// User address endpoints

router.get('/user/:userId/address', verifyToken, async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [addresses] = await connection.query('SELECT * FROM UserAddresses WHERE userId = ?', [req.userId]);
        connection.release();
        res.json({ status: 'success', data: addresses });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.post('/user/:userId/address', verifyToken, async (req, res) => {
    try {
        const { street, city, state, country, zip } = req.body;
        const connection = await db.getConnection();

        await connection.query('INSERT INTO UserAddresses (userId, street, city, state, country, zip) VALUES (?, ?, ?, ?, ?, ?)',
            [req.userId, street, city, state, country, zip]);

        connection.release();
        res.json({ status: 'success', message: 'Address added.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.put('/user/:userId/address/:addressId', verifyToken, async (req, res) => {
    try {
        const { street, city, zip, country } = req.body;
        const connection = await db.getConnection();

        await connection.query(
            'UPDATE UserAddresses SET street = ?, city = ?, zip = ?, country = ? WHERE userId = ? AND id = ?',
            [street, city, zip, country, req.userId, req.params.addressId]
        );

        connection.release();
        res.json({ status: 'success', message: 'Address updated.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.delete('/user/:userId/address/:addressId', verifyToken, async (req, res) => {
    try {
        const connection = await db.getConnection();

        await connection.query(
            'DELETE FROM UserAddresses WHERE userId = ? AND id = ?',
            [req.userId, req.params.addressId]
        );

        connection.release();
        res.json({ status: 'success', message: 'Address deleted.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


// User payment endpoints

router.get('/user/:userId/payment', verifyToken, async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [paymentMethods] = await connection.query('SELECT * FROM UserPaymentMethods WHERE userId = ?', [req.userId]);
        connection.release();
        res.json({ status: 'success', data: paymentMethods });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/user/:userId/payment', verifyToken, async (req, res) => {
    try {
        const { cardName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;
        const connection = await db.getConnection();

        await connection.query('INSERT INTO UserPaymentMethods (userId, cardHolderName, cardNumber, expiryMonth, expiryYear, cvv) VALUES (?, ?, ?, ?, ?, ?)',
            [req.userId, cardName, cardNumber, expiryMonth, expiryYear, cvv]);

        connection.release();
        res.json({ status: 'success', message: 'Payment method added.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.put('/user/:userId/payment/:paymentId', verifyToken, async (req, res) => {
    try {
        const { cardName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;
        const connection = await db.getConnection();

        await connection.query(
            'UPDATE UserPaymentMethods SET cardName = ?, cardNumber = ?, expiryMonth = ?, expiryYear = ?, cvv = ? WHERE userId = ? AND id = ?',
            [cardName, cardNumber, expiryMonth, expiryYear, cvv, req.userId, req.params.paymentId]
        );

        connection.release();
        res.json({ status: 'success', message: 'Payment method updated.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.delete('/user/:userId/payment/:paymentId', verifyToken, async (req, res) => {
    try {
        const connection = await db.getConnection();

        await connection.query(
            'DELETE FROM UserPaymentMethods WHERE userId = ? AND id = ?',
            [req.userId, req.params.paymentId]
        );

        connection.release();
        res.json({ status: 'success', message: 'Payment method deleted.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Customer Feedback API

router.post('/feedback', async (req, res) => {
    try {
        const { userId, author, feedback, rating } = req.body;
        const [result] = await db.query('INSERT INTO CustomerFeedback (userId, author, feedback, rating) VALUES (?, ?, ?, ?)', [userId, author, feedback, rating]);

        res.status(200).json({ message: "Feedback submitted successfully!", feedbackId: result.insertId });
    } catch (err) {
        console.error(err); // Log the entire error object
        res.status(500).json({ message: err.message });
    }
});

router.get('/feedback', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM CustomerFeedback');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/junk', async (req, res) => {
    try {
        const [userRows] = await db.query('SELECT * FROM Users');
        const [paymentRows] = await db.query('SELECT * FROM UserPaymentMethods');
        const [addressRows] = await db.query('SELECT * FROM UserAddresses');
        const [reviewRows] = await db.query('SELECT * FROM Reviews');
        const [profilePicRows] = await db.query('SELECT * FROM ProfilePictures');
        const [productRows] = await db.query('SELECT * FROM Products');
        const [feedbackRows] = await db.query('SELECT * FROM CustomerFeedback');
        const [basketRows] = await db.query('SELECT * FROM BasketItems');

        const rows = userRows.concat(paymentRows).concat(addressRows).concat(reviewRows).concat(profilePicRows).concat(productRows).concat(feedbackRows).concat(basketRows);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;