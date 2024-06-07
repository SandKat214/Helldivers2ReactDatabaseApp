// Citation for the following source code:
// Date: 5/20/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

const express = require("express");
const router = express.Router();
const { getPlanet, createPlanet } = require("../controllers/planetsController");

router.get("/", getPlanet);
router.post("/", createPlanet);

module.exports = router;
