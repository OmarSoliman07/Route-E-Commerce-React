import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [errorMessage, setError] = useState(null);
  const [FrmDisplay, setFrmDisplay] = useState(true);
  const navigate = useNavigate();

  const validationSchemaForgot = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
  });

  const validationSchemaResetCode = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  const ForgotForm = useFormik({
    initialValues: { email: "" },
    onSubmit: ForgotApi,
    validationSchema: validationSchemaForgot,
  });

  const VerifyResetCodeForm = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: VerifyResetCodeApi,
    validationSchema: validationSchemaResetCode,
  });

  async function ForgotApi(data) {
    try {
      let response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data);
      console.log("Forgot Password Response:", response.data);
      if (response.data.statusMsg === "success") {
        setFrmDisplay(false);
      }
    } catch (err) {
      console.error("Error in forgot password:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  async function VerifyResetCodeApi(data) {
    try {
      let response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data);
      console.log("Verify Reset Code Response:", response.data);
      if (response.data.status === "Success") {
        navigate("/updatePassword");
      }
    } catch (err) {
      console.error("Error verifying reset code:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        {FrmDisplay ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            {errorMessage && (
              <div
                className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form onSubmit={ForgotForm.handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ForgotForm.values.email}
                  onChange={ForgotForm.handleChange}
                  onBlur={ForgotForm.handleBlur}
                  placeholder="Enter your email"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                />
                {ForgotForm.touched.email && ForgotForm.errors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {ForgotForm.errors.email}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-unhover-button hover:bg-main text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Reset Code
            </h2>
            {errorMessage && (
              <div
                className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form onSubmit={VerifyResetCodeForm.handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label
                  htmlFor="resetCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reset Code
                </label>
                <input
                  type="text"
                  id="resetCode"
                  name="resetCode"
                  value={VerifyResetCodeForm.values.resetCode}
                  onChange={VerifyResetCodeForm.handleChange}
                  onBlur={VerifyResetCodeForm.handleBlur}
                  placeholder="Enter your reset code"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                />
                {VerifyResetCodeForm.touched.resetCode && VerifyResetCodeForm.errors.resetCode && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {VerifyResetCodeForm.errors.resetCode}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-unhover-button hover:bg-main text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
              >
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
