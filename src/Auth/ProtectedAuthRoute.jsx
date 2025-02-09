
import { authContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";


export default function ProtectedAuthRoute( { children }) {
  const { isLoggedIn } =   useContext( authContext );
  return (
    <div>
      {!isLoggedIn ? children : <Navigate to="/"/>}
    </div>
  )
}
