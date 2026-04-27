import App from "./components/app/App";
import ErrorPage from "./components/error-page/ErrorPage";
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorPage
        errorTitle="Page Not Found"
        errorMessage="The page you're looking for doesn't exist or has been moved."
      />
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <Posts /> },
    ],
  },
];

export default routes;
