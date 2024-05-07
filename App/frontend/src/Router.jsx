import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homepage/HomePage";
import TableLayout from "./pages/shared/TableLayout";
import PeopleTable from "./pages/people/People";
import Teams from "./pages/teams/Teams";
import Planets from "./pages/planets/Planets";
import MissionTypes from "./pages/missionTypes/MissionTypes";
import Languages from "./pages/languages/Languages";
import TeamPlayers from "./pages/teamPlayers/TeamPlayers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "players",
        element: (
          <TableLayout
            header="Players Table"
            desc="This is an object table, which stores the profile information of players in the app. It has a M:M relationship between Players and Teams, with playerID and teamID as FKs inside the TeamPlayers intersection table. A player can be a recruit for zero or more teams."
          >
            <PeopleTable />
          </TableLayout>
        ),
      },
      {
        path: "teams",
        element: (
          <TableLayout
            header="Teams Table"
            desc="This is an object table that stores information associated with teams. It has a M:M relationship between Teams and Players, with teamID and playerID as FKs inside the TeamPlayers intersection table.
             A team starts with zero players and can recruit up to four. It has a M:1 relationship between Teams and MissionTypes, with missionID as a FK inside of Teams. A team must have one and only one mission type associated with it. It has a M:1 relationship between Teams and Planets, with planetID as a FK inside of Teams. A team must have one and only one planet associated with it. And lastly a, M:0 relationship between Teams and Languages, with languageID as a FK inside of Teams. A team will only have an associated language if a team chat will be active, otherwise languageID will be NULL."
          >
            <Teams />
          </TableLayout>
        ),
      },
      {
        path: "planets",
        element: (
          <TableLayout
            header="Planets Table"
            desc="This is an object table that contains all the planets in the game. It has a 1:M relationship between Planets and Teams, with planetID as a FK inside Teams. A planet can be linked to zero or more team recruitments."
          >
            <Planets />
          </TableLayout>
        ),
      },
      {
        path: "missions",
        element: (
          <TableLayout
            header="MissionTypes Table"
            desc="This is a category table that contains the details of the different Mission Types. 1:M relationship between MissionTypes and Teams, with missionID as a FK inside Teams. A mission type can be linked to zero or more team recruitments.
            "
          >
            <MissionTypes />
          </TableLayout>
        ),
      },
      {
        path: "missions",
        element: (
          <TableLayout
            header="MissionTypes Table"
            desc="This is a category table that contains the details of the different Mission Types. 1:M relationship between MissionTypes and Teams, with missionID as a FK inside Teams. A mission type can be linked to zero or more team recruitments.
            "
          >
            <MissionTypes />
          </TableLayout>
        ),
      },
      {
        path: "languages",
        element: (
          <TableLayout
            header="Languages Table"
            desc="This is a category table that stores real world Languages. There is a 0:M relationship between Languages and Teams, with languageID as a FK inside Teams. A language can be linked to zero or more team recruitments and must be set in the Teams table if a Team will have a live chat, otherwise it must be nulled."

          >
            <Languages />
          </TableLayout>
        ),
      },
      {
        path: "register",
        element: (
          <TableLayout
            header="TeamPlayers Table"
            desc="This is an intersection table, used recruit players to teams... There is a M:1 relationship between TeamPlayers and Players, with playerID as a FK inside TeamPlayers. Each table entry must have one and only one player. There is also a M:1 relationship between TeamPlayers and Teams, with teamID as a FK inside TeamPlayers."

          >
            <TeamPlayers />
          </TableLayout>
        ),
      },
    ],
  },
]);

export default router;
