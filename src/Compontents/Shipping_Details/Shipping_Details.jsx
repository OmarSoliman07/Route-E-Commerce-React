import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function Shipping_Details() {
  let { id } = useParams();

  const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    details: Yup.string().required('Details are required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
  });

  let ChecCartPayVales = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: ChecCartPay,
  });

  let hederobshnal = {
    headers: {
      token: localStorage.getItem('token'),
    },
  };

  function ChecCartPay(values) {
    let data = {
      shippingAddress: values,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://route-e-commerce-react.vercel.app`,
        data,
        hederobshnal
      )
      .then((req) => {
        console.log(req);
        window.open(req.data.session.url, '_self');
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Shipping Details
        </h1>
        <form onSubmit={ChecCartPayVales.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Details
            </label>
            <input
              type="text"
              id="details"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your address details"
              value={ChecCartPayVales.values.details}
              onChange={ChecCartPayVales.handleChange}
              onBlur={ChecCartPayVales.handleBlur}
            />
            {ChecCartPayVales.touched.details && ChecCartPayVales.errors.details && (
              <p className="text-red-500 text-sm mt-1">
                {ChecCartPayVales.errors.details}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your City
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your city"
              value={ChecCartPayVales.values.city}
              onChange={ChecCartPayVales.handleChange}
              onBlur={ChecCartPayVales.handleBlur}
            />
            {ChecCartPayVales.touched.city && ChecCartPayVales.errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {ChecCartPayVales.errors.city}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your phone number"
              value={ChecCartPayVales.values.phone}
              onChange={ChecCartPayVales.handleChange}
              onBlur={ChecCartPayVales.handleBlur}
            />
            {ChecCartPayVales.touched.phone && ChecCartPayVales.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {ChecCartPayVales.errors.phone}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-unhover-button hover:bg-main text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Pay <i className="fab fa-cc-visa ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
