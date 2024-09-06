export default function Banner() {
  const menuItems = [
    { name: "Customer", icon: "👤" },
    { name: "Group", icon: "👥" },
    { name: "Employs", icon: "👷" },
    { name: "Expenses", icon: "💰" },
    { name: "Products", icon: "📦" },
    { name: "Events", icon: "🎉" },
    { name: "Sale", icon: "🛒" },
    { name: "Purchase", icon: "🛍️" },
    { name: "Backup", icon: "💾" },
  ];

  const bottomNavItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Lead", icon: "🎯" },
    { name: "Cashbook", icon: "📒" },
    { name: "Plan", icon: "📅" },
    { name: "More", icon: "⋯" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.businessName}>
          <span>
            <img
              src="./images/loginhome.jpg"
              alt=""
              style={{ height: "2", width: "5vh", paddingRight: "12px" }}
            />
          </span>
          MM EnterPrices
        </div>
        <div style={styles.profileIcon}>👤</div>
      </div>

      <div style={styles.content}>
        <div style={styles.banner}>
          <h2 style={styles.bannerText}>
            Top Doorstep Delivery Services in India
          </h2>
          <img
            src="./images/bnner.png"
            alt=""
            style={{ height: "22vh", marginLeft: "9vh", marginTop: "2vh" }}
          />
        </div>

        <div style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <div key={index} style={styles.menuItem}>
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={styles.menuText}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.bottomNav}>
        {bottomNavItems.map((item, index) => (
          <div key={index} style={styles.navItem}>
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navText}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#1de9b6",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#00bfa5",
    color: "white",
  },
  businessName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  profileIcon: {
    fontSize: "24px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    overflowY: "auto",
  },
  banner: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  },
  bannerText: {
    margin: 0,
    textAlign: "center",
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },
  menuItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "15px",
    cursor: "pointer",
  },
  menuIcon: {
    fontSize: "24px",
    marginBottom: "5px",
  },
  menuText: {
    fontSize: "14px",
  },
  bottomNav: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: "10px 0",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  navIcon: {
    fontSize: "20px",
    marginBottom: "2px",
  },
  navText: {
    fontSize: "12px",
  },
};
