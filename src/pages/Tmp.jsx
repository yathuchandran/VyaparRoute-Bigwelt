import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Tmp() {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [group, setGroup] = useState("");
  const [deliveryDays, setDeliveryDays] = useState([]);
  const [products, setProducts] = useState([
    { name: "Product Name 1", price: 70, delivered: "", emptyBalance: "" },
    { name: "Product Name 2", price: 80, delivered: "", emptyBalance: "" },
  ]);

  const handleDeliveryDayToggle = (day) => {
    setDeliveryDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="customer-form">
      <header>
        <button className="back-button">{"<"}</button>
        <h1>{customerName || "(Customer Name)"}</h1>
        <button className="save-button">Save</button>
      </header>
      <p className="subtitle">Customer added by (App operator name)</p>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Mobile No."
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="group-select">
        <input
          type="text"
          placeholder="General Group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <span className="dropdown-icon">▼</span>
      </div>

      <div className="balance-section">
        <div className="balance green">
          <span>₹ 00.00</span>
          <small>Current balance (if any)</small>
        </div>
        <div className="balance red">
          <span>₹ 00.00</span>
          <small>Total current payment due</small>
        </div>
      </div>

      <div className="delivery-days">
        <h2>Delivery Days</h2>
        <div className="day-buttons">
          {["Daily", "Alternate", "Weekdays"].map((day) => (
            <button
              key={day}
              className={deliveryDays.includes(day) ? "active" : ""}
              onClick={() => handleDeliveryDayToggle(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="product-details">
        <div
          style={{
            backgroundColor: "#23bc7c",
            borderRadius: "12px",
            color: "white",
          }}
        >
          <div style={{ marginLeft: "25px" }}>
            <h2 style={{ paddingTop: "22px" }}>Product Details</h2>
            <p style={{ marginTop: "-3vh", paddingBottom: "2vh" }}>
              Select which products do you want to deliver to this customer.
              <span id="icon" style={{ marginLeft: "39px" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
              </span>
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Delivered</th>
              <th>Empty Balance</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <input
                    type="text"
                    style={{ border: "black" }}
                    value={product.delivered}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].delivered = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.emptyBalance}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].emptyBalance = e.target.value;
                      setProducts(newProducts);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
