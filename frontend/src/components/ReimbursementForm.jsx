import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  reimbursementName: Yup.string().required('Reimbursement name is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  description: Yup.string().required('Description is required'),
});

const ReimbursementForm = () => {
  const formik = useFormik({
    initialValues: {
      reimbursementName: '',
      amount: '',
      description: '',
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
          <h2 className="mb-6 text-2xl font-bold text-center">Reimbursement Form</h2>

          <div className="mb-4">
            <label htmlFor="reimbursementName" className="block mb-2 text-sm font-bold text-gray-700">Reimbursement Name</label>
            <input
              id="reimbursementName"
              name="reimbursementName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reimbursementName}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter reimbursement name"
            />
            {formik.touched.reimbursementName && formik.errors.reimbursementName ? (
              <div className="text-xs italic text-red-500">{formik.errors.reimbursementName}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2 text-sm font-bold text-gray-700">Amount ($)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter amount"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="text-xs italic text-red-500">{formik.errors.amount}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-xs italic text-red-500">{formik.errors.description}</div>
            ) : null}
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

export default ReimbursementForm;
