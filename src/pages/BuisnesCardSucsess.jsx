import React, { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import AddProduct from "../pages/AddProduct";
import { Graygreen, colourTheme } from "../config";
import AddCustomerForm from "../pages/AddCustomer";
import BusinessForm from "../pages/BuisnesForm";
import Loader from "../components/Loder/Loder";
import SucsessAnimation from "./SucsessAnimation";
import { useNavigate } from "react-router-dom";

const BuisnesCardSucsess = () => {
  const navigate = useNavigate();
  const AddProducte = () => {
    return (
      <Typography variant="h5">
        <AddProduct />
      </Typography>
    );
  };

  const AddCustomer = () => {
    return (
      <Typography variant="h5">
        <AddCustomerForm />
      </Typography>
    );
  };

  const steps = [
    "Congrasulations! Your Buisness is live Now",
    "view_product",
    "view Customer",
    "Success",
  ];
  const [activeStep, setActiveStep] = useState(3);

  const [showOption, setShowOption] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );

    navigate("/home");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const getPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100;
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" }, // Responsive width
        margin: "0 auto", // Center the box
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Step {activeStep + 1 - 1} of {steps.length - 1}
      </Typography>
      <Typography variant="h4" align="center">
        {getPercentage().toFixed(0)}%
      </Typography>
      <Typography variant="body1" align="center">
        Remaining {100 - getPercentage().toFixed(0)}%
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "green",
          fontFamily: "serif",
          fontSize: "25px",
          fontWeight: "Bold",
        }}
      >
        Store Setup is Completed
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Render the component based on the active step */}
      <Box sx={{ marginTop: 2, textAlign: "center" }}>
        {/* {activeStep === 0 && <CreateBusiness />} */}
        {activeStep === 1 && <AddProducte />}
        {activeStep === 2 && <AddCustomer />}
        {activeStep === 3 && <SucsessAnimation />}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ bgcolor: Graygreen, color: "white" }}
        >
          Previous View
        </Button>

        <Button
          onClick={handleNext}
          sx={{ bgcolor: colourTheme, color: "white", marginRight: "25px" }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Box>
  );
};

export default BuisnesCardSucsess;
