import React, { useState } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLogin } from "../../api/Api";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { Graygreen, secondaryColorTheme } from "../../config";
import Grid from "@mui/system/Grid";
import Loader from "../Loder/Loder";
const Login = () => {
  const navigate = useNavigate();
  const [sLoginName, setLoginName] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(!sLoginName);
    setPasswordError(!sPassword);
    if (!sLoginName || !sPassword) return;
    if (sLoginName && sPassword) {
      handleLoaderOpen();
      try {
        const res = await getLogin({ name: sLoginName, password: sPassword });

        if (res.message === "OTP Sent Successfully.") {
          localStorage.setItem("UserName", sLoginName);
          localStorage.setItem("userId", 1234);
          localStorage.setItem("Mobile", sPassword);

          Swal.fire({
            title: "Login Successful!",
            text: `OTP has been sent to your registered ${sPassword}.`,
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/otp-verification"); // Navigate to the OTP verification page
        } else {
          // Handle different status codes
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
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      handleLoaderClose();
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
        // width: '99vw',
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
            LOGIN
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={emailError}
              onChange={(e) => setLoginName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="UserName"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: Graygreen, // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "customColorHover", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Graygreen, // Border color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "customLabelColor", // Custom label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen, // Custom label color when focused
                },
              }}
            />

            <Box sx={{ position: "relative" }}>
              <TextField
                error={passwordError}
                onChange={(e) => setSPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="Number"
                label="Number"
                type={showPassword ? "text" : "Number"}
                id="Number"
                autoComplete="current-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: Graygreen, // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "customColorHover", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: Graygreen, // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "customLabelColor", // Custom label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: Graygreen, // Custom label color when focused
                  },
                }}
              />
              <Box
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <LockOpenIcon /> : <LockIcon />}
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: Graygreen, // Button background color
                color: "customTextColor", // Button text color
                "&:hover": {
                  backgroundColor: Graygreen, // Button background color on hover
                },
              }}
            >
              LOGIN
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "#282821", // Custom color for the link
                    "&:hover": {
                      color: Graygreen, // Custom color when hovering over the link
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    color: "#282821", // Custom color for the link
                    "&:hover": {
                      color: Graygreen, // Custom color when hovering over the link
                    },
                  }}
                >
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Grid>
  );
};

export default Login;
