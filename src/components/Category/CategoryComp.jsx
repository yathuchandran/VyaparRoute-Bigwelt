import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { cateList } from "../../api/Api";

const CategoryComp = ({ cardsPerPage }) => {
  const [categories, setCategories] = useState([]); // State to store fetched categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await cateList();
        setCategories(res.data.business_category); // Store fetched data in state
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (id, name) => {
    navigate(`/board?id=${id}&name=${name}`);
    console.log(id, name,"id, name==========================");
    
  };

  const styles = {
    container: {
      textAlign: "center",
      paddingBottom: "20px",
    },
    cardGroup: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    card: {
      width: "140px", // Adjust the width
      height: "130px", // Adjust the height
      border: "1px solid #ddd",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer", // Add cursor pointer to indicate clickability
    },
    image: {
      width: "90%",
      height: "90px", // Adjust the image height
      objectFit: "cover", // Ensure the image fits nicely
    },
    title: {
      margin: "10px 0",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  return (
    <div>
      <h1 style={styles.container}>
        <b>Select Business Category</b>
      </h1>
      <div style={styles.cardGroup}>
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => handleCardClick(item.id, item.name)} // Attach click event
            >
              <img
                src={item.image || "path/to/placeholder.jpg"}
                alt={item.name}
                style={styles.image}
              />
              <h3 style={styles.title}>{item.name}</h3>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

// Define propTypes
CategoryComp.propTypes = {
  cardsPerPage: PropTypes.number,
};

export default CategoryComp;
