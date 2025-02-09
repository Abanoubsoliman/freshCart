import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layouts/Layout/Layout";
import Home from "./Components/Pages/Home/Home";
import { HeroUIProvider } from "@heroui/react";
import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";
import Categories from "./Components/Pages/Categories/Categories";
import Brands from "./Components/Pages/Brands/Brands";
import Cart from "./Components/Pages/Cart/Cart";
import Notfound from "./Components/Pages/Notfound/Notfound";
import ProtectedRoute from "./Auth/ProtectedRoute";
import CounterContextProvider from "./Contexts/CounterContext";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedAuthRoute from "./Auth/ProtectedAuthRoute";
import ProductDetails from "./Components/Pages/ProductDetails/ProductDetails";
import { ToastContainer, } from 'react-toastify';
import Address from "./Components/Pages/Address/Address";
import Orders from "./Components/Pages/Orders/Orders";
import CashOrder from "./Components/Pages/CashOrder";
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./Components/Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Components/Pages/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools  } from "@tanstack/react-query-devtools";
import ChangePassword from "./Components/Pages/ChangePassword/ChangePassword";



const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true,element: (<ProtectedRoute><Home /></ProtectedRoute>),},
      {path: "login",element: (<ProtectedAuthRoute><Login /></ProtectedAuthRoute>),},
      {path: "verify",element: (<ProtectedAuthRoute> <VerifyResetCode /></ProtectedAuthRoute>),},
      {path: "ForgotPassword",element: (<ProtectedAuthRoute> <ForgotPassword /></ProtectedAuthRoute>),},
      {path: "ResetPassword",element: (<ProtectedAuthRoute> <ResetPassword /></ProtectedAuthRoute>),},
      {path: "register",element: (<ProtectedAuthRoute><Register /></ProtectedAuthRoute>),},
      { path: "categories",element: (<ProtectedRoute><Categories /></ProtectedRoute>), },
      {path: "brands",element: (<ProtectedRoute><Brands /> </ProtectedRoute>),},
      { path: "cart", element: (<ProtectedRoute> <Cart /></ProtectedRoute>), },
      { path: "allorders", element: (<ProtectedRoute> <Orders /></ProtectedRoute>), },
      { path: "product /:id", element: (<ProtectedRoute><ProductDetails /></ProtectedRoute>), },
      { path: "address/:cartId", element: (<ProtectedRoute><Address /></ProtectedRoute>), },
      { path: "cashOrder/:cartId", element: (<ProtectedRoute><CashOrder /></ProtectedRoute>), },
      { path: "wishlist", element: (<ProtectedRoute><Wishlist /></ProtectedRoute>), },
      { path: "ChangePassword", element: (<ProtectedRoute><ChangePassword /></ProtectedRoute>), },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}> 
    <AuthContextProvider>
        <CounterContextProvider>
          <HeroUIProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
            <ReactQueryDevtools />
          </HeroUIProvider> 
        </CounterContextProvider>
      </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;