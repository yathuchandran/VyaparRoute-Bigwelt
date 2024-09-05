import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Switch,
  Box,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Phone,
  Group,
} from "@mui/icons-material";
import Flag from "react-world-flags";
import {
  AddStaffAction,
  addStaffGroup,
  GetAllGroup,
} from "../redux/action_api/productAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const countries = [
  { code: "US", name: "United States", flag: "US" },
  { code: "GB", name: "United Kingdom", flag: "GB" },
  { code: "CA", name: "Canada", flag: "CA" },
  { code: "IND", name: "India", flag: "IND" },
  // Add more countries as needed
];

const StaffForm = () => {
  const dispatch = useDispatch();
  const { isAdded, loading, error } = useSelector((state) => state.addStaff);
  const { Allgroup } = useSelector((state) => state.allGroup);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "something went wrong",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (isAdded) {
      Swal.fire({
        title: "staff Added Sucsess",
        text: "Congrats! staff Added Succsess",
        icon: "success",
        confirmButtonText: "OK",
      });
    }

    dispatch(GetAllGroup());
  }, [error, isAdded, dispatch]);

  const handleCheckboxChange = (event, groupName) => {
    if (event.target.checked) {
      // Add the group name to the selected groups array
      setSelectedGroups([...selectedGroups, groupName]);
    } else {
      // Remove the group name from the selected groups array
      setSelectedGroups(selectedGroups.filter((name) => name !== groupName));
    }
  };

  // const sendSelectedGroupsToBackend = () => {
  // Here, you'd use an API call to send `selectedGroups` to the backend

  // }
  // console.log(selectedGroups);

  const [formData, setFormData] = useState({
    staff_name: "",
    staff_mobile: "",
    countryCode: "",
    password: "",
    showPassword: false,
    attendance: false,
    permissions: false,
    startDate: "",
    monthly_salary: "",
    salary_type: "monthly",
    manage_account: false,
    manage_customer: false,
    manage_lead: false,
    manage_staff: false,
    manage_group: false,
    groupPermissions: {
      add: false,
      edit: false,
      delete: false,
    },
    groups: [],
    newGroup: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  // const handleGroupChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     newGroup: e.target.value,
  //   }));
  // };

  // const addGroup = () => {
  //   if (formData.newGroup.trim()) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       groups: [...prevData.groups, formData.newGroup.trim()],
  //       newGroup: "", // Clear input field
  //     }));
  //   }
  // };

  const handleSave = () => {
    // disp
    console.log("Form data:", formData);
    // dispatch(AddStaffAction(formData));
    dispatch(addStaffGroup(formData, selectedGroups));
  };

  const HandleClick = () => {
    setOpen(!open);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "15px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "whitesmoke", // Added background color
      }}
    >
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Staff and Permissions
        </Typography>
      </Box>

      {/* Success Message */}
      {successMessage && (
        <Box
          sx={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {successMessage}
        </Box>
      )}

      <form>
        <FormControl
          fullWidth
          margin="normal"
          sx={{ position: "relative", marginBottom: "10px" }}
        >
          <TextField
            label="STAFF"
            name="staff_name"
            value={formData.staff_name}
            onChange={handleChange}
            placeholder="Staff name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{
              paddingRight: "60px", // Adding extra space for the external icon
              backgroundColor: "white", // White background
            }}
          />
          <IconButton
            aria-label="add contact"
            sx={{
              position: "absolute",
              right: "10px", // Adjust positioning
              top: "50%",

              transform: "translateY(-50%)",
              color: "blue", // Change the color of the icon
              border: "1px solid rgba(0, 0, 0, 0.12)", // Add border with 1px thickness
              borderRadius: "50%", // Ensure the button is circular
              "&:hover": {
                border: "1px solid rgba(0, 0, 0, 0.23)", // Border color on hover
              },
            }}
          >
            <Phone />
          </IconButton>
        </FormControl>

        <Box display="flex" justifyContent="space-between" margin="normal">
          <FormControl sx={{ flex: 1, marginRight: "8px", marginTop: "10px" }}>
            <InputLabel>Country Code</InputLabel>
            <Select
              value={formData.countryCode}
              name="countryCode"
              onChange={handleChange}
              renderValue={(selected) => (
                <Box display="flex" alignItems="center">
                  <Flag
                    code={selected}
                    style={{
                      width: "20px",
                      height: "24px",
                      marginRight: "8px",
                    }}
                  />
                  {countries.find((country) => country.code === selected)
                    ?.name || "Select Country"}
                </Box>
              )}
              sx={{ backgroundColor: "white" }} // White background
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  <Box display="flex" alignItems="center">
                    <Flag
                      code={country.flag}
                      style={{
                        width: "10px",
                        height: "10px",
                        marginRight: "10px",
                      }}
                    />
                    {country.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 2, marginTop: "10px" }}>
            <TextField
              label="Mobile Number"
              name="staff_mobile"
              value={formData.staff_mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              sx={{
                width: "100%", // Ensures the input takes the full available width
                backgroundColor: "white", // White background
              }}
            />
          </FormControl>
        </Box>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Create & give Password to staff"
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined" // Ensures it has a border
            sx={{ backgroundColor: "white" }} // White background
          />
        </FormControl>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", marginTop: "25px" }}
        >
          Manage Salary & Permissions
        </Typography>

        <FormControl
          component="fieldset"
          margin="normal"
          id="main"
          sx={{ paddingLeft: "10vh" }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              marginBottom: "25px",
              fontSize: "14px",
              paddingRight: "-2px",
              padding: "4px",
              backgroundColor: "whitesmoke",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              borderRadius: "4px",
              border: "1px solid rgba(0, 0, 0, 0.23)", // Added border to match TextField
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                paddingRight: "21px",
              }}
            >
              Attendance & Salary
              <br />
              <span style={{ fontSize: "10px", fontWeight: "normal" }}>
                Manage attendance & salary
              </span>
            </Typography>
            <Box sx={{ position: "absolute", right: "-10px" }}>
              <Switch
                name="attendance"
                checked={formData.attendance}
                onChange={handleChange}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "lightgreen",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "lightgreen",
                  },
                }}
              />
            </Box>
          </Box>

          {formData.attendance && (
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                fontSize: "10px",
                padding: "6px",
                backgroundColor: "white",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)", // Added border to match TextField
                width: "100%",
                marginBottom: "20px",
                textAlign: "center", // Center text in the box
              }}
            >
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                <strong>Salary Calculation Details</strong>
              </Typography>

              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: "10px", backgroundColor: "white" }} // White background
              />

              <TextField
                label="Enter Monthly Salary"
                name="monthly_salary"
                type="number"
                value={formData.monthly_salary}
                onChange={handleChange}
                placeholder="Enter Monthly Salary"
                sx={{ marginBottom: "10px", backgroundColor: "white" }} // White background
              />

              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="10px"
                padding="10px"
              >
                {/* <TextField
                  label="Monthly Rate"
                  name="monthly_salary"
                  type="button"
                  value={formData.monthly_salary}
                  onChange={handleChange}
                  placeholder="Monthly Rate"
                  sx={{ width: "40%", backgroundColor: "white" }} // White background
                /> */}
                {/* <TextField
                  label="Daily Rate"
                  name="dailyRate"
                  type="button"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  placeholder="Daily Rate"
                  sx={{ width: "40%", backgroundColor: "white" }} // White background
                /> */}
                {/* <button id="btn">monthly</button>
                <button id="btn">Daily Rate</button> */}
              </Box>
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            sx={{
              fontSize: "14px",
              padding: "3px",
              backgroundColor: "whitesmoke",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              borderRadius: "4px",
              border: "1px solid rgba(0, 0, 0, 0.23)", // Added border to match TextField
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                paddingRight: "20px",
              }}
            >
              <strong>Permissions</strong>
              <br />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "normal",
                  paddingRight: "15px",

                  margin: "10px",
                }}
              >
                Grant permission to staff managing your business on{" "}
                <strong>LOCOFEED</strong> business App
              </span>
            </Typography>
            <Box sx={{ position: "absolute", right: "-10px" }}>
              <Switch
                name="permissions"
                checked={formData.permissions}
                onChange={handleChange}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "lightgreen",
                    // '&:hover': {
                    //   backgroundColor: 'rgba(144, 238, 144, 0.2)',
                    // },
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "lightgreen",
                  },
                }}
              />
            </Box>
          </Box>

          {formData.permissions && (
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                fontSize: "10px",
                padding: "2.1px",
                // margin:'4px',
                marginTop: "15px",
                backgroundColor: "white",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)", // Added border to match TextField
                width: "100%",
                marginBottom: "20px",
                textAlign: "center", // Center text in the box
              }}
            >
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                <strong>Give full permission to {formData.staff_name}</strong>
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ textAlign: "center" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px", justifyContent: "center" }}
                  >
                    <Checkbox
                      name="manage_account"
                      checked={formData.manage_account}
                      onChange={handleChange}
                    />
                    <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                      Manage Accounts
                      <br />
                      <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                        Manage Purchase Cash Book and Sales Record
                      </span>
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px", justifyContent: "center" }}
                  >
                    <Checkbox
                      name="manage_customer"
                      checked={formData.manage_customer}
                      onChange={handleChange}
                    />
                    <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                      Manage Customers
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px", justifyContent: "center" }}
                  >
                    <Checkbox
                      name="manage_lead"
                      checked={formData.manage_lead}
                      onChange={handleChange}
                    />
                    <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                      Manage Lead
                    </Typography>
                    <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                      (get leads and sale)
                    </span>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px", justifyContent: "center" }}
                  >
                    <Checkbox
                      name="manage_staff"
                      checked={formData.manage_staff}
                      onChange={handleChange}
                    />
                    <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                      Manage staff
                    </Typography>
                    <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                      (manage attendance add new staff and permission)
                    </span>
                  </Box>
                  <Box
                    onClick={() => {
                      HandleClick();
                    }}
                    display="flex"
                    alignItems="center"
                    sx={{
                      marginTop: "18px",
                      marginBottom: "10px",
                      justifyContent: "center",
                      backgroundColor: "#cbcdce",
                      height: "12vh",
                    }}
                  >
                    <Group sx={{ color: "blue" }} />

                    <Box>
                      <Typography sx={{ width: "40vh" }}>
                        Manage Groups
                        <span sx={{ fontSize: "8px" }}>
                          (Give acsess to staff Respective Group customer
                          Managment add and Edit all Data)
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {open && (
                  <Box>
                    {Allgroup?.customers_group?.map((group) => (
                      <Box
                        key={group.group_id}
                        display="flex"
                        alignItems="center"
                        sx={{
                          marginBottom: "10px",
                          justifyContent: "center",
                          backgroundColor: "lightblue",
                        }}
                      >
                        <Checkbox
                          name={group.group_name}
                          onChange={(e) =>
                            handleCheckboxChange(e, group.group_name)
                          }
                        />
                        <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                          {group.group_name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </FormControl>
            </Box>
          )}
        </FormControl>

        <Box display="flex" justifyContent="center" marginTop="26px">
          <Button
            sx={{ paddingLeft: "50px", paddingRight: "50px" }}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#00BFA6" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default StaffForm;
