const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const input = require("./lib/input.js");
const intro = require("./lib/intro.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '7@gma6#U^uB3dHNr',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

console.log(intro);
input.askQuestions();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
