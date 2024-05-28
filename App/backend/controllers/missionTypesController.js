// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of mission type in MissionTypes
const getMissionType = async (req, res) => {
  try {
    // Select all rows from the "MissionTypes" table
    const query = "SELECT * FROM MissionTypes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching mission type from the database:", error);
    res.status(500).json({ error: "Error fetching mission type" });
  }
};

// Returns status of creation of new mission type in MissionTypes
const createMissionType = async (req, res) => {
  try {
    const { missionName, missionDesc, missionDuration } = req.body;
    const query =
      "INSERT INTO MissionTypes (missionName,missionDesc,missionDuration) VALUES (?, ?,?)";

    const formattedTime = formatTime(missionDuration);

    const response = await db.query(query, [
      missionName,
      missionDesc,
      formattedTime,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating mission type:", error);
    // Inform the client of the error
    res.status(500).json({ error: error.message });
  }
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const seconds = 0;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

// Export the functions as methods of an object
module.exports = {
  getMissionType,
  createMissionType,
};
