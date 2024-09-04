import React, { useState } from "react";
import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard";
import "./category.css";
import { useNavigate } from "react-router-dom";
const CategoryComp = ({ initialCards, cardsPerPage }) => {
  // const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastCard = currentPage * cardsPerPage;
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = initialCards.slice(indexOfFirstCard, indexOfLastCard);

  // const totalPages = Math.ceil(initialCards.length / cardsPerPage);

  // const nextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/board");
  };

  return (
    <div>
      <h1 className="title">
        <b>Select Business Category</b>
      </h1>
      <div className="card-group">
        {initialCards.map((item, index) => (
          <CategoryCard
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button className="next-button" onClick={HandleClick}>
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
      imageSrc: "path/to/image1.jpg",
      title: "Tiffin Service",
    },
    {
      imageSrc: "path/to/image2.jpg",
      title: "Milk Supplier",
    },
    {
      imageSrc: "path/to/image3.jpg",
      title: "Water Supplier",
    },
    {
      imageSrc: "path/to/image1.jpg",
      title: "Newspaper Delivery",
    },
    {
      imageSrc: "path/to/image2.jpg",
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
  ),
  cardsPerPage: PropTypes.number,
};

export default CategoryComp;
