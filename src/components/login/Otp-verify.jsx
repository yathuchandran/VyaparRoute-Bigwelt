import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ForgotOtp, VerifyOtpReg } from "../../api/Api"; // Import your ResendOtpReg API
import { Graygreen, secondaryColorTheme } from "../../config";
import Grid from "@mui/system/Grid";
import Loader from "../Loder/Loder";

const OtpVerification = ({ value }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(60); // Countdown timer starts from 60 seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const Mobile = localStorage.getItem("phoneNumber");
  const [loader, setLoader] = useState(false)

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsResendEnabled(true); // Enable Resend OTP link after 60 seconds
    }
  }, [timer]);

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    console.log("clicke", otp, Mobile);

    if (value === "signup") {
      handleLoaderOpen();
      try {
        const res = await VerifyOtpReg(otp, Mobile);
        console.log(res);

        if (res.message === "Your otp is verified") {
          Swal.fire({
            title: "OTP Verified!",
            text: "You have been successfully logged in.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/setPassword");
        } else {
          let iconType;
          let titleText;

          switch (res.status) {
            case 400:
              iconType = "warning";
              titleText = "Bad Request!";
              break;
            case 401:
              iconType = "error";
              titleText = "Unauthorized!";
              break;
            case 403:
              iconType = "error";
              titleText = "Forbidden!";
              break;
            case 404:
              iconType = "error";
              titleText = "Not Found!";
              break;
            case 500:
              iconType = "error";
              titleText = "Server Error!";
              break;
            default:
              iconType = "info";
              titleText = "Something went wrong!";
          }

          Swal.fire({
            title: titleText,
            text: res?.response?.data?.message,
            icon: iconType,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleLoaderClose();
    } else if (value === "forgot") {
      handleLoaderOpen();
      try {
        const res = await ForgotOtp(otp, Mobile);
        if (res.message === "Password changed successfully.") {
          Swal.fire({
            title: "OTP Verified!",
            text: "You have been successfully logged in.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/setPassword");
        } else {
          let iconType;
          let titleText;

          switch (res.status) {
            case 400:
              iconType = "warning";
              titleText = "Bad Request!";
              break;
            case 401:
              iconType = "error";
              titleText = "Unauthorized!";
              break;
            case 403:
              iconType = "error";
              titleText = "Forbidden!";
              break;
            case 404:
              iconType = "error";
              titleText = "Not Found!";
              break;
            case 500:
              iconType = "error";
              titleText = "Server Error!";
              break;
            default:
              iconType = "info";
              titleText = "Something went wrong!";
          }

          Swal.fire({
            title: titleText,
            text: res?.response?.data?.message,
            icon: iconType,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleLoaderClose();
    }

    setOtpError(!otp);
    if (!otp) return;
  };

  const handleResendOtp = async () => {
    console.log("clicked");

    try {
      const res = await VerifyOtpReg(Mobile); // Assuming ResendOtpReg API is used to resend OTP
      if (res.message === "OTP resent successfully") {
        Swal.fire({
          title: "OTP Resent!",
          text: "A new OTP has been sent to your mobile number.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimer(60); // Reset the timer to 60 seconds
        setIsResendEnabled(false); // Disable the resend button until the timer ends
      } else {
        Swal.fire({
          title: "Error",
          text:
            res?.response?.data?.message ||
            "Failed to resend OTP. Please try again.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: Graygreen,
        height: "100vh",
        // width: "99vw",
        padding: "16px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          borderRadius: 2,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            my: 4,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="./icons/9b28f4407b93e27811e0b37c8d7f70c9.png"
            style={{ width: "80px" }}
            alt="Logo"
          />

          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            OTP Verification
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleOtpSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={otpError}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter OTP"
              autoFocus
              placeholder="Enter your OTP"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: Graygreen,
                  },
                  "&:hover fieldset": {
                    borderColor: "customColorHover",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Graygreen,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "customLabelColor",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: Graygreen,
                color: "customTextColor",
                "&:hover": {
                  backgroundColor: Graygreen,
                },
              }}
            >
              VERIFY OTP
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              {isResendEnabled ? (
                <Link
                  href="#"
                  onClick={handleResendOtp}
                  sx={{ color: Graygreen }}
                >
                  Resend OTP
                </Link>
              ) : (
                <Typography variant="body2" sx={{ color: "customTextColor" }}>
                  Resend OTP in {timer} seconds
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />

    </Grid>
  );
};

export default OtpVerification;
