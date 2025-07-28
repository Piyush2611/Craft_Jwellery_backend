const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./app/database/index'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Sample GET route
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Craft Jewellery');
});

// Async function to connect DB, sync models, and start server
async function startServer() {
  try {
    await db.authenticate();
    console.log('\x1b[34m✔ Database connected successfully\x1b[0m');

    await db.sync();
    console.log('\x1b[36m✔ All models synchronized\x1b[0m');

    app.listen(PORT, () => {
      console.log(`\x1b[32m✔ Server is running on port ${PORT}\x1b[0m`);
    });
  } catch (err) {
    console.error('\x1b[31m✖ Error connecting to the database:', err.message, '\x1b[0m');
    process.exit(1); // Exit process if DB connection fails
  }
}

startServer();
