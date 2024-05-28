const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// player
app.use("/api/player", require("./routes/playerRoutes"));

// planets
app.use("/api/planets", require("./routes/planetRoutes"));

// API Routes for backend CRUD:
app.use("/api/languages", require("./routes/languageRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/teamPlayers", require("./routes/teamPlayerRoutes"));

// Add your Connect DB Activitiy Code Below:
// ...

// ...
// End Connect DB Activity Code.

app.listen(PORT, () => {
  console.log(
    `Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`
  );
});
