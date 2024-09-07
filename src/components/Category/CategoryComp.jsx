import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./category.css";

const CategoryComp = ({ initialCards, cardsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null); // Keep track of the selected category

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = initialCards.slice(indexOfFirstCard, indexOfLastCard);

  const navigate = useNavigate();

  // Handle when a category card is clicked
  const handleCardClick = (category, index) => {
    // Change the selected category's background color
    setSelectedCategoryIndex(index);
    // Save the selected category in localStorage (or any further processing)
    localStorage.setItem("selectedCategory", JSON.stringify(category));
  };

  // Handle the "Next" button click
  const handleNextClick = () => {
    navigate("/board");
  };

  return (
    <div>
      <h1 className="title">
        <b>Select Business Category</b>
      </h1>

      {/* Category cards */}
      <div className="card-group">
        {currentCards.map((item, index) => (
          <div
            key={index}
            className={`card ${
              selectedCategoryIndex === index ? "selected-category" : ""
            }`} // Add class dynamically
            onClick={() => handleCardClick(item, index)}
          >
            <img
              src={item.imageSrc}
              className="card-img-top"
              alt={item.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons (optional based on total pages) */}
      <div className="pagination-buttons">
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

// Default props
CategoryComp.defaultProps = {
  initialCards: [
    {
      imageSrc:
        "https://media.istockphoto.com/id/1299190286/video/businessman-walking-office-corridor.jpg?s=640x640&k=20&c=GSti6qOg3YgZRf96b1KOeicBJ5u2LSRT7Y1f7hwykUM=",
      title: "Tiffin Service",
    },
    {
      imageSrc: "./images/banner.png",
      title: "Milk Supplier",
    },
    {
      imageSrc: "https://example.com/water-supplier.jpg",
      title: "Water Supplier",
    },
    {
      imageSrc: "https://example.com/newspaper-delivery.jpg",
      title: "Newspaper Delivery",
    },
    {
      imageSrc: "https://example.com/bakery-business.jpg",
      title: "Bakery Business",
    },
  ],
  cardsPerPage: 6,
};

// Define propTypes
CategoryComp.propTypes = {
  initialCards: PropTypes.arrayOf(
    PropTypes.shape({
      imageSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardsPerPage: PropTypes.number,
};

export default CategoryComp;
