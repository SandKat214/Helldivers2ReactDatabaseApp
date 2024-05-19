// Citation for the following source code:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of teams in Teams
const getTeams = async (req, res) => {
  try {
    // Select all rows from the "Teams" table with mission, planet, and language info
    const query = 
    "SELECT Teams.teamID, Teams.teamTitle, Teams.teamMeet, Teams.teamDifficulty, Teams.team18Up,\
    Teams.teamChat, Teams.teamCount, Teams.teamPhoto, Teams.missionID, MissionTypes.missionName, Teams.planetID,\
    Planets.planetName, Languages.langID, Languages.langName\
    FROM Teams\
        INNER JOIN MissionTypes on Teams.missionID=MissionTypes.missionID\
        INNER JOIN Planets on Teams.planetID=Planets.planetID\
        LEFT JOIN Languages on Teams.langID=Languages.langID\
    ORDER BY Teams.teamMeet DESC";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching teams from the database:", error);
    res.status(500).json({ error: "Error fetching teams" });
  }
};

// Returns all missionType IDs and names for drop-down menus
const getMissions = async (req, res) => {
  try {
    // Select IDs and names from the "MissionTypes" table
    const query = "SELECT missionID, missionName FROM MissionTypes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching mission info from the database:", error);
    res.status(500).json({ error: "Error fetching mission info" });
  }
};

// Returns all planet IDs and names for drop-down menus
const getPlanets = async (req, res) => {
  try {
    // Select IDs and names from the "Planets" table
    const query = "SELECT planetID, planetName FROM Planets";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching planet info from the database:", error);
    res.status(500).json({ error: "Error fetching planet info" });
  }
};

// Returns status of creation of new team in Teams
const createTeam = async (req, res) => {
  try {
    const { teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamPhoto, missionID, planetID, langID } = req.body;
    const query =
      "INSERT INTO Teams (teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamPhoto, missionID, planetID, langID)\
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const response = await db.query(query, [
      teamTitle, 
      teamMeet, 
      teamDifficulty, 
      team18Up, 
      teamChat, 
      teamPhoto, 
      missionID, 
      planetID, 
      langID
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating team:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating team" });
  }
};

const updateTeam = async (req, res) => {
  // Get the team ID
  const teamID = req.params.id;
  // Get the team object
  const { teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamPhoto, missionID, planetID, langID } = req.body;
  try {
    const query =
      "UPDATE Teams\
      SET teamTitle = ?, teamMeet = ?, teamDifficulty = ?, team18Up = ?, teamChat = ?,\
        teamPhoto = ?, missionID = ?, planetID = ?, langID = ?\
      WHERE teamID = ?";

    // Perform the update
    await db.query(query, [
      teamTitle, 
      teamMeet, 
      teamDifficulty, 
      team18Up, 
      teamChat, 
      teamPhoto, 
      missionID, 
      planetID, 
      langID,
      teamID,
    ]);
    // Inform client of success and return 
    return res.json({ message: "Team updated successfully." });
  } catch (error) {
    console.log("Error updating team", error);
    res
      .status(500)
      .json({ error: `Error updating the team with id ${teamID}` });
  };
};

// Endpoint to delete a customer from the database
const deletePerson = async (req, res) => {
  console.log("Deleting person with id:", req.params.id);
  const personID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM bsg_people WHERE id = ?",
      [personID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Person not found");
    }

    // Delete related records from the intersection table (see FK contraints bsg_cert_people)
    const [response] = await db.query(
      "DELETE FROM bsg_cert_people WHERE pid = ?",
      [personID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from bsg_cert_people intersection table"
    );

    // Delete the person from bsg_people
    await db.query("DELETE FROM bsg_people WHERE id = ?", [personID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting person from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getTeams,
  getMissions,
  getPlanets,
  createTeam,
  updateTeam,
//   deletePerson,
};
