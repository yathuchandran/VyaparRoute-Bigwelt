import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Container,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Swal from "sweetalert2";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { CreateProduct, clearError } from "../redux/action_api/productAction";
import Grid from "@mui/system/Grid";
import Loader from "../components/Loder/Loder";
import { CREATE_PRODUCT_RESET } from "../redux/constant/productConstant";

const AddProduct = ({ onToggle }) => {
  const [open, setOpen] = useState(false);
  const [measureValue, setMeasureValue] = useState("");
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("");
  const [cess, setCess] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [recollectedEmptyProduct, setRecollectedEmptyProduct] = useState(false);
  const [addProductToExistingCustomer, setAddProductToExistingCustomer] =
    useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [sucsess, setsucsess] = useState(true);

  const dispatch = useDispatch();
  const { loading, error, product, isSucsess } = useSelector(
    (state) => state.products
  );

  console.log(product);

  const measureUnits = [
    "Numbers(NOS)",
    "Pieces(pcs)",
    "Kilogram(kg)",
    "Gram(gm)",
    "Liter(LTR)",
    "Millimeter(ML)",
    "Feet(ft)",
    "Packs(pcs)",
  ];

  useEffect(() => {
    // Load existing product data from local storage if available
    const existingProduct = JSON.parse(localStorage.getItem("productData"));
    if (existingProduct) {
      setName(existingProduct.p_name || "");
      setPrice(existingProduct.p_price || "");
      setAmount(existingProduct.p_discount_price || "");
      setGst(existingProduct.gst || "");
      setCess(existingProduct.cess || "");
      setDescription(existingProduct.p_description || "");
      setMeasureValue(existingProduct.unit || "");
      setRecollectedEmptyProduct(existingProduct.recollected_empty || false);
      setAddProductToExistingCustomer(existingProduct.add_product || false);
    }

    if (product) {
      Swal.fire({
        title: `${product}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // Clear the local storage after a successful addition
      // localStorage.removeItem("productData");
      // onToggle(true);
      setsucsess(false);
    }

    if (isSucsess) {
      dispatch({ type: CREATE_PRODUCT_RESET });
    }

    if (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(clearError());
    }

    return () => {
      dispatch({ type: CREATE_PRODUCT_RESET });
    };
  }, [product, error, onToggle, isSucsess, dispatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleValueSelect = (value) => {
    setMeasureValue(value);
    setOpen(false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRecollectedChange = (event) => {
    setRecollectedEmptyProduct(event.target.checked);
  };

  const handleAddProductChange = (event) => {
    setAddProductToExistingCustomer(event.target.checked);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.set("p_name", name);
    formData.set("p_price", price);
    formData.set("p_discount_price", amount);
    formData.set("gst", gst);
    formData.set("cess", cess);
    formData.set("add_product", addProductToExistingCustomer);
    formData.set("recollected_empty", recollectedEmptyProduct);
    formData.set("p_description", description);
    formData.set("unit", measureValue);
    if (image) {
      formData.append("image", image);
    }

    dispatch(CreateProduct(formData));

    // Save the product data in local storage
    const productData = {
      p_name: name,
      p_price: price,
      p_discount_price: amount,
      gst: gst,
      cess: cess,
      add_product: addProductToExistingCustomer,
      recollected_empty: recollectedEmptyProduct,
      p_description: description,
      unit: measureValue,
      imagePreviewUrl: imagePreviewUrl,
    };

    localStorage.setItem("productData", JSON.stringify(productData));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Container style={{ backgroundColor: "#fff5EA", padding: "16px" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              sx={{ textAlign: "center" }}
            >
              <h1>Add Product</h1>
              <TextField
                fullWidth
                label="Item Name"
                required
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClick}>
                        {measureValue ? measureValue : "Select Unit"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {open && (
                <Box
                  sx={{
                    backgroundColor: "black",
                    width: "100%",
                    position: "absolute",
                    zIndex: 1,
                    borderRadius: "4px",
                  }}
                >
                  {measureUnits.map((elem, index) => (
                    <p
                      key={index}
                      style={{
                        margin: 0,
                        padding: "5px 10px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => handleValueSelect(elem)}
                    >
                      {elem}
                    </p>
                  ))}
                </Box>
              )}

              <TextField
                required
                fullWidth
                label="Sale Price {RS}"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Discount Amount"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    fullWidth
                    label="Enter GST%"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter CESS%"
                    variant="outlined"
                    value={cess}
                    onChange={(e) => setCess(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                label="Description"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Grid container alignItems="center" sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={recollectedEmptyProduct}
                      onChange={handleRecollectedChange}
                    />
                  }
                  label={
                    <span>
                      Have you recollected empty product{" "}
                      <span style={{ fontStyle: "italic" }}>
                        (this cannot be changed afterwards)
                      </span>
                    </span>
                  }
                />
              </Grid>

              <Grid container alignItems="center" sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addProductToExistingCustomer}
                      onChange={handleAddProductChange}
                    />
                  }
                  label={<span>Add product to existing customer</span>}
                />
              </Grid>

              <p>Product Media</p>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    height: { xs: "150px", md: "300px" },
                    width: { xs: "150px", md: "300px" },
                    border: "2px dashed gray",
                    borderRadius: "12px",
                    position: "relative",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                  onClick={handleIconClick}
                >
                  <CameraAltIcon sx={{ fontSize: 50 }} />
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Box>
              </Grid>

              {sucsess && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default AddProduct;
