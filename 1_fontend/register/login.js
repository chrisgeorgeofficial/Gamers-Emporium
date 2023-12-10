// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5500;

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login1', (req, res) => {
    res.sendFile(__dirname + '/register/login.html');
});

app.post('/login1', (req, res) => {
    const { email, password } = req.body;

    // Check user credentials in MySQL
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error checking user credentials:', err);
            res.send('Error logging in.');
        } else {
            if (result.length > 0) {
                console.log('User logged in successfully.');
                res.send('Login successful!');
                alert("sucessfull")
                localStorage.setItem('isLoggedIn','true');
                alert("Login Sucessfull ");
                window.location.href ='/1_fontend/index.html'
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
