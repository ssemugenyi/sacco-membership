import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";

// import { useDispatch } from "react-redux";
// import { useLoginUserMutation } from "store/api";
// import { login } from "store/slices";

import { Input } from "../Common";
import { Form, GGButton } from "../UI";
import { loginSchema } from "./schemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../store/firebase";

const LoginForm = () => {
  // const [loginUser, { isLoading }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLogin = async (values: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      // const userCredential = await loginUser({
      //   email: values.email,
      //   password: values.password,
      // }).unwrap();

      // toast.success(
      //   `Login Successful, Welcome Back ${userCredential?.user?.userName ?? " "}`,
      // );

      // dispatch(
      //   login({
      //     accessToken: userCredential?.token,
      //     refreshToken: userCredential?.refreshToken,
      //     user: userCredential?.user,
      //   }),
      // );
      navigate("../dashboard");
    } catch (error: any) {
      // if (error?.data?.status === "fail") {
      //   toast.error(
      //     (error?.data?.message as ToastContent<unknown>) ??
      //       "Please to activate your account"
      //   );
      // } else {
      //   toast.error(error?.data?.message as ToastContent<unknown>);
      // }
    }
  };

  return (
    <div className="h-screen w-full flex items-center m-auto justify-center px-3 max-w-[400px]">
      <Formik
        enableReinitialize
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          await handleLogin(values);
        }}
      >
        {({ handleSubmit, dirty, isValid }) => (
          <Form
            title="Sign in"
            description="Please sign in into your account"
            onSubmit={handleSubmit}
          >
            <Input type="email" name="email" label="Email" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
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
            <div className="mb-2 flex justify-end">
              <Link
                to="/forgot-password"
                className="font-poppins font-normal text-[16px] capitalize block text-right active:text-primary hover:text-primary visited:text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex justify-center mt-4">
              <GGButton type="submit" width="100%">
                Login
              </GGButton>
            </div>
            <div className="flex items-center gap-1">
              <p>Don&apos;t have an account?</p>
              <Link
                to="../register"
                className="capitalize text-[#a13252] active:text-primary hover:text-primary visited:text-primary"
              >
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
