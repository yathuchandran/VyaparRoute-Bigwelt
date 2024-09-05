import React, { useState } from "react";
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

const AllCustomers = () => {
  const [search, setSearch] = useState("");
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
        <Button variant="contained" startIcon={<AddIcon />} color="primary">
          Add Group
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} color="secondary">
          Add Staff
        </Button>
      </Box>

      <List>
        {filtered.map((customer, index) => (
          <ListItem
            key={index}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: 1,
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <ListItemText
                  primary={customer.name}
                  secondary={customer.group}
                />
              </Grid>
              <Grid item xs={3} align="right">
                <Typography
                  variant="body2"
                  color={customer.status < 0 ? "red" : "green"}
                >
                  {customer.amount}
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

      <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
        ADD CUSTOMER
      </Button>
    </Box>
  );
};

export default AllCustomers;
