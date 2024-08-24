import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import Authentication from "./pages/Authentication";
import ForgotPassword from "./components/Forms/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Membership from "./pages/Membership";
import Deduction from "./pages/Deduction";
import "./App.css";
import VerifyPhone from "./components/Forms/VerifyForm";
import Saving from "./pages/Saving";

function App() {
  const navigate = useNavigate();
  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  let timer: string | number | NodeJS.Timeout | undefined;

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 10000); // 10000ms = 10secs. You can change the time.
  };

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Authentication />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-phone" element={<VerifyPhone />} />
      </Route>
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Navigate to="membership" replace />} />
        <Route path="subscription-deduction" element={<Deduction />} />
        <Route path="saving-deduction" element={<Saving />} />
        <Route path="membership" element={<Membership />} />
      </Route>
    </Routes>
  );
}

export default App;
