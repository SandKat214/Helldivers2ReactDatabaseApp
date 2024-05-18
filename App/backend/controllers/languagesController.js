// Citation for the following source code:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of languages in Languages
const getLanguages = async (req, res) => {
  try {
    // Select all rows from the "Languages" table
    const query = "SELECT * FROM Languages";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching languages from the database:", error);
    res.status(500).json({ error: "Error fetching languages" });
  }
};

// Returns status of creation of new person in bsg_people
const createLanguage = async (req, res) => {
    try {
      const { langID, langName } = req.body;
      const query =
        "INSERT INTO Languages (langID, langName) VALUES (?, ?)";
  
      const response = await db.query(query, [
        langID,
        langName,
      ]);
      res.status(201).json(response);
    } catch (error) {
      // Print the error for the dev
      console.error("Error creating language:", error);
      // Inform the client of the error
      res.status(500).json({ error: "Error creating language" });
    }
  };

  // Export the functions as methods of an object
module.exports = {
    getLanguages,
    createLanguage,
  };