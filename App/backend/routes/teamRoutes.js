// Citation for the following source code:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes


const express = require("express");
const router = express.Router();
const {
  getTeams,
  getMissions,
  getPlanets,
  createTeam,
  updateTeam,
//   deletePerson,
} = require("../controllers/teamsController");

router.get("/", getTeams);
router.get("/missions", getMissions);
router.get("/planets", getPlanets);
router.post("/", createTeam);
router.put("/:id", updateTeam);
// router.delete("/:id", deletePerson);

module.exports = router;