import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { Outlet } from "react-router-dom";
import { authContext } from "../../../Contexts/AuthContext";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { useContext } from "react";

function Layout() {
  const { isLoading } = useContext(authContext);
  return (
    <div className="">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <div className="container py-10  ">
            <Outlet />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Layout;
