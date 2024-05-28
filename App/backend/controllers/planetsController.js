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

// Returns a single planet by their unique ID from Planets
const getPlanetByID = async (req, res) => {
  try {
    const playerID = req.params.id;
    const query = "SELECT * FROM Planets WHERE id = ?";
    const [result] = await db.query(query, [playerID]);
    // Check if planet was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Planet not found" });
    }
    const planet = result[0];
    res.json(planet);
  } catch (error) {
    console.error("Error fetching planet from the database:", error);
    res.status(500).json({ error: "Error fetching planet" });
  }
};

// Returns status of creation of new planet in Planets
const createPlanet = async (req, res) => {
  try {
    const {
      playerName,
      playerAlias,
      playerLevel,
      playerAge,
      playerJoin,
      playerImage,
    } = req.body;
    const query =
      "INSERT INTO Planets (playerName, playerAlias, playerLevel, playerAge, playerJoin, playerImage) VALUES (?, ?, ?, ?, ?, ?)";

    const response = await db.query(query, [
      playerName,
      playerAlias,
      playerLevel,
      playerAge,
      playerJoin,
      playerImage,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating planet:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating planet" });
  }
};

const updatePlanet = async (req, res) => {
  // Get the planet ID
  const playerID = req.params.id;
  // Get the planet object
  const newPlayer = req.body;

  try {
    const [data] = await db.query("SELECT * FROM Planets WHERE playerID = ?", [
      playerID,
    ]);

    const oldPlayer = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPlayer, oldPlayer)) {
      const query =
        "UPDATE Planets SET playerName=?, playerAlias=?, playerLevel=?, playerAge=?, playerJoin=?,playerImage=? WHERE playerID=?";

      const values = [
        newPlayer.playerName,
        newPlayer.playerAlias,
        newPlayer.playerLevel,
        newPlayer.playerAge,
        newPlayer.playerJoin,
        newPlayer.playerImage,
        playerID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return
      return res.json({ message: "Planet updated successfully." });
    }

    res.json({ message: "Planet details are the same, no update" });
  } catch (error) {
    console.log("Error updating planet", error);
    res
      .status(500)
      .json({ error: `Error updating the planet with id ${playerID}` });
  }
};

// Endpoint to delete a planet from the database
const deletePlanet = async (req, res) => {
  console.log("Deleting planet with id:", req.params.id);
  const playerID = req.params.id;

  try {
    // Ensure the planet exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM Planets WHERE playerID = ?",
      [playerID]
    );

    // If the planet doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Planet not found");
    }

    // Delete related records from the intersection table (see FK contraints bsg_cert_people)
    const [response] = await db.query(
      "DELETE FROM TeamPlayers WHERE playerID = ?",
      [playerID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from TeamPlayers intersection table"
    );

    // Delete the planet from Planets
    await db.query("DELETE FROM Planets WHERE playerID = ?", [playerID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Planet deleted successfully" });
  } catch (error) {
    console.error("Error deleting planet from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlanet,
  getPlanetByID,
  createPlanet,
  updatePlanet,
  deletePlanet,
};
