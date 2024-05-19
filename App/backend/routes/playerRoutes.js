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
