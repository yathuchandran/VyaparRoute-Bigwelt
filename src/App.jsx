import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import OtpVerification from "./components/login/Otp-verify";
import ForgotPassword from "./components/login/ForgotPassword";
import Signup from "./components/login/Signup";
import SetPassword from "./components/login/SetPassword";
import CategoryComp from "./components/Category/CategoryComp";

import BusinessCard from "./components/Category/BuisnessCard";
import AddProduct from "./pages/AddProduct";
import StaffForm from "./pages/StafForm";
import BusinessForm from "./pages/CustomerName";
import AllCustomer from "./pages/AllCustomers";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route
            path="/otp-verification"
            exact
            element={<OtpVerification value="signup" />}
          ></Route>
          <Route
            path="/otp-Forgot"
            element={<OtpVerification value="forgot" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/setPassword" element={<SetPassword />} />
          <Route path="/select-category" element={<CategoryComp />} />
          <Route path="/board" element={<BusinessCard />} />
          <Route path="/staf" element={<StaffForm />} />
          <Route path="/all/customers" element={<AllCustomer />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
