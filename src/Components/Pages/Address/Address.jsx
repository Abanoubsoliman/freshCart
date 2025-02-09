import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function Address() {
  const { cartId } = useParams();

  // Enhanced validation schema
  const validationSchema = yup.object({
    details: yup.string()
      .required("Address details are required")
      .min(10, "Address must be at least 10 characters"),
    city: yup.string()
      .required("City is required")
      .matches(/^[A-Za-z\s]+$/, "City must contain only letters"),
    phone: yup.string()
      .required("Phone number is required")
      .matches(/^01[0125]\d{8}$/, "Valid Egyptian phone number required")
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          { shippingAddress: values },
          {
            headers: {
              token: localStorage.getItem("token")
            },
            params: {
              url: window.location.origin // Use current origin instead of hardcoding
            }
          }
        );

        if (data.session?.url) {
          window.location.href = data.session.url;
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Checkout failed. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          }
        );
      } finally {
        setSubmitting(false);
      }
    }
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
          isLoading={formik.isSubmitting}
          fullWidth
          className="mt-6"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </form>
    </div>
  );
}