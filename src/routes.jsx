import App from "./components/app/App";
import Home from "./components/home/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
