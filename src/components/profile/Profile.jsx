import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Profile = () => {
  const { authUser } = useContext(AuthContext);
  return <h1>Hello {authUser?.firstName}</h1>;
};

export default Profile;
