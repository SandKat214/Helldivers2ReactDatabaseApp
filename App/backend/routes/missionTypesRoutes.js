const express = require("express");
const router = express.Router();
const {
  getMissionType,
  createMissionType,
} = require("../controllers/missionTypesController");

router.get("/", getMissionType);
router.post("/", createMissionType);

module.exports = router;
