import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  providedFor: Yup.string().required('This field is required'),
  summary: Yup.string().required('Summary is required'),
});

const MeetingForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      providedFor: '',
      summary: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-animation">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form id="form" onSubmit={formik.handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">Daily Summary Form</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-xs italic text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="providedFor" className="block mb-2 text-sm font-bold text-gray-700">Who Have You Provided For</label>
            <input
              id="providedFor"
              name="providedFor"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.providedFor}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter the name of the person or group"
            />
            {formik.touched.providedFor && formik.errors.providedFor ? (
              <div className="text-xs italic text-red-500">{formik.errors.providedFor}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="summary" className="block mb-2 text-sm font-bold text-gray-700">Summary of the Day</label>
            <textarea
              id="summary"
              name="summary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.summary}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter a summary of your day"
            />
            {formik.touched.summary && formik.errors.summary ? (
              <div className="text-xs italic text-red-500">{formik.errors.summary}</div>
            ) : null}
          </div>

          <div className='mb-2'>
            <a href="/reimbursement" className="text-blue-500 underline hover:text-blue-700 ">
              Need Reimbursement?
            </a>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>

      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .bg-gradient-animation {
          background: linear-gradient(-45deg, #ffffff, #e6f2ff, #b3d9ff, #ffffff);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default MeetingForm;
