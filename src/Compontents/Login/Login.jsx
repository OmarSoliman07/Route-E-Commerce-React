import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function Login() {
	let { setToken } = useContext(AuthContext);
	let [errMessage, setError] = useState(null);
	let baseUrl = "https://ecommerce.routemisr.com";
	let navigate = useNavigate();
	let validYup = Yup.object({
		email: Yup.string().required("email required").email("enter valid email"),
		password: Yup.string()
			.required("password required")
			.matches(
				/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
				"password invald"
			),
	});

	let LoginForm = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: LoginApi,
		validationSchema: validYup,
	});

	function LoginApi(data) {
		axios
			.post(`${baseUrl}/api/v1/auth/signin`, data)
			.then((req) => {
				if (req.data.message === "success") {
					setToken(req.data.token);
					localStorage.setItem("token", req.data.token);
					
					
					
					
					navigate("/");
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
			<h2>Login Now:</h2>
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
			<form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 "
					>
						Your email
					</label>
					<input
						onChange={LoginForm.handleChange}
						onBlur={LoginForm.handleBlur}
						value={LoginForm.values.email}
						type="email"
						id="email"
						name="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					{LoginForm.touched.email && LoginForm.errors.email ? (
						<p className="text-red-800">{LoginForm.errors.email}</p>
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
						onChange={LoginForm.handleChange}
						onBlur={LoginForm.handleBlur}
						value={LoginForm.values.password}
						type="password"
						id="password"
						name="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					{LoginForm.touched.password && LoginForm.errors.password ? (
						<p className="text-red-800">{LoginForm.errors.password}</p>
					) : (
						""
					)}
				</div>
				<Link to="/ForgotPassword">Forget Password ?</Link>
				<br />
				<button
					disabled={!(LoginForm.isValid && LoginForm.dirty)}
					type="submit"
					className="text-white bg-active hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:opacity-50"
				>
					Login
				</button>
			</form>
		</div>
	);
}