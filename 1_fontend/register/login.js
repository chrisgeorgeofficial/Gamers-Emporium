// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check user credentials in MySQL
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error checking user credentials:', err);
            res.send('Error logging in.');
        } else {
            if (result.length > 0) {
                console.log('User logged in successfully.');
                res.send('Login successful!');
            } else {
                console.log('Invalid credentials.');
                res.send('Invalid credentials. Login failed.');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
