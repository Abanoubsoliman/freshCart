import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function VerifyResetCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    resetCode: "",
  };
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      if (data.status == "Success") {
        toast.success(data.status, {
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
        navigate("/ResetPassword");
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
    resetCode: yup.string().required("Email is required"),
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
          isInvalid={touched.resetCode && !!errors.resetCode}
          errorMessage={errors.resetCode}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.resetCode}
          name="resetCode"
          variant="bordered"
          label="resetCode"
          type="text"
          className="w-full"
        />

        <Button
          type="submit"
          color="success"
          className="w-full"
          isLoading={isLoading}
          isDisabled={!isValid || !dirty || isLoading}
        >
          {isLoading ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
