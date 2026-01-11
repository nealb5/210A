const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/listAll', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM Products");
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});

router.get('/basket-items/:userId', async (req, res) => {
    const userId = req.params.userId;
    let conn;
    try {
        conn = await db.getConnection();
        const [rows] = await conn.query("SELECT Products.id, Products.name, Products.price, Products.image_url, BasketItems.quantity FROM Products JOIN BasketItems ON Products.id=BasketItems.ProductId WHERE userId = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.json({ message: 'No data found.' });
        }
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});



router.post('/basket-items/:userId', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let conn;
    try {
        conn = await db.getConnection();
        const [existingItems] = await conn.query("SELECT * FROM BasketItems WHERE userId = ? AND ProductId = ?", [userId, productId]);

        if (existingItems.length > 0) {
            // Item already exists in the basket, so update its quantity
            const [result] = await conn.query("UPDATE BasketItems SET quantity = quantity + ? WHERE userId = ? AND ProductId = ?", [quantity, userId, productId]);
            res.json({ success: true, data: result });
        } else {
            // Item does not exist in the basket, so insert it as a new item
            const [result] = await conn.query("INSERT INTO BasketItems (userId, ProductId, quantity) VALUES (?, ?, ?)", [userId, productId, quantity]);
            res.json({ success: true, data: result });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});

router.post('/checkout', async (req, res) => {
    const { userId, total } = req.body;
    let conn;
    try {
        conn = await db.getConnection();
        // Logic to process the order
        // ...
        await conn.query("DELETE FROM BasketItems WHERE userId = ?", [userId]);
        res.json({ message: 'Order processed successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});

router.patch('/basket-items/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { changeInQuantity } = req.body; // The change in quantity. This could be positive or negative.
    let conn;
    try {
        conn = await db.getConnection();
        const [existingItems] = await conn.query(
            "SELECT * FROM BasketItems WHERE userId = ? AND ProductId = ?",
            [userId, productId]
        );

        if (existingItems.length > 0) {
            // Item exists in the basket, so update its quantity
            if (existingItems[0].quantity + changeInQuantity < 0) {
                // The quantity should not become negative
                res.status(400).json({ success: false, message: 'Quantity cannot be less than 0' });
            } else if (existingItems[0].quantity + changeInQuantity == 0) {
                // If the new quantity is zero, delete the item
                await conn.query("DELETE FROM BasketItems WHERE userId = ? AND ProductId = ?", [userId, productId]);
                res.json({ success: true });
            }
            else {
                await conn.query(
                    "UPDATE BasketItems SET quantity = quantity + ? WHERE userId = ? AND ProductId = ?",
                    [changeInQuantity, userId, productId]
                );
                res.json({ success: true });
            }
        } else {
            // Item does not exist in the basket
            res.status(404).json({ success: false, message: 'Product not found in the basket' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});


router.delete('/basket-items/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    let conn;
    try {
        conn = await db.getConnection();
        await conn.query("DELETE FROM BasketItems WHERE userId = ? AND ProductId = ?", [userId, productId]);
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});

// Customer Reviews

router.post('/submit-review', async (req, res) => {
    const { review, rating, product_id, user_id } = req.body;
    console.log('Received review data: ', { review, rating, product_id, user_id }); // Log the incoming data to check if it's correct
    let conn;
    try {
        conn = await db.getConnection();
        console.log('Database connection: ', conn); // Log the connection object to check if it's correct
        const result = await conn.query('INSERT INTO Reviews (product_id, user_id, rating, review, created_at) VALUES (?, ?, ?, ?, NOW())', [product_id, user_id, rating, review]);
        console.log('SQL query result: ', result); // Log the result of the SQL query to check if it's correct
        res.json({ success: true, data: result });
    } catch (err) {
        console.log('Error: ', err); // Log any errors that occur
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});



module.exports = router;
