"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
type Props = {};

const ToastProvider = (props: Props) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setIsLoad(true);
  }, [isLoad]);
  if (!isLoad) {
    return null;
  }
  return <ToastContainer />;
};

export default ToastProvider;
