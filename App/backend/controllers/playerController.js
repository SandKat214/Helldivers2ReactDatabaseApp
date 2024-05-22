// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in Players
const getPlayer = async (req, res) => {
  try {
    // Select all rows from the "Players" table
    const query = "SELECT * FROM Players";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

// Returns a single player by their unique ID from Players
const getPlayerByID = async (req, res) => {
  try {
    const playerID = req.params.id;
    const query = "SELECT * FROM Players WHERE id = ?";
    const [result] = await db.query(query, [playerID]);
    // Check if player was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    const player = result[0];
    res.json(player);
  } catch (error) {
    console.error("Error fetching player from the database:", error);
    res.status(500).json({ error: "Error fetching player" });
  }
};

// Returns status of creation of new player in Players
const createPlayer = async (req, res) => {
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
      "INSERT INTO Players (playerName, playerAlias, playerLevel, playerAge, playerJoin, playerImage) VALUES (?, ?, ?, ?, ?, ?)";

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
    console.error("Error creating player:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating player" });
  }
};

const updatePlayer = async (req, res) => {
  // Get the player ID
  const playerID = req.params.id;
  // Get the player object
  const newPlayer = req.body;

  try {
    const [data] = await db.query("SELECT * FROM Players WHERE playerID = ?", [
      playerID,
    ]);

    const oldPlayer = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPlayer, oldPlayer)) {
      const query =
        "UPDATE Players SET playerName=?, playerAlias=?, playerLevel=?, playerAge=?, playerJoin=?,playerImage=? WHERE playerID=?";

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
      return res.json({ message: "Player updated successfully." });
    }

    res.json({ message: "Player details are the same, no update" });
  } catch (error) {
    console.log("Error updating player", error);
    res
      .status(500)
      .json({ error: `Error updating the player with id ${playerID}` });
  }
};

// Endpoint to delete a customer from the database
const deletePlayer = async (req, res) => {
  console.log("Deleting player with id:", req.params.id);
  const playerID = req.params.id;

  try {
    // Ensure the player exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM Players WHERE playerID = ?",
      [playerID]
    );

    // If the player doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Player not found");
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

    // Delete the player from Players
    await db.query("DELETE FROM Players WHERE playerID = ?", [playerID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlayer,
  getPlayerByID,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
