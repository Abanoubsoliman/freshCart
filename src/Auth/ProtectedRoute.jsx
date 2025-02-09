import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import Login from "../Components/Pages/Login/Login";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(authContext);

  return <div>{isLoggedIn ? children : <Login />}</div>;
}
