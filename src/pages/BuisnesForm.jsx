// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import Swal from "sweetalert2";
// import { business_details } from "../api/Api";
// import Grid from "@mui/system/Grid";
// import { Maroone, Graygreen } from "../config";
// import Loader from "../components/Loder/Loder";

// const BusinessForm = ({ onToggle }) => {
//   const [businessName, setBusinessName] = useState("");
//   const [businessAddress, setBusinessAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [pinCode, setPinCode] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const category = localStorage.getItem("category");
//   const [loader, setLoader] = useState(false)

//   const handleLoaderClose = () => {
//     setLoader(false);
//   };
//   const handleLoaderOpen = () => {
//     setLoader(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "businessName":
//         setBusinessName(value);
//         break;
//       case "businessAddress":
//         setBusinessAddress(value);
//         break;
//       case "city":
//         setCity(value);
//         break;
//       case "pinCode":
//         setPinCode(value);
//         break;
//       case "state":
//         setState(value);
//         break;
//       case "country":
//         setCountry(value);
//         break;
//       default:
//         break;
//     }
//   };
//   //

//   //GET LOCATIONS ADDRESS CODE AND  API ----------------------------------------------------------------------
//   const getLocation = () => {
//     handleLoaderOpen();
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
//           fetch(url)
//             .then((res) => {
//               if (!res.ok) {
//                 throw new Error("Network response was not ok");
//               }
//               return res.json();
//             })
//             .then((data) => {
//               // Ensure data.address exists
//               if (data && data.address) {
//                 setCity(data.address.city);
//                 setPinCode(data.address.postcode);
//                 setState(data.address.state);
//                 setCountry(data.address.country);

//               } else {
//                 console.error("Address data is not available");
//                 Swal.fire({
//                   title: "Address Not Found",
//                   text: "Could not retrieve address information for the given location.",
//                   icon: "warning",
//                   showConfirmButton: false,
//                   timer: 1500,
//                 });
//               }
//             })
//             .catch((error) => {
//               console.error("Error fetching address:", error);
//               Swal.fire({
//                 title: "Error",
//                 text: "There was an error fetching the address. Please try again later.",
//                 icon: "error",
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//             });
//         },
//         (error) => {
//           handleGeolocationError(error);
//         }
//       );
//     } else {
//       Swal.fire({
//         title: "Geolocation Not Supported",
//         text: "Geolocation is not supported by this browser.",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//     handleLoaderClose();
//   };

//   const handleGeolocationError = (error) => {
//     let errorMessage = "";
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         errorMessage = "User denied the request for Geolocation.";
//         break;
//       case error.POSITION_UNAVAILABLE:
//         errorMessage = "Location information is unavailable.";
//         break;
//       case error.TIMEOUT:
//         errorMessage = "The request to get user location timed out.";
//         break;
//       case error.UNKNOWN_ERROR:
//         errorMessage = "An unknown error occurred.";
//         break;
//       default:
//         errorMessage = "An unknown error occurred.";
//     }
//     Swal.fire({
//       title: "Geolocation Error",
//       text: errorMessage,
//       icon: "error",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };
//   //-------------------------------------------------------------------------------------------------------

//   const handleFinish = async (e) => {
//     e.preventDefault();
//     let errors = {};

//     if (!businessName) errors.businessName = "Business name is required";
//     if (!businessAddress)
//       errors.businessAddress = "Business address is required";

//     if (Object.keys(errors).length !== 0) {
//       setFormErrors(errors);
//     }
//     if (businessName && businessAddress) {
//       handleLoaderOpen();
//     try {
//       const res = await business_details(
//         businessName,
//         businessAddress,
//         city,
//         pinCode,
//         state,
//         country,
//         category
//       );

//       if (
//         res.message === "Your Business Details  has been Added successfully"
//       ) {
//         Swal.fire({
//           title: "Success",
//           text: `${res.message}`,
//           icon: "success",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         // navigate("/select-category");
//         onToggle(true);
//       } else {
//         // Handle different status codes
//         let iconType;
//         let titleText;

//         switch (res.status) {
//           case 400:
//             iconType = "warning";
//             titleText = "Bad Request!";
//             break;
//           case 401:
//             iconType = "error";
//             titleText = "Unauthorized!";
//             break;
//           case 403:
//             iconType = "error";
//             titleText = "Forbidden!";
//             break;
//           case 404:
//             iconType = "error";
//             titleText = "Not Found!";
//             break;
//           case 500:
//             iconType = "error";
//             titleText = "Server Error!";
//             break;
//           default:
//             iconType = "info";
//             titleText = "Something went wrong!";
//         }

//         Swal.fire({
//           title: titleText,
//           text: res?.response?.data?.message,
//           icon: iconType,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         title: "Error",
//         text: "Something went wrong. Please try again later.",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//     handleLoaderClose();
//     }
    
//   };

//   return (
//     <Container>
//       <Typography variant="h6"  marginBottom={3} marginTop={2}>
//         Business Details
//       </Typography>

//       <form onSubmit={handleFinish}>
//         <Grid container spacing={3} width='100%'>
//           <Grid item xs={12}>
//             <TextField
//               label="Business Name"
//               name="businessName"
//               value={businessName}
//               onChange={handleChange}
//               fullWidth
//               error={!!formErrors.businessName}
//               helperText={formErrors.businessName}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   top: -10,
//                 },
//               }}
//             />
//           </Grid>

//           {/* Business Address */}
//           <Grid item xs={12}>
//             <TextField
//               label="Business Address"
//               name="businessAddress"
//               value={businessAddress}
//               onChange={handleChange}
//               fullWidth
//               error={!!formErrors.businessAddress}
//               helperText={formErrors.businessAddress}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   top: -10,
//                 },
//               }}
//             />
//           </Grid>

//           {/* City */}
//           <Grid item xs={12}>
//             <TextField
//               label="City"
//               name="city"
//               value={city}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   top: -10,
//                 },
//               }}
//             />
//           </Grid>

//           {/* Pin Code and State */}
//           <Grid item xs={12} container spacing={2} alignItems="center">
//             <Grid
//               item
//               xs={6}
//               sm={3}
//               sx={{ "@media (max-width:600px)": { width: "30%" } }}
//             >
//               <TextField
//                 label="Pin Code"
//                 name="pinCode"
//                 value={pinCode}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 sx={{
//                   "& .MuiInputLabel-root": {
//                     top: -10,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={3}
//               sx={{ "@media (max-width:600px)": { width: "68%" } }}
//             >
//               <TextField
//                 label="State"
//                 name="state"
//                 value={state}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 sx={{
//                   "& .MuiInputLabel-root": {
//                     top: -10,
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* Country and Get Location */}
//           <Grid item xs={12} container spacing={2} alignItems="center">
//             <Grid
//               item
//               xs={6}
//               sm={3}
//               sx={{ "@media (max-width:600px)": { width: "68%" } }}
//             >
//               <TextField
//                 label="Country"
//                 name="country"
//                 value={country}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 sx={{
//                   "& .MuiInputLabel-root": {
//                     top: -10,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={3}
//               sx={{ "@media (max-width:600px)": { width: "30%" } }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={getLocation}
//                 fullWidth
//                 sx={{
//                   height: "100%",
//                   backgroundColor: Maroone,
//                   boxShadow: 3,
//                   "&:hover": {
//                     backgroundColor: Maroone,
//                     boxShadow: 6,
//                   },
//                 }}
//               >
//                 Get Location
//               </Button>
//             </Grid>
//           </Grid>

//           {/* Finish Button */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="secondary"
//               fullWidth
//               sx={{
//                 backgroundColor: Graygreen,
//                 boxShadow: 2,
//                 marginTop: "10px",
//                 "&:hover": {
//                   backgroundColor: Graygreen,
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               Finish
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <Loader open={loader} handleClose={handleLoaderClose} />

//     </Container>
//   );
// };

// export default BusinessForm;



import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { business_details } from "../api/Api";
import { Maroone, Graygreen } from "../config";
import Loader from "../components/Loder/Loder";

const BusinessForm = ({ onToggle }) => {
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const category = localStorage.getItem("category");
    const [loader, setLoader] = useState(false)

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "businessName":
        setBusinessName(value);
        break;
      case "businessAddress":
        setBusinessAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "pinCode":
        setPinCode(value);
        break;
      case "state":
        setState(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };
//   //GET LOCATIONS ADDRESS CODE AND  API ----------------------------------------------------------------------
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Network response was not ok");
              }
              return res.json();
            })
            .then((data) => {
              if (data && data.address) {
                setCity(data.address.city);
                setPinCode(data.address.postcode);
                setState(data.address.state);
                setCountry(data.address.country);
              } else {
                console.error("Address data is not available");
                Swal.fire({
                  title: "Address Not Found",
                  text: "Could not retrieve address information for the given location.",
                  icon: "warning",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              Swal.fire({
                title: "Error",
                text: "There was an error fetching the address. Please try again later.",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        },
        (error) => {
          let errorMessage = "";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          Swal.fire({
            title: "Geolocation Error",
            text: errorMessage,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      Swal.fire({
        title: "Geolocation Not Supported",
        text: "Geolocation is not supported by this browser.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

//-------------------------------------------------------------------------
  const handleFinish = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!businessName) errors.businessName = "Business name is required";
    if (!businessAddress)
      errors.businessAddress = "Business address is required";

    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
    }

        if (businessName && businessAddress) {
      handleLoaderOpen();
    try {
      const res = await business_details(
        businessName,
        businessAddress,
        city,
        pinCode,
        state,
        country,
        category
      );

      if (
        res.message === "Your Business Details  has been Added successfully"
      ) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        // navigate("/select-category");
        onToggle(true);
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
 
  };

  return (
    <Container>
      <Typography variant="h6" align="center" marginBottom={3} marginTop={2}>
        Business Details
      </Typography>

      <form onSubmit={handleFinish}>
        <Grid container spacing={3}>
          {/* Business Name */}
          <Grid item xs={12}>
            <TextField
              label="Business Name"
              name="businessName"
              value={businessName}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.businessName}
              helperText={formErrors.businessName}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* Business Address */}
          <Grid item xs={12}>
            <TextField
              label="Business Address"
              name="businessAddress"
              value={businessAddress}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.businessAddress}
              helperText={formErrors.businessAddress}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* City */}
          <Grid item xs={12}>
            <TextField
              label="City"
              name="city"
              value={city}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* Pin Code and State */}
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={6} sm={6}>
              <TextField
                label="Pin Code"
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="State"
                name="state"
                value={state}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
          </Grid>

          {/* Country and Get Location */}
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={6} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={country}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={getLocation}
                fullWidth
                sx={{
                  height: "100%",
                  backgroundColor: Maroone,
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: Maroone,
                    boxShadow: 6,
                  },
                }}
              >
                Get Location
              </Button>
            </Grid>
          </Grid>

          {/* Finish Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                backgroundColor: Graygreen,
                boxShadow: 2,
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: Graygreen,
                  boxShadow: 4,
                },
              }}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </form>
      <Loader open={loader} handleClose={handleLoaderClose} />

    </Container>
  );
};

export default BusinessForm;