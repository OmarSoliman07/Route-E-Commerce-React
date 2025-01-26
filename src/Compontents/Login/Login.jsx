import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContextProvider';

export default function Login() {
 
  let [errorMessage, setError] = useState(null);
  // let{setToken}=  useContext(AuthContext);
  let navg = useNavigate();
  let initialValues = {
    email: '',
    password: '',
  };
  let validationSchema = Yup.object({
    email: Yup.string()
      .required('Email required')
      .email('Enter a valid email'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password must be at least 6 characters'),
  });

  let loginForm = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema,
  });
  function loginApi(data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
      .then((response) => {
        if (response.data.message === 'success') {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          navg('/');
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <>
      <div>
        <form className="w-7/12 mx-auto" onSubmit={loginForm.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.touched.email && loginForm.errors.email ? (
              <div className="text-red-600">{loginForm.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.touched.password && loginForm.errors.password ? (
              <div className="text-red-600">{loginForm.errors.password}</div>
            ) : null}
            <Link  to='/ForgotPassword' >ForgotPassword....</Link>
          </div>

         
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
      {errorMessage && (
        <div className="p-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
}