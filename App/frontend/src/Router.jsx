import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homepage/HomePage";
import TableLayout from "./pages/shared/TableLayout";
import PeopleTable from "./pages/people/People";
import Teams from "./pages/teams/Teams";
import Planets from "./pages/planets/Planets";

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
    ],
  },
]);

export default router;
