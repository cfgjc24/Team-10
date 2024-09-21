import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle form submission here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Registration Form</h2>
      
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-xs italic text-red-500">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-xs italic text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-xs italic text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Form;