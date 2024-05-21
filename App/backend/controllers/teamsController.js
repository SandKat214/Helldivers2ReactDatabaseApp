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
    Teams.teamChat, Teams.teamCount, Teams.teamImage, Teams.missionID, MissionTypes.missionName, Teams.planetID,\
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

// Returns missionID and missionName from Missions for add & update dropdowns
const getMissions = async (req, res) => {
  try {
    // Select id and name from the "MissionTypes" table
    const query = "SELECT missionID, missionName FROM MissionTypes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching mission data from the database:", error);
    res.status(500).json({ error: "Error fetching mission data" });
  }
};

// Returns planetID and planetName from Planets for add & update dropdowns
const getPlanets = async (req, res) => {
  try {
    // Select id and name from the "Planets" table
    const query = "SELECT planetID, planetName FROM Planets";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching planet data from the database:", error);
    res.status(500).json({ error: "Error fetching planet data" });
  }
};

// Returns a single team by their unique ID from Teams
const getTeamByID = async (req, res) => {
  try {
    const teamID = req.params.id;
    const query = "SELECT * FROM Teams WHERE teamID = ?";
    const [result] = await db.query(query, [teamID]);
    // Check if team was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    const team = result[0];
    res.json(team);
  } catch (error) {
    console.error("Error fetching team from the database:", error);
    res.status(500).json({ error: "Error fetching team" });
  }
};

// Returns a single team by their unique ID from Teams
const getMinors = async (req, res) => {
  try {
    // Select all minors on a team from the "TeamPlayers" table
    const teamID = req.params.id;
    const query = 
      "SELECT * FROM TeamPlayers INNER JOIN Players\
        ON TeamPlayers.playerID=Players.playerID\
        WHERE Players.playerAge < 18 AND TeamPlayers.teamID = ?";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query, [teamID]);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching minors from the database:", error);
    res.status(500).json({ error: "Error fetching minors" });
  }
};

// Returns status of creation of new team in Teams
const createTeam = async (req, res) => {
  try {
    const { teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamImage, missionID, planetID, langID } = req.body;
    const query =
      "INSERT INTO Teams (teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamImage, missionID, planetID, langID)\
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const response = await db.query(query, [
      teamTitle, 
      teamMeet, 
      teamDifficulty, 
      team18Up, 
      teamChat, 
      teamImage, 
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
  const { teamTitle, teamMeet, teamDifficulty, team18Up, teamChat, teamImage, missionID, planetID, langID } = req.body;
  try {
    const query =
      "UPDATE Teams\
      SET teamTitle = ?, teamMeet = ?, teamDifficulty = ?, team18Up = ?, teamChat = ?,\
        teamImage = ?, missionID = ?, planetID = ?, langID = ?\
      WHERE teamID = ?";

    // Perform the update
    await db.query(query, [
      teamTitle, 
      teamMeet, 
      teamDifficulty, 
      team18Up, 
      teamChat, 
      teamImage, 
      missionID, 
      planetID, 
      langID,
      teamID,
    ]);
    // Inform client of success and return 
    return res.json({ message: "Team updated successfully." });
  } catch (err) {
    console.log("Error updating team", err);
    res
      .status(500)
      .json({ error: err });
  };
};

// Export the functions as methods of an object
module.exports = {
  getTeams,
  getMissions,
  getPlanets,
  getTeamByID,
  getMinors,
  createTeam,
  updateTeam,
};
