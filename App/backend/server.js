// Citation for the following source code:
// Date: 5/17/2024
// Copied & Adapted from React-Starter-App
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
// Authors: Devin Daniels and Zachary Maes

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// Cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// player
app.use("/api/player", require("./routes/playerRoutes"));

// planets
app.use("/api/planets", require("./routes/planetRoutes"));

// planets
app.use("/api/mission-types", require("./routes/missionTypesRoutes"));

// languages
app.use("/api/languages", require("./routes/languageRoutes"));

// teams
app.use("/api/teams", require("./routes/teamRoutes"));

// teamPlayers
app.use("/api/teamPlayers", require("./routes/teamPlayerRoutes"));


app.listen(PORT, () => {
  console.log(
    `Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`
  );
});
