import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Switch,
  Tab,
  Tabs,
  Paper,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  ChevronLeft,
  CalendarToday,
  Person,
  Add,
  Remove,
} from "@mui/icons-material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function Temp() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState([
    { id: 1, name: "Basic Lunch Tiffin", delivered: 5, stockbooked: 3 },
    { id: 2, name: "Basic Dinner Tiffin", delivered: 5, stockbooked: 0 },
    { id: 3, name: "Super Lunch Tiffin", delivered: 0, stockbooked: 0 },
    { id: 4, name: "Premium Lunch Tiffin", delivered: 0, stockbooked: 0 },
  ]);

  const handleDeliveredChange = (id, value) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, delivered: Math.max(0, product.delivered + value) }
          : product
      )
    );
  };

  const handleStockbookedChange = (id, value) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              stockbooked: Math.max(0, product.stockbooked + value),
            }
          : product
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400, margin: "auto", bgcolor: "grey.100", p: 2 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Box
            sx={{
              bgcolor: "success.light",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small">
                <ChevronLeft />
              </IconButton>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                (Customer Name)
              </Typography>
            </Box>
            <Button color="primary">Edit</Button>
          </Box>

          <Box sx={{ p: 2, bgcolor: "background.paper" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Advance / Due
                </Typography>
                <Typography variant="h5" color="success.main" fontWeight="bold">
                  Rs +5000
                </Typography>
              </Box>
              <Button variant="outlined" size="small">
                Set Date
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                startIcon={<CalendarToday />}
                variant="contained"
                color="primary"
                size="small"
              >
                July 2024
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  Send Whatsapp SMS for Daily Entry
                </Typography>
                <Switch defaultChecked color="primary" />
              </Box>
            </Box>

            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab label="Daily Entry" />
              <Tab label="Bills" />
              <Tab label="Ledger" />
            </Tabs>

            <Card sx={{ bgcolor: "error.light", mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">05 July 2024</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" sx={{ mr: 1 }}>
                      5
                    </Button>
                    <Button variant="contained" size="small">
                      3
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Person fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">(App Operator Name)</Typography>
                </Box>
                {products.map((product) => (
                  <Grid
                    container
                    key={product.id}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Grid item xs={6}>
                      <Typography variant="body2">{product.name}</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      container
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Grid item>
                        <IconButton
                          size="small"
                          onClick={() => handleDeliveredChange(product.id, -1)}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ mx: 1 }}
                        >
                          {product.delivered}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleDeliveredChange(product.id, 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleStockbookedChange(product.id, -1)
                          }
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ mx: 1 }}
                        >
                          {product.stockbooked}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleStockbookedChange(product.id, 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </CardContent>
            </Card>

            {[
              { date: "04 July 2024", delivered: 4, stockbooked: 2 },
              { date: "03 July 2024", delivered: 6, stockbooked: 5 },
              { date: "02 July 2024", delivered: 3, stockbooked: 4 },
              { date: "01 July 2024", delivered: 0, stockbooked: 0 },
            ].map((entry, index) => (
              <Card
                key={index}
                sx={{
                  mb: 1,
                  bgcolor: index === 3 ? "error.light" : "success.light",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{entry.date}</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" sx={{ mr: 1 }}>
                      {entry.delivered}
                    </Button>
                    <Button variant="contained" size="small">
                      {entry.stockbooked}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

// import React from "react";

// export default function Temp() {
//   const menuItems = [
//     { name: "Customer", icon: "👤" },
//     { name: "Group", icon: "👥" },
//     { name: "Employs", icon: "👷" },
//     { name: "Expenses", icon: "💰" },
//     { name: "Products", icon: "📦" },
//     { name: "Events", icon: "🎉" },
//     { name: "Sale", icon: "🛒" },
//     { name: "Purchase", icon: "🛍️" },
//     { name: "Backup", icon: "💾" },
//   ];

//   const bottomNavItems = [
//     { name: "Dashboard", icon: "📊" },
//     { name: "Lead", icon: "🎯" },
//     { name: "Cashbook", icon: "📒" },
//     { name: "Plan", icon: "📅" },
//     { name: "More", icon: "⋯" },
//   ];

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div style={styles.businessName}>(Business Name)</div>
//         <div style={styles.profileIcon}>👤</div>
//       </div>

//       <div style={styles.content}>
//         <div style={styles.banner}>
//           <h2 style={styles.bannerText}>Banners</h2>
//         </div>

//         <div style={styles.menuGrid}>
//           {menuItems.map((item, index) => (
//             <div key={index} style={styles.menuItem}>
//               <span style={styles.menuIcon}>{item.icon}</span>
//               <span style={styles.menuText}>{item.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={styles.bottomNav}>
//         {bottomNavItems.map((item, index) => (
//           <div key={index} style={styles.navItem}>
//             <span style={styles.navIcon}>{item.icon}</span>
//             <span style={styles.navText}>{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     maxWidth: "400px",
//     margin: "0 auto",
//     backgroundColor: "#1de9b6",
//     fontFamily: "Arial, sans-serif",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     backgroundColor: "#00bfa5",
//     color: "white",
//   },
//   businessName: {
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   profileIcon: {
//     fontSize: "24px",
//   },
//   content: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px",
//     overflowY: "auto",
//   },
//   banner: {
//     backgroundColor: "white",
//     borderRadius: "10px",
//     padding: "20px",
//     marginBottom: "20px",
//   },
//   bannerText: {
//     margin: 0,
//     textAlign: "center",
//   },
//   menuGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "15px",
//   },
//   menuItem: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     padding: "15px",
//     cursor: "pointer",
//   },
//   menuIcon: {
//     fontSize: "24px",
//     marginBottom: "5px",
//   },
//   menuText: {
//     fontSize: "14px",
//   },
//   bottomNav: {
//     display: "flex",
//     justifyContent: "space-around",
//     backgroundColor: "white",
//     padding: "10px 0",
//   },
//   navItem: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   navIcon: {
//     fontSize: "20px",
//     marginBottom: "2px",
//   },
//   navText: {
//     fontSize: "12px",
//   },
// };

// import React from "react";

// export default function Temp() {
//   const steps = [
//     {
//       title: "Create online business",
//       description: "Congratulations! Your business is now live.",
//       completed: true,
//     },
//     {
//       title: "Add first product",
//       description:
//         "Create your first product by adding the product name and image.",
//       completed: true,
//     },
//     {
//       title: "Add first customer",
//       description: "Create your first customer by adding their contact info.",
//       completed: false,
//     },
//   ];

//   const navItems = [
//     { name: "Dashboard", icon: "📊" },
//     { name: "Lead", icon: "🎯" },
//     { name: "Cashbook", icon: "📒" },
//     { name: "Plan", icon: "📅" },
//     { name: "More", icon: "⋯" },
//   ];

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="business-name">(Business Name)</div>
//       </header>
//       <main className="main-content">
//         <div className="progress-circle">
//           <svg viewBox="0 0 36 36" className="circular-chart">
//             <path
//               className="circle-bg"
//               d="M18 2.0845
//                 a 15.9155 15.9155 0 0 1 0 31.831
//                 a 15.9155 15.9155 0 0 1 0 -31.831"
//             />
//             <path
//               className="circle"
//               strokeDasharray="94, 100"
//               d="M18 2.0845
//                 a 15.9155 15.9155 0 0 1 0 31.831
//                 a 15.9155 15.9155 0 0 1 0 -31.831"
//             />
//             <text x="18" y="20.35" className="percentage">
//               94%
//             </text>
//           </svg>
//         </div>
//         <p className="progress-text">Store setup is completed</p>
//         <p className="instruction-text">
//           Finish following steps to unlock feature
//         </p>
//         <div className="steps">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className={`step ${step.completed ? "completed" : ""}`}
//             >
//               <div className="step-icon">{step.completed ? "✅" : "➕"}</div>
//               <div className="step-content">
//                 <h3 className="step-title">{step.title}</h3>
//                 <p className="step-description">{step.description}</p>
//                 {!step.completed && (
//                   <button className="add-button">Add customer</button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//       <nav className="bottom-nav">
//         {navItems.map((item, index) => (
//           <div key={index} className="nav-item">
//             <span className="nav-icon">{item.icon}</span>
//             <span className="nav-text">{item.name}</span>
//           </div>
//         ))}
//       </nav>
//       <style jsx>{`
//         .app {
//           font-family: Arial, sans-serif;
//           max-width: 414px;
//           margin: 0 auto;
//           height: 100vh;
//           display: flex;
//           flex-direction: column;
//           background-color: #1de9b6;
//         }
//         .header {
//           background-color: #00bfa5;
//           color: white;
//           padding: 1rem;
//         }
//         .business-name {
//           font-size: 1.2rem;
//           font-weight: bold;
//         }
//         .main-content {
//           flex: 1;
//           padding: 1rem;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }
//         .progress-circle {
//           width: 150px;
//           height: 150px;
//         }
//         .circular-chart {
//           display: block;
//           margin: 10px auto;
//           max-width: 80%;
//           max-height: 250px;
//         }
//         .circle-bg {
//           fill: none;
//           stroke: #eee;
//           stroke-width: 3.8;
//         }
//         .circle {
//           fill: none;
//           stroke-width: 2.8;
//           stroke-linecap: round;
//           animation: progress 1s ease-out forwards;
//           stroke: white;
//         }
//         .percentage {
//           fill: white;
//           font-size: 0.5em;
//           text-anchor: middle;
//         }
//         .progress-text {
//           color: white;
//           font-size: 1.2rem;
//           margin: 0.5rem 0;
//         }
//         .instruction-text {
//           color: white;
//           font-size: 1rem;
//           margin-bottom: 1rem;
//         }
//         .steps {
//           background-color: white;
//           border-radius: 10px;
//           padding: 1rem;
//           width: 100%;
//         }
//         .step {
//           display: flex;
//           margin-bottom: 1rem;
//         }
//         .step-icon {
//           margin-right: 1rem;
//           font-size: 1.5rem;
//         }
//         .step-content {
//           flex: 1;
//         }
//         .step-title {
//           margin: 0;
//           font-size: 1rem;
//         }
//         .step-description {
//           margin: 0.5rem 0;
//           font-size: 0.9rem;
//           color: #666;
//         }
//         .add-button {
//           background-color: #1de9b6;
//           color: white;
//           border: none;
//           padding: 0.5rem 1rem;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .bottom-nav {
//           display: flex;
//           justify-content: space-around;
//           background-color: white;
//           padding: 0.5rem 0;
//         }
//         .nav-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }
//         .nav-icon {
//           font-size: 1.5rem;
//         }
//         .nav-text {
//           font-size: 0.8rem;
//         }
//         @keyframes progress {
//           0% {
//             stroke-dasharray: 0 100;
//           }
//         }
//         @media (max-width: 414px) {
//           .app {
//             height: 100vh;
//             width: 100vw;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
