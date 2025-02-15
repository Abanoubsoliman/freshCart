import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
  };
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );

      if (data.statusMsg == "success") {
        toast.success(data.message, {
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
        navigate("/verify");
      }

      
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "An error occurred, please try again later",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = yup.object({
    email: yup.string()
      .required("Email is required")
      .email("Invalid email address"),
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
        />

        <Button
          type="submit"
          color="success"
          className="w-full"
          isLoading={isLoading}
          isDisabled={!isValid || !dirty || isLoading}
        >
          {isLoading ? "Sending..." : "Send Code"}
        </Button>

        <div className="mt-4 text-center">
          <span>Remember your password? </span>
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

