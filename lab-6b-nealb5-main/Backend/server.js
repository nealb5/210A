const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const db = require('./model/db.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization']
}));


const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const fileRoutes = require('./routes/files');



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/files', fileRoutes);


