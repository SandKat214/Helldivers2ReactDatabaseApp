import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homepage/HomePage";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[{
        path:"",
        element:<HomePage/>
    }]
  }
]);

export default router;