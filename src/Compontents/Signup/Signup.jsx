import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/;

export default function Signup() {
  const [errMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  const navigate = useNavigate();

  const signupValidationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be 6-16 characters long and include at least one digit and one special character"
      ),
    rePassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^(010|011|012|015)\d{8}$/, "Enter a valid phone number"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: RegisterApi,
    validationSchema: signupValidationSchema,
  });

  async function RegisterApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message === "success") {
          navigate("/login");
        } else {
          setError(req.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Register Now
        </h1>
        {errMessage && (
          <div
            className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
            role="alert"
          >
            {errMessage}
          </div>
        )}
        <form onSubmit={registerForm.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.name}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {registerForm.touched.name && registerForm.errors.name && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {registerForm.errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.email}
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {registerForm.touched.email && registerForm.errors.email && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {registerForm.errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <input
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.password}
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {registerForm.touched.password && registerForm.errors.password && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {registerForm.errors.password}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-enter Your Password
            </label>
            <input
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.rePassword}
              type="password"
              id="rePassword"
              name="rePassword"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {registerForm.touched.rePassword && registerForm.errors.rePassword && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {registerForm.errors.rePassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Phone
            </label>
            <input
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.phone}
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {registerForm.touched.phone && registerForm.errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {registerForm.errors.phone}
              </p>
            )}
          </div>
          <button
            disabled={!(registerForm.isValid && registerForm.dirty)}
            type="submit"
            className="w-full bg-unhover-button hover:bg-main text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-main dark:text-main hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
