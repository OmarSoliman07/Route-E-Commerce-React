import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
    let [errMessage, setError] = useState(null);
    let baseUrl = "https://ecommerce.routemisr.com";
    let navigate = useNavigate();

    let validYup = Yup.object({
        email: Yup.string().required("Email is required").email("Enter a valid email"),
        newPassword: Yup.string()
            .required("New password is required")
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                "Password must be 6-16 characters and include at least one number and one special character"
            ),
    });

    let LoginForm = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: UpdatePasswordApi,
        validationSchema: validYup,
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
        <div>
            <h2>Update Password</h2>
         
            <form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        onChange={LoginForm.handleChange}
                        onBlur={LoginForm.handleBlur}
                        value={LoginForm.values.email}
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                    {LoginForm.touched.email && LoginForm.errors.email && (
                        <p className="text-red-800 dark:text-red-500">{LoginForm.errors.email}</p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                    </label>
                    <input
                        onChange={LoginForm.handleChange}
                        onBlur={LoginForm.handleBlur}
                        value={LoginForm.values.newPassword}
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5"
                    />
                    {LoginForm.touched.newPassword && LoginForm.errors.newPassword && (
                        <p className="text-red-800 dark:text-red-500">{LoginForm.errors.newPassword}</p>
                    )}
                </div>
                   {errMessage && (
                <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-500 rounded-lg bg-red-50">
                    {errMessage}
                </div>
            )}
                <button
                    disabled={!(LoginForm.isValid && LoginForm.dirty)}
                    type="submit"
                    className="text-white  bg-main hover:bg-green-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 disabled:opacity-50"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
}
