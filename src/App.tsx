import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
