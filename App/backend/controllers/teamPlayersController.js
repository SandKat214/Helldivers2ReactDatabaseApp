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

// Returns all rows of team players for a team
const getTeamPlayers = async (req, res) => {
  try {
    // Select all rows from the "TeamPlayers" table by teamID
    const teamID = req.params.id;
    const query =
      "SELECT Players.playerID, Players.playerName, Players.playerAlias, Players.playerLevel, Players.playerAge,\
      Players.playerImage, TeamPlayers.teamPlayerID\
      FROM Players\
          INNER JOIN TeamPlayers ON Players.playerID=TeamPlayers.playerID\
          INNER JOIN Teams ON TeamPlayers.teamID=Teams.teamID\
      WHERE TeamPlayers.teamID = ?";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query, [teamID]);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching team players from the database:", error);
    res.status(500).json({ error: "Error fetching team players" });
  }
};

// Returns all rows of players who don't have time conflicts, for drop-down menu
const getAvailPlayers = async (req, res) => {
  try {
    // Select all matching rows from the "Players" table
    const teamID = req.params.id;
    const query =
      "SELECT * FROM Players WHERE playerID NOT IN (\
        SELECT Spans.playerID FROM (\
            SELECT Players.playerID, Teams.teamMeet AS startTime,\
                ADDTIME(Teams.teamMeet, MissionTypes.missionDuration) AS endTime\
                FROM Players\
                    INNER JOIN TeamPlayers ON Players.playerID = TeamPlayers.playerID\
                    INNER JOIN Teams ON TeamPlayers.teamID = Teams.TeamID\
                    INNER JOIN MissionTypes ON Teams.missionID = MissionTypes.missionID\
        ) AS Spans\
        JOIN (\
            SELECT Teams.teamMeet AS newStart,\
                ADDTIME(Teams.teamMeet, MissionTypes.missionDuration) AS newEnd\
                FROM Teams\
                    INNER JOIN MissionTypes ON Teams.missionID = MissionTypes.missionID\
                WHERE Teams.teamID = ?\
        ) AS NewTeam\
        WHERE (NewTeam.newStart BETWEEN Spans.startTime AND Spans.endTime)\
            OR (NewTeam.newEnd BETWEEN Spans.startTime AND Spans.endTime)\
            OR (NewTeam.newStart < Spans.startTime AND NewTeam.newEnd > Spans.endTime)\
    )";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query, [teamID]);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching available players from the database:", error);
    res.status(500).json({ error: "Error fetching available players" });
  }
};

// Returns all rows of players who don't have time conflicts & are adults, for drop-down menu
const getAdultPlayers = async (req, res) => {
  try {
    // Select all matching rows from the "Players" table
    const teamID = req.params.id;
    const query =
      "SELECT * FROM Players WHERE playerID NOT IN (\
        SELECT Spans.playerID FROM (\
            SELECT Players.playerID, Teams.teamMeet AS startTime,\
                ADDTIME(Teams.teamMeet, MissionTypes.missionDuration) AS endTime\
                FROM Players\
                    INNER JOIN TeamPlayers ON Players.playerID = TeamPlayers.playerID\
                    INNER JOIN Teams ON TeamPlayers.teamID = Teams.TeamID\
                    INNER JOIN MissionTypes ON Teams.missionID = MissionTypes.missionID\
        ) AS Spans\
        JOIN (\
            SELECT Teams.teamMeet AS newStart,\
                ADDTIME(Teams.teamMeet, MissionTypes.missionDuration) AS newEnd\
                FROM Teams\
                    INNER JOIN MissionTypes ON Teams.missionID = MissionTypes.missionID\
                WHERE Teams.teamID = ?\
        ) AS NewTeam\
        WHERE (NewTeam.newStart BETWEEN Spans.startTime AND Spans.endTime)\
            OR (NewTeam.newEnd BETWEEN Spans.startTime AND Spans.endTime)\
            OR (NewTeam.newStart < Spans.startTime AND NewTeam.newEnd > Spans.endTime)\
    ) AND (playerAge >= 18)";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query, [teamID]);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching available adult players from the database:", error);
    res.status(500).json({ error: "Error fetching available adult players" });
  }
};

// Returns status of creation of new team player
const createTeamPlayer = async (req, res) => {
  try {
    const { teamID, playerID } = req.body;
    const query = "INSERT INTO TeamPlayers (teamID, playerID) VALUES (?, ?)";
    const response = await db.query(query, [
      teamID,
      playerID,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating team player:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating team player" });
  }
};

// Returns status of team player update
const updateTeamPlayer = async (req, res) => {
  // Get the team player ID
  const teamPlayerID = req.params.id;
  // Get the team player object
  const { teamID, playerID } = req.body;
  try {
    const query =
      "UPDATE TeamPlayers\
      SET teamID = ?, playerID = ?\
      WHERE teamPlayerID = ?";

    // Perform the update
    await db.query(query, [teamID, playerID, teamPlayerID,]);
    // Inform client of success and return 
    return res.json({ message: "Team player updated successfully." });
  } catch (err) {
    console.log("Error updating team player", err);
    res
      .status(500)
      .json({ error: err });
  };
};

// Endpoint to delete a team player from the database
const deleteTeamPlayer = async (req, res) => {
  console.log("Deleting team player with id:", req.params.id);
  const teamPlayerID = req.params.id;
  try {
    // Ensure the team player exits
    const [isExisting] = await db.query(
      "SELECT 1 FROM TeamPlayers WHERE teamPlayerID = ?",
      [teamPlayerID]
    );

    // If the team player doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Team player not found");
    }

    // Delete the person from bsg_people
    await db.query("DELETE FROM TeamPlayers WHERE teamPlayerID = ?", [teamPlayerID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Team player deleted successfully" })
  } catch (error) {
    console.error("Error deleting team player from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getTeamPlayers,
  getAvailPlayers,
  getAdultPlayers,
  createTeamPlayer,
  updateTeamPlayer,
  deleteTeamPlayer,
};
