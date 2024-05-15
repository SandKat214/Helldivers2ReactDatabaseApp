import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homepage/HomePage";
import TableLayout from "./pages/shared/TableLayout";
import Teams from "./pages/teams/Teams";
import Planets from "./pages/planets/Planets";
import MissionTypes from "./pages/missionTypes/MissionTypes";
import Languages from "./pages/languages/Languages";
import TeamPlayers from "./pages/teamPlayers/TeamPlayers";
import Player from "./pages/players/Player";

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
            desc="This is an object table, which stores the profile information of players in the app."
            relationships={[
              "M:M relationship between Players and Teams, with playerID and teamID as FKs inside the TeamPlayers intersection table.",
            ]}
          >
            <Player />
          </TableLayout>
        ),
      },
      {
        path: "teams",
        element: (
          <TableLayout
            header="Teams Table"
            desc="This is an object table that stores information associated with teams."
            relationships={[
              "M:M relationship between Teams and Players, with teamID and playerID as FKs inside the TeamPlayers intersection table.",
              "M:1 relationship between Teams and MissionTypes, with missionID as a FK inside of Teams.",
              "M:1 relationship between Teams and Planets, with planetID as a FK inside of Teams.",
              "M:0 relationship between Teams and Languages, with languageID as a FK inside of Teams.",
            ]}
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
            desc="This is an object table that contains all the planets in the game."
            relationships={[
              "It has a 1:M relationship between Planets and Teams, with planetID as a FK inside Teams.",
            ]}
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
            desc="This is a category table that contains the details of the different Mission Types."
            relationships={[
              "1:M relationship between MissionTypes and Teams, with missionID as a FK inside Teams.",
            ]}
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
            desc="This is a category table that stores real world Languages."
            relationships={[
              "0:M relationship between Languages and Teams, with languageID as a FK inside Teams.",
            ]}
          >
            <Languages />
          </TableLayout>
        ),
      },
      {
        path: "register/:teamID",
        element: (
          <TableLayout
            header="TeamPlayers Table"
            desc="This is an intersection table, used recruit players to teams."
            relationships={[
              "M:1 relationship between TeamPlayers and Players, with playerID as a FK inside TeamPlayers",
              "M:1 relationship between TeamPlayers and Teams, with teamID as a FK inside TeamPlayers.",
            ]}
          >
            <TeamPlayers />
          </TableLayout>
        ),
      },
    ],
  },
]);

export default router;
