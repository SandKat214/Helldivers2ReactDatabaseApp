// Citation for the following source code:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

const express = require("express");
const router = express.Router();
const {
  getTeamPlayers,
  getAvailPlayers,
  getAdultPlayers,
  createTeamPlayer,
  updateTeamPlayer,
  deleteTeamPlayer,
} = require("../controllers/teamPlayersController");

router.get("/:id", getTeamPlayers);
router.get("/availPlayers/:id", getAvailPlayers);
router.get("/adultPlayers/:id", getAdultPlayers);
router.post("/", createTeamPlayer);
router.put("/:id", updateTeamPlayer);
router.delete("/:id", deleteTeamPlayer);

module.exports = router;
