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
import AddCustomerForm from "./pages/AddCustomer";
import BuisnesCardSucsess from "./pages/BuisnesCardSucsess";
import Banner from "./components/Dashboard/Banner";
import Tmp from "./pages/Tmp";

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
          <Route path="/add/customer" element={<AddCustomerForm />} />
          <Route path="/success" element={<BuisnesCardSucsess />} />
          <Route path="/home" element={<Banner />} />
          <Route path="/prd" element={<Tmp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// host to upload