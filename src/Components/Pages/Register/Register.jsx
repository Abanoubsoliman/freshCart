import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"; 
import { EyeSlashFilledIcon } from "../../../Services/AuthIcons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../Services/AuthIcons/EyeFilledIcon";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false
  });

  const initialValues = {
    name: "abanoub",
    email: "abanoub@gmail.com",
    password: "123456a",
    rePassword: "123456a",
    phone: "01010700999",
  };

  const validationSchema = yup.object({
    name: yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 20 characters"),
    email: yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email format"
      ),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Must contain at least one letter and number"
      ),
    rePassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone: yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
  });

  const handleSubmit = async (values) => {
    setErrMsg("");
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup", 
        values
      );
      
      if (data.message === "success") {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "An error occurred");
      toast.error("Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const toggleVisibility = (field) => () => {
    setIsVisible(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="my-10 max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 p-4">
          <Input
            name="name"
            label="Full Name"
            variant="bordered"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
            errorMessage={formik.errors.name}
            isClearable
            onClear={() => formik.setFieldValue("name", "")}
          />

          <Input
            name="email"
            label="Email Address"
            type="email"
            variant="bordered"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
            errorMessage={formik.errors.email}
            isClearable
            onClear={() => formik.setFieldValue("email", "")}
          />

          <Input
            name="password"
            label="Password"
            variant="bordered"
            type={isVisible.password ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
            errorMessage={formik.errors.password}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility("password")}
                className="focus:outline-none"
              >
                {isVisible.password ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400" />
                )}
              </button>
            }
          />

          <Input
            name="rePassword"
            label="Confirm Password"
            variant="bordered"
            type={isVisible.confirmPassword ? "text" : "password"}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.rePassword && !!formik.errors.rePassword}
            errorMessage={formik.errors.rePassword}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility("confirmPassword")}
                className="focus:outline-none"
              >
                {isVisible.confirmPassword ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400" />
                )}
              </button>
            }
          />

          <Input
            name="phone"
            label="Phone Number"
            variant="bordered"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
            errorMessage={formik.errors.phone}
            isClearable
            onClear={() => formik.setFieldValue("phone", "")}
            placeholder="01XXXXXXXXX"
          />

          <Button
            type="submit"
            color="success"
            isLoading={isLoading}
            className="w-full"
          >
            Create Account
          </Button>

          {errMsg && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {errMsg}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}