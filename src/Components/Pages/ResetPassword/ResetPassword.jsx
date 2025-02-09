import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "Yup";
import { Bounce, toast } from "react-toastify";
import { EyeFilledIcon } from "../../../Services/AuthIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../Services/AuthIcons/EyeSlashFilledIcon";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",

        values
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Password updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        navigate(location.pathname == "/login" ? "/" : location.pathname);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired token", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),

    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Must be at least 6 characters")
      .max(20, "Cannot exceed 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
        "Password must contain at least one letter and one number"
      ),
      confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref('newPassword')], "Passwords do not match"),

  });

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="my-10 max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          isClearable
          isRequired
          isDisabled={isLoading}
          isInvalid={touched.email && !!errors.email}
          errorMessage={errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          variant="bordered"
          label="Email"
          type="email"
          className="w-full"
          onClear={() => (values.email = "")}
        />
        <Input
          isRequired
          isDisabled={isLoading}
          endContent={
            <button
              type="button"
              onClick={toggleVisibility}
              className="focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
          label="New Password"
          placeholder="Enter new password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          isInvalid={touched.newPassword && !!errors.newPassword}
          errorMessage={errors.newPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          name="newPassword"
          className="w-full"
        />
         <Input
          isRequired
          isDisabled={isLoading}
          label="Confirm Password"
          placeholder="Re-enter password"
          type="password"
          variant="bordered"
          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmPassword}
          name="confirmPassword"
          className="w-full"
        />



        <Button
          type="submit"
          color="success"
          className="w-full"
          isLoading={isLoading}
          isDisabled={!isValid || !dirty || isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>

        <div className="mt-4 text-center">
          <span>Remember your password? </span>
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
