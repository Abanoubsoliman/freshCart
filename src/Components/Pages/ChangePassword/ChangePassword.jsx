import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup"; 
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { EyeSlashFilledIcon } from "../../../Services/AuthIcons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../Services/AuthIcons/EyeFilledIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  const initialValues = {
    currentPassword: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required("Current Password is Required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    password: yup
      .string()
      .required("New Password is Required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
        "Password must contain at least one letter and one number"
      ),
    rePassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const { mutateAsync: changePassword, isPending } = useMutation({
    mutationFn: async (values) => {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully", {
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
      setTimeout(() => navigate("/"), 1500);
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          password: values.password,
          rePassword: values.rePassword,
        });
        resetForm();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again.",
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
        setSubmitting(false);
      }
    },
  });

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="my-10 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type={passwordVisibility.current ? "text" : "password"}
          endContent={
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              aria-label="Toggle password visibility"
            >
              {passwordVisibility.current ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
          label="Current Password"
          placeholder="Enter current password"
          variant="bordered"
          isInvalid={touched.currentPassword && !!errors.currentPassword}
          errorMessage={errors.currentPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.currentPassword}
          name="currentPassword"
          fullWidth
        />

        <Input
          type={passwordVisibility.new ? "text" : "password"}
          endContent={
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              aria-label="Toggle password visibility"
            >
              {passwordVisibility.new ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
          label="New Password"
          placeholder="Enter new password"
          variant="bordered"
          isInvalid={touched.password && !!errors.password}
          errorMessage={errors.password}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          name="password"
          fullWidth
        />

        <Input
          type={passwordVisibility.confirm ? "text" : "password"}
          endContent={
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              aria-label="Toggle password visibility"
            >
              {passwordVisibility.confirm ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
          label="Confirm Password"
          placeholder="Confirm new password"
          variant="bordered"
          isInvalid={touched.rePassword && !!errors.rePassword}
          errorMessage={errors.rePassword}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.rePassword}
          name="rePassword"
          fullWidth
        />

        <Button
          type="submit"
          color="success"
          isLoading={isPending}
          fullWidth
          className="mt-4"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;