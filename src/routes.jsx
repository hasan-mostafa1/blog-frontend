import App from "./components/app/App";
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <Posts /> },
    ],
  },
];

export default routes;
