const express = require("express");
const router = express.Router();
const {
  getPlanet,
  getPlanetByID,
  createPlanet,
  deletePlanet,
  updatePlanet,
} = require("../controllers/planetsController");

router.get("/", getPlanet);
router.get("/:id", getPlanetByID);
router.post("/", createPlanet);
router.put("/:id", deletePlanet);
router.delete("/:id", updatePlanet);

module.exports = router;
