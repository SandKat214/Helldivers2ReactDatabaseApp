const express = require("express");
const router = express.Router();
const { getPlanet, createPlanet } = require("../controllers/planetsController");

router.get("/", getPlanet);
router.post("/", createPlanet);

module.exports = router;
