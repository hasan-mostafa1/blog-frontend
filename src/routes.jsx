import App from "./components/app/App";
import ErrorPage from "./components/error-page/ErrorPage";
import Home from "./components/home/Home";
import NewPostForm from "./components/new-post-form/NewPostForm";
import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "new-post", element: <NewPostForm /> },
        ],
      },
    ],
  },
];

export default routes;
