const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

// database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

// initialize Express app
const app = express();
// helps app to read JSON
app.use(express.json());

// start server
app.listen(port, () => {
    console.log('Server running on port', port);
});

// Example Route: Get all countries
app.get('/allcountries', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.countries');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for allcountries' });
    }
});

// Example Route: Create a new country
app.post('/addcountry', async (req, res) => {
    const { country_name, country_flag } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO countries (country_name, country_pic) VALUES (?, ?)', [country_name, country_pic]);
        res.status(201).json({message: 'Country ' + country_name + ' added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error - could not add country ' + country_name});
    }
});

// Example Route: Update country
app.post('/updatecountry', async (req, res) => {
    const { id, country_name, country_pic } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE countries SET country_name = ?, country_pic = ? WHERE id = ?', [country_name, country_pic, id]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error - could not update country ' + country_name});
    }
})