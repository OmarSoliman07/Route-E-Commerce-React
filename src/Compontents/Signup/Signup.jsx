import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    let [errMessage, setError] = useState(null);
    let baseUrl = "https://ecommerce.routemisr.com";
    let navigate = useNavigate();
    let validYup = Yup.object({
        name: Yup.string()
            .required("name required")
            .min(3, "name char 2")
            .max(20, "name cher 20"),
        email: Yup.string().required("email required").email("enter valid email"),
        password: Yup.string()
            .required("password required")
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                "password invalid"
            ),
        rePassword: Yup.string()
            .required("Re-password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        phone: Yup.string()
            .required("phone required")
            .matches(/^(010|011|012|015)\d{8}$/, "enter valid phone"),
    });

    let registerForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: RegisterApi,
        validationSchema: validYup,
    });

    async function RegisterApi(data) {
        let req = await axios
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
        <div>
            <h2>Register Now:</h2>
            {errMessage ? (
                <div
                    className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    {errMessage}
                </div>
            ) : (
                ""
            )}
            <form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto">
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your name
                    </label>
                    <input
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.name}
                        type="text"
                        id="name"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {registerForm.touched.name && registerForm.errors.name ? (
                        <p className="text-red-800">{registerForm.errors.name}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your email
                    </label>
                    <input
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.email}
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {registerForm.touched.email && registerForm.errors.email ? (
                        <p className="text-red-800">{registerForm.errors.email}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your password
                    </label>
                    <input
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.password}
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {registerForm.touched.password && registerForm.errors.password ? (
                        <p className="text-red-800">{registerForm.errors.password}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="rePassword"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your rePassword
                    </label>
                    <input
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.rePassword}
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {registerForm.touched.rePassword && registerForm.errors.rePassword ? (
                        <p className="text-red-800">{registerForm.errors.rePassword}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your phone
                    </label>
                    <input
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.phone}
                        type="tel"
                        id="phone"
                        name="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {registerForm.touched.phone && registerForm.errors.phone ? (
                        <p className="text-red-800">{registerForm.errors.phone}</p>
                    ) : (
                        ""
                    )}
                </div>
                <button
                    disabled={!(registerForm.isValid && registerForm.dirty)}
                    type="submit"
                    className="text-white bg-active hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}