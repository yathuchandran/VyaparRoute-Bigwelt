import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Container,
  Typography,
  Popover,
} from "@mui/material";
import { GetAllGroup } from "../redux/action_api/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Graygreen } from "../config";
import { addGroupAction } from "../redux/action_api/Api";
import Loader from "../components/Loder/Loder";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch groups data from Redux store
  const { Allgroup } = useSelector((state) => state.allGroup);
  const { loading, error, isSucsess } = useSelector((state) => state.Addgroup);

  const [loader, setLoader] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [groups, setGroups] = useState([]); // Initialize as empty
  const [successMessage, setSuccessMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    if (loading === true) {
      setLoader(true);
    } else {
      setLoader(false);
    }
    if (isSucsess) {
      Swal.fire({
        title: "group added successfully!",
        text: `Your group has been successfully added`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/all/customers");
    }

    if (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: "There was an error. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [loading, isSucsess, error]);

  // Ref for the Add New Group button
  const addNewGroupRef = useRef(null);

  // Fetch groups when component mounts
  useEffect(() => {
    dispatch(GetAllGroup());
  }, [dispatch]);

  // Update local groups state when Redux state changes
  useEffect(() => {
    if (Allgroup && Allgroup.groups) {
      setGroups(Allgroup.groups);
    }
  }, [Allgroup]);

  // Handlers for form fields
  const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);

  // Handler for group selection
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroupId(groupId);
  };

  // Open and close popover handlers
  const handleDialogOpen = (event) => setAnchorEl(addNewGroupRef.current);
  const handleDialogClose = () => {
    setAnchorEl(null);
    setNewGroupName("");
  };

  // Add new group handler
  const handleAddNewGroup = () => {
    console.log("NEW GROUP ADDD");
    if (newGroupName.trim() === "") {
      return;
    }

    dispatch(addGroupAction(newGroupName.trim()));
    // setGroups((prevGroups) => [...prevGroups, newGroupName.trim()]);
    // setSelectedGroupId(newGroup.group_id);
    handleDialogClose();
  };

  // Save customer and reset form
  const handleSaveAndNew = () => {
    const selectedGroup = groups.find(
      (group) => group.group_id === selectedGroupId
    );

    console.log("Saving customer:", {
      customerName,
      contactNumber,
      group_id: selectedGroupId,
      group_name: selectedGroup ? selectedGroup.group_name : "",
    });

    setSuccessMessage("Customer saved successfully!");
    setCustomerName("");
    setContactNumber("");
    setSelectedGroupId("");

    navigate("/all/customers");
  };

  // Save customer without resetting the form
  const handleSaveCustomer = () => {
    const selectedGroup = groups.find(
      (group) => group.group_id === selectedGroupId
    );

    console.log("Saving customer:", {
      customerName,
      contactNumber,
      group_id: selectedGroupId,
      group_name: selectedGroup ? selectedGroup.group_name : "",
    });

    setSuccessMessage("Customer saved successfully!");
    navigate("/all/customers");
  };

  const handleImportCustomers = () => {
    alert("Import Customers functionality is not implemented yet.");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container maxWidth="sm" style={{ padding: "16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h4">Add New Customer</Typography>
      </div>

      {/* Import Customers Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleImportCustomers}
          startIcon={<span style={{ marginRight: "8px" }}>📥</span>}
          style={{ borderRadius: "8px", backgroundColor: "#00BFA6" }}
        >
          Import Customers
        </Button>
      </div>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {/* Customer Name Field */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={handleCustomerNameChange}
            placeholder="Enter customer name"
          />
        </FormControl>

        {/* Contact Number Field */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            placeholder="Contact number"
          />
        </FormControl>

        {/* Group Selection */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel id="group-select-label">Group</InputLabel>
          <Select
            labelId="group-select-label"
            value={selectedGroupId}
            onChange={handleGroupChange}
            label="Group"
            renderValue={(selected) => {
              const selectedGroup = groups.find(
                (group) => group.group_id === selected
              );
              return selectedGroup
                ? selectedGroup.group_name
                : "Select a group";
            }}
          >
            <Button
              ref={addNewGroupRef}
              variant="outlined"
              onClick={handleDialogOpen}
              style={{
                marginLeft: "70%",
                color: Graygreen,
              }}
            >
              Add New Group
            </Button>
            {groups.map((group) => (
              <MenuItem key={group.group_id} value={group.group_id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Popover for adding a new group */}
        <Popover
          id={id}
          open={open}
          onClose={handleDialogClose}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: window.innerHeight / 2,
            left: window.innerWidth / 2,
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center content horizontally
              justifyContent: "center", // Center content vertically
              width: "300px", // Control popover size
              position: "absolute", // Ensure it's positioned centrally
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div style={{ padding: "16px" }}>
            <Typography variant="h6">Add New Group</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Group Name"
              type="text"
              fullWidth
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Button onClick={handleAddNewGroup} color="primary">
              Add
            </Button>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
          </div>
        </Popover>

        {/* Save Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSaveAndNew}
            style={{
              borderRadius: "8px",
              backgroundColor: "#00BFA6",
              color: "#fff",
            }}
          >
            Save & New
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveCustomer}
            style={{
              borderRadius: "8px",
              backgroundColor: "#00BFA6",
              color: "#fff",
            }}
          >
            Save Customer
          </Button>
        </div>
      </div>

      {/* Success Message Snackbar */}
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      <Loader open={loader} />
    </Container>
  );
};

export default AddCustomerForm;
