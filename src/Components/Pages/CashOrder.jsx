import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import * as Yup from "Yup";

export default function CashOrder() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    details: Yup.string()
      .required("Address details are required")
      .min(10, "Address must be at least 10 characters"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[A-Za-z ]+$/, "City must contain only letters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Egyptian phone number is required"),
  });

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message || "Order placed successfully!", {
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

      navigate("/allorders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to place order. Please try again.",
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="my-10 max-w-2xl mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Input
          isClearable
          isInvalid={formik.touched.details && !!formik.errors.details}
          errorMessage={formik.errors.details}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.details}
          name="details"
          variant="bordered"
          label="Shipping Address Details"
          type="text"
          onClear={() => formik.setFieldValue("details", "")}
          fullWidth
        />

        <Input
          isClearable
          isInvalid={formik.touched.city && !!formik.errors.city}
          errorMessage={formik.errors.city}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.city}
          name="city"
          variant="bordered"
          label="City"
          type="text"
          onClear={() => formik.setFieldValue("city", "")}
          fullWidth
        />

        <Input
          isClearable
          isInvalid={formik.touched.phone && !!formik.errors.phone}
          errorMessage={formik.errors.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          name="phone"
          variant="bordered"
          label="Phone Number"
          type="tel"
          onClear={() => formik.setFieldValue("phone", "")}
          fullWidth
        />

        <Button
          type="submit"
          color="success"
          isLoading={isLoading}
          fullWidth
          className="mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Cash Order"}
        </Button>
      </form>
    </div>
  );
}