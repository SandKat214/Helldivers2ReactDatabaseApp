// Citation for the following source code:
// Date: 5/20/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of planet in Planets
const getPlanet = async (req, res) => {
  try {
    // Select all rows from the "Planets" table
    const query = "SELECT * FROM Planets";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching planet from the database:", error);
    res.status(500).json({ error: "Error fetching planet" });
  }
};

// Returns status of creation of new planet in Planets
const createPlanet = async (req, res) => {
  try {
    const { planetName, planetTerrain } = req.body;
    const query =
      "INSERT INTO Planets (planetName,planetTerrain) VALUES (?, ?)";

    const terrainSet = new Set([
      "Mountains",
      "Ocean",
      "Desert",
      "Swamp",
      "Forest",
      "Icy",
    ]);

    if (!terrainSet.has(planetTerrain)) {
      throw new Error(`"${planetTerrain}" is not an allowed terrain type`);
    }

    const response = await db.query(query, [planetName, planetTerrain]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating planet:", error);
    // Inform the client of the error
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlanet,
  createPlanet,
};
