import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homepage/HomePage";
import TableLayout from "./pages/shared/TableLayout";
import PeopleTable from "./pages/people/People";

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
    ],
  },
]);

export default router;
