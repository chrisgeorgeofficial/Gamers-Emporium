// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5500;

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
    res.sendFile(__dirname + '/register.html');
});

app.post('/submit', (req, res) => {
    const { username, phonenumber, email, password } = req.body;

// if (!username || !password || !email || !phonenumber) {
//     // Handle missing data
//     res.status(400).send('Incomplete data provided.');
//     return;
// }
    
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
