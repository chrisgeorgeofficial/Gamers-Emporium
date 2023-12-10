// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'gamers_emporium'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/1_frontend/register/register.html');
});

app.post('/1_fontend/register/register.html', (req, res) => {
    const { username, password, email, phonenumber } = req.body;

    // Insert user data into MySQL
    const sql = 'INSERT INTO users (username, phonenumber, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, phonenumber, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.send('Error signing up.');
        } else {
            console.log('User signed up successfully.');
            res.send('Signup successful!');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
