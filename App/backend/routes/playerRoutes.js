// Citation for the following source code:
// Date: 5/19/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

const express = require("express");
const router = express.Router();
const {
  getPlayer,
  getPlayerByID,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerController");

router.get("/", getPlayer);
router.get("/:id", getPlayerByID);
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

module.exports = router;
