const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // For password hashing
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Viraj@123',
    database: 'school_website'
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes for user registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, roll_number, mobile_number, classes, parents_mobile_number, address, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing
        const sql = `INSERT INTO users (name, email, roll_number, mobile_number, classes, parents_mobile_number, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [name, email, roll_number, mobile_number, classes, parents_mobile_number, address, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Error registering user' });
            }
            console.log('User registered successfully');
            res.status(200).json({ message: 'User registered successfully' });
            // res.status(200).json({ message: 'User registered successfully', user: { name, email, roll_number, mobile_number, classes, parents_mobile_number, address } });

        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login page
app.post('/api/login', async (req, res) => {
    try {
        const { roll_number, email, password } = req.body;
        const sql = `SELECT * FROM users WHERE roll_number = ? AND email = ?`;
        connection.query(sql, [roll_number, email], async (err, result) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json({ error: 'Error during login' });
            }
            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            console.log('Login successful');
            res.status(200).json({ message: 'Login successful' });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error during login' });
    }
});


// Route to fetch user data
// app.get('/api/users', (req, res) => {
//     // Fetch user data from the database
//     const sql = 'SELECT * FROM users'; // Replace 'users' with your actual table name
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching user data:', err);
//             res.status(500).json({ error: 'Error fetching user data' });
//             return;
//         }
//         // Respond with the user data
//         res.status(200).json({ message: 'User data fetched successfully', users: results });
//     });
// });


// Modify your server-side route to accept a token parameter
app.get('/api/user/:rollNumber', async (req, res) => {
    try {
        const rollNumber = req.params.rollNumber;
        const sql = `SELECT * FROM users WHERE roll_number = ?`;
        connection.query(sql, [rollNumber], (err, result) => {
            if (err) {
                console.error('Error fetching user data:', err);
                return res.status(500).json({ error: 'Error fetching user data' });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userData = result[0]; // Assuming roll_number is unique
            res.status(200).json(userData); // Send response here
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
