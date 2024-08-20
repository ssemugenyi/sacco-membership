import React, { useState } from "react";

import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { useNewUserMutation } from "store/api";

// import { generateAlphanumericId } from "utils";
// import { registerSchema } from "./schemas";
import "react-toastify/dist/ReactToastify.css";
import { Form, GGButton } from "../UI";
import { Input } from "../Common";
import { registerSchema } from "./schemas";
import { auth } from "../../store/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [newUser, { isLoading }] = useNewUserMutation();

  const handleRegister = async (values: any) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(res);
      // await newUser({
      //   firstName: values.fname,
      //   lastName: values.lname,
      //   userName: `${values.fname}${values.lname}`,
      //   email: values.email,
      //   password: values.password,
      //   phone: `+256${values.phoneNumber}`,
      //   userId: generateAlphanumericId(8),
      // }).unwrap();
      // toast.success(
      //   `Account created successfully, You will be notified by email when your account is activated`
      // );
      navigate("../login");
    } catch (error: any) {
      // toast.error(error?.data?.message as ToastContent<unknown>);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleRegister(values);
        resetForm();
      }}
    >
      {({ handleSubmit, dirty, isValid }) => (
        <Form
          description="Please Create Your Account"
          title="Sign up"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 flex-col md:flex-row">
            <Input type="text" name="fname" label="First Name" />
            <Input type="text" name="lname" label="Last Name" />
          </div>
          <Input type="email" name="email" label="Email" />
          <Input
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            prepend="+256"
            placeholder="774104154"
          />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="********"
            append={
              showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )
            }
            appendClick={() => setShowPassword(!showPassword)}
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter Password"
          />

          <div className="flex justify-center mt-4">
            <GGButton
              type="submit"
              // disable={isLoading || !dirty || !isValid}
              // loading={isLoading}
              width="100%"
            >
              Sign Up
            </GGButton>
          </div>
          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <Link
              to="../login"
              className="capitalize text-[#a13252] active:text-primary hover:text-primary visited:text-primary"
            >
              Sign in
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
