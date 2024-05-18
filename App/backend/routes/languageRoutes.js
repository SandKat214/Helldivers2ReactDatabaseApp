// Citation for the following source code:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

const express = require("express");
const router = express.Router();
const {
  getLanguages,
  createLanguage,
} = require("../controllers/languagesController");

router.get("/", getLanguages);
router.post("/", createLanguage);

module.exports = router;