import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// regex مشترك لكلمة المرور الجديدة
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/;

export default function UpdatePassword() {
  const [errMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  const navigate = useNavigate();

  const updatePasswordValidationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        passwordRegex,
        "New password must be 6-16 characters long and include at least one digit and one special character"
      ),
  });

  const UpdatePasswordForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: UpdatePasswordApi,
    validationSchema: updatePasswordValidationSchema,
  });

  async function UpdatePasswordApi(data) {
    try {
      let response = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data);
      console.log("Password Reset Response:", response.data);
      if (response.data.token) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error updating password:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Update Password
        </h2>
        {errMessage && (
          <div
            className="p-4 mb-4 w-full text-sm text-red-600 dark:text-red-400 rounded-lg bg-red-50 dark:bg-gray-700"
            role="alert"
          >
            {errMessage}
          </div>
        )}
        <form onSubmit={UpdatePasswordForm.handleSubmit} className="space-y-6">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              onChange={UpdatePasswordForm.handleChange}
              onBlur={UpdatePasswordForm.handleBlur}
              value={UpdatePasswordForm.values.email}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
            />
            {UpdatePasswordForm.touched.email && UpdatePasswordForm.errors.email && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {UpdatePasswordForm.errors.email}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              onChange={UpdatePasswordForm.handleChange}
              onBlur={UpdatePasswordForm.handleBlur}
              value={UpdatePasswordForm.values.newPassword}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
            />
            {UpdatePasswordForm.touched.newPassword && UpdatePasswordForm.errors.newPassword && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {UpdatePasswordForm.errors.newPassword}
              </p>
            )}
          </div>
          <button
            disabled={!(UpdatePasswordForm.isValid && UpdatePasswordForm.dirty)}
            type="submit"
            className="w-full bg-unhover-button hover:bg-main text-white font-medium rounded-lg text-sm px-5 py-2.5 transition disabled:opacity-50"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
