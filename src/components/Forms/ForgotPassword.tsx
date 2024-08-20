import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { type ToastContent, toast } from "react-toastify";
// import { useForgotPasswordMutation } from "store/api";
import { BsInfoCircle } from "react-icons/bs";

import { forgotPasswordSchema } from "./schemas";
import { Form, GGButton } from "../UI";
import { Input } from "../Common";

const ForgotPassword = () => {
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmitHandler = async (values: any) => {
    try {
      // await forgotPassword({
      //   email: values.email,
      // }).unwrap();
      setShowMessage(true);
      toast.success(
        "Please check your email for the reset link to change your password"
      );
    } catch (error: any) {
      setShowMessage(false);
      toast.error(error?.data?.message as ToastContent<unknown>);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={async (values) => {
        await handleSubmitHandler(values);
      }}
    >
      {({ handleSubmit, dirty, isValid }) => (
        <Form
          title="Forgot Password "
          description="Please enter your email to reset your password"
          onSubmit={handleSubmit}
        >
          {showMessage && (
            <div className="flex items-center gap-3 bg-green-200/50 text-green-500 p-3 rounded-md justify-center">
              <BsInfoCircle />
              <p className="text-sm font-medium ">
                Please check your email for the reset link
              </p>
            </div>
          )}

          <Input type="email" name="email" label="Email" />

          <div className="flex justify-center mt-4">
            <GGButton
              type="submit"
              // disable={isLoading || showMessage || !dirty || !isValid}
              // loading={isLoading}
              width="100%"
            >
              Send Reset Link
            </GGButton>
          </div>
          <div className="flex items-center gap-1">
            <p>Remembered your password?</p>
            <Link
              to="../login"
              className="capitalize text-[#a13252] active:text-primary hover:text-primary visited:text-primary"
            >
              Sign In
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
