import React, { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import AddProduct from "../../pages/AddProduct";
import { Graygreen, colourTheme } from "../../config";
import AddCustomerForm from "../../pages/AddCustomer";
import BusinessForm from "../../pages/BuisnesForm";
import Loader from "../Loder/Loder";
import { useSearchParams } from "react-router-dom";

const BusinessCard = () => {

  const [searchParams] = useSearchParams(); // Use useSearchParams to get the params
  const id = searchParams.get("id"); // Extract id from URL
  const name = searchParams.get("name"); // Extract name from URL

  // Step components
  const CreateBusiness = () => {
    return (
        <BusinessForm onToggle={handleToggle} categoryId={id} categoryName={name} />
    );
  };

  const AddProducte = () => {
    return (
      <Typography variant="h5">
        <AddProduct   categoryId={id} categoryName={name}/>
      </Typography>
    );
  };

  const AddCustomer = () => {
    return (
      <Typography variant="h5">
        <AddCustomerForm   categoryId={id} categoryName={name}/>
      </Typography>
    );
  };

  const steps = ["Create an Online Business", "First Product", "Add Customer"];
  const [activeStep, setActiveStep] = useState(0);

  const [showOption, setShowOption] = useState(false);
  const [loader, setLoader] = useState(false)

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleToggle = (isTrue) => {
    setShowOption(isTrue);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );
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
        Step {activeStep + 1} of {steps.length}
      </Typography>
      <Typography variant="h4" align="center">
        {getPercentage().toFixed(0)}%
      </Typography>
      <Typography variant="body1" align="center">
        Remaining {100 - getPercentage().toFixed(0)}%
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
        {activeStep === 0 && <CreateBusiness />}
        {activeStep === 1 && <AddProducte />}
        {activeStep === 2 && <AddCustomer />}
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
          Back
        </Button>

        {showOption && (
          <Button
            onClick={handleNext}
            sx={{ bgcolor: colourTheme, color: "white", marginRight: "25px" }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
      </Box>
      <Loader open={loader} handleClose={handleLoaderClose} />

    </Box>
  );
};

export default BusinessCard;
