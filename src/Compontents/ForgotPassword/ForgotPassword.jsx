import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {
  let [errorMessage, setError] = useState(null);
  let [FrmDisplay, setFrmDisplay] = useState(true);
  let navigate = useNavigate();

  let validationSchemaForgot = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
  });

  let validationSchemaResetCode = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  let ForgotForm = useFormik({
    initialValues: { email: "" },
    onSubmit: ForgotApi,
    validationSchema: validationSchemaForgot,
  });

  let VerifyResetCodeForm = useFormik({
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
    <>
     
      {FrmDisplay ? (
        <div>
          <h2>Forgot Password</h2>
          <form className="w-7/12 mx-auto" onSubmit={ForgotForm.handleSubmit}>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={ForgotForm.values.email}
                onChange={ForgotForm.handleChange}
                onBlur={ForgotForm.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-dark-input-bg"
              />
            </div>
           
            <button type="submit" className="text-white bg-main hover:bg-green-600 font-medium rounded-lg text-sm w-full px-5 py-2.5">
              Send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="dark:text-white">Reset Code</h2>
          <form className="w-7/12 mx-auto" onSubmit={VerifyResetCodeForm.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Reset Code
              </label>
              <input
                type="text"
                id="resetCode"
                value={VerifyResetCodeForm.values.resetCode}
                onChange={VerifyResetCodeForm.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-dark-input-bg"
              />
            </div>
              {errorMessage && <div className="text-red-500 mb-5" >{errorMessage}</div>}
            <button type="submit" className="text-white bg-main hover:bg-green-600 font-medium rounded-lg text-sm w-full px-5 py-2.5">
              Verify
            </button>
          </form>
        </div>
      )}
    </>
  );
}
