const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const db = require('../model/db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: './public/uploads/',
    // filename: function (req, file, cb) {
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // }
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage
}).single('myFile');

router.post('/profile/upload/:userId', (req, res) => {
    const userId = req.params.userId;

    upload(req, res, async (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (req.file === undefined) {
                res.status(400).send('No file selected');
            } else {
                let conn;
                try {
                    conn = await db.getConnection();

                    // Insert the file record into the database
                    await conn.query('UPDATE ProfilePictures SET filePath = ? WHERE userId = ?', ['/public/uploads/' + req.file.filename, userId]);

                    res.json({
                        message: 'File uploaded successfully',
                        filepath: '/public/uploads/' + req.file.filename
                    });
                } catch (err) {
                    console.log(err);
                    res.status(500).send(err);
                } finally {
                    if (conn) conn.release();
                }
            }
        }
    });
});

router.get('/download/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    let conn;
    try {
        conn = await db.getConnection();
        const [rows] = await conn.query("SELECT filePath FROM ProfilePictures WHERE userId = ?", [userId]);

        if (rows.length > 0) {
            const filePath = path.join(__dirname, '..', rows[0].filePath);

            // Check if file exists
            if (fs.existsSync(filePath)) {
                res.download(filePath); // Set disposition and send it.
            } else {
                res.status(404).send('File not found');
            }
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.release();
    }
});

router.get('/getfiles', (req, res) => {
    const directoryPath = path.join(__dirname, '../public/uploads'); // specify the directory

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            res.status(500).send({ error: 'Unable to scan directory' });
        } else {
            res.status(200).send(files); // returns the list of files
        }
    });
});

module.exports = router;
