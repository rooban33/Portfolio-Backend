const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // Replace with your desired port number

app.use(cors()); // Enable CORS

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2003',
  database: 'portfolio'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

// Route to handle fetching projects based on tag
app.get('/projects', (req, res) => {
  console.log('Received GET request at /api/projects');
  const { tag } = req.query;
  let query = 'SELECT id, title, des, img, git, pre FROM project WHERE 1 = 1'; // Base query

  // Add conditions based on tag
  if (tag === 'Java') {
    query += ' AND java = 1';
  }
  if (tag === 'Computer Vision') {
    query += ' AND cv = 1';
  }
  if (tag === 'Web Development') {
    query += ' AND web = 1';
  }
  if (tag === 'Flask') {
    query += ' AND flask = 1';
  }
  if (tag === 'ML') {
    query += ' AND ml = 1';
  }
  


  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ projects: results });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
