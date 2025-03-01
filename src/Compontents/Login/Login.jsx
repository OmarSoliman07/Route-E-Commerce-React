import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";


const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/;

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const [errMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  const navigate = useNavigate();

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be 6-16 characters long and include at least one digit and one special character"
      ),
  });

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    validationSchema: loginValidationSchema,
  });

  function LoginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        if (req.data.message === "success") {
          setToken(req.data.token);
          localStorage.setItem("token", req.data.token);
          navigate("/");
          window.location.reload();
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
          Login Now
        </h1>
        {errMessage && (
          <div
            className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
            role="alert"
          >
            {errMessage}
          </div>
        )}
        <form onSubmit={LoginForm.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
              value={LoginForm.values.email}
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {LoginForm.touched.email && LoginForm.errors.email && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {LoginForm.errors.email}
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
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
              value={LoginForm.values.password}
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {LoginForm.touched.password && LoginForm.errors.password && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {LoginForm.errors.password}
              </p>
            )}
          </div>
          <Link
            to="/ForgotPassword"
            className="text-sm text-main dark:text-main hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            disabled={!(LoginForm.isValid && LoginForm.dirty)}
            type="submit"
            className="w-full bg-unhover-button hover:bg-main text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="text-main dark:text-main hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
