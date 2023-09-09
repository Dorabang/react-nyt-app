import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToastProvider = () => {
  return <ToastContainer autoClose={1500} position='top-center' pauseOnHover />;
};

export default ToastProvider;
