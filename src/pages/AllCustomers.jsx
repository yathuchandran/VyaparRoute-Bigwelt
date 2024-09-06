import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Graygreen } from "../config";

import { useSelector, useDispatch } from "react-redux";
import { allCustomersAction } from "../redux/action_api/productAction";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllCustomers = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, error, allCustomers } = useSelector(
    (state) => state.allGroup
  );

  console.log(allCustomers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCustomersAction());
  }, [dispatch]);
  const customers = [
    {
      name: "Dilip Joshi",
      amount: "₹4,000",
      status: "-6",
      group: "South Admin Group",
      mobile_number: "9876543210",
    },
    {
      name: "Excel",
      amount: "₹1,364",
      status: "-2",
      group: "Admin Group",
      mobile_number: "123",
    },
    {
      name: "Abc",
      amount: "₹364",
      status: "0",
      group: "Other Group",
      mobile_number: "456",
    },
    {
      name: "Ram",
      amount: "₹67",
      status: "-5",
      group: "Owner Group",
      mobile_number: "789",
    },
    {
      name: "XYZ",
      amount: "₹0",
      status: "0",
      group: "Group Group",
      mobile_number: "555",
    },
    {
      name: "CCD",
      amount: "₹0",
      status: "0",
      group: "General Group",
      mobile_number: "111",
    },
  ];

  // Search filter logic for name or mobile number
  const filtered = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.mobile_number.includes(search)
  );

  const handleStaff = () => {
    navigate("/staf");
  };

  const handleCustomerBtn = () => {
    navigate("/add/customer");
  };

  const handleNextBtn = () => {
    navigate("/success");
  };

  return (
    <Box sx={{ padding: 2, maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        All Customers
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          variant="outlined"
          placeholder="Search Customer via Name / Mobile number"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <IconButton>
                <FilterListIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={handleOpen}
        >
          Add Group
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a Group :
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                size="small"
              />
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={handleStaff}
        >
          Add Staff
        </Button>
      </Box>

      <List>
        {allCustomers?.users.map((customer, index) => (
          <ListItem
            key={index}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: 1,
              height: "8vh",
            }}
          >
            <Grid container alignItems="center">
              <img
                src="/images/loginhome.jpg"
                alt=""
                style={{ width: "5vh", height: "" }}
              />
              <Grid item xs={6}>
                <ListItemText
                  primary={customer.fullname}
                  secondary={customer.group_name}
                />
              </Grid>
              <Grid item xs={3} align="right">
                <Typography
                  variant="body2"
                  color={customer.status < 0 ? "red" : "green"}
                >
                  {customer.security_deposit}
                </Typography>
              </Grid>
              <Grid item xs={3} align="right">
                <Typography
                  variant="body2"
                  color={customer.status < 0 ? "red" : "green"}
                >
                  {customer.status}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          onClick={handleCustomerBtn}
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            width: "22vh",
          }}
        >
          ADD CUSTOMER
        </Button>
      </Box>

      <Box>
        <Button
          onClick={handleNextBtn}
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            bgcolor: Graygreen,
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AllCustomers;
