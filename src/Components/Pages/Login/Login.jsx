import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { EyeFilledIcon } from "../../../Services/AuthIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../Services/AuthIcons/EyeSlashFilledIcon";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const validationSchema = yup.object({
    email: yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .max(50, "Maximum 50 characters"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Minimum 6 characters")
      .max(20, "Maximum 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
        "Must contain at least one letter and number"
      )
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setErrMsg("");
        
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          toast.success("Login successful!");
          
          const redirectPath = location.state?.from || "/";
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "An unexpected error occurred";
        setErrMsg(errorMsg);
        toast.error("Login failed!");
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto my-10 p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <Input
            name="email"
            label="Email"
            variant="bordered"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
            errorMessage={formik.errors.email}
            isClearable
            onClear={() => formik.setFieldValue("email", "")}
            className="w-full"
          />

          <Input
            name="password"
            label="Password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
            errorMessage={formik.errors.password}
            endContent={
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-xl text-default-500" />
                ) : (
                  <EyeFilledIcon className="text-xl text-default-500" />
                )}
              </button>
            }
            className="w-full"
          />

          <Button
            type="submit"
            color="success"
            isLoading={isLoading}
            className="w-full h-12 font-semibold"
          >
            Login
          </Button>

          {errMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {errMsg}
            </div>
          )}

          <div className="text-center">
            <Link 
              to="/forgotPassword"
              className="text-green-600 hover:text-green-700 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link 
              to="/register"
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}