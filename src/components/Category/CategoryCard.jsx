import React from "react";
// import styled from "styled-components";
const CategoryCard = ({ imageSrc, title }) => {
  return (
    // <Wrapper>
    <div>
      <div className="card">
        <img src={imageSrc} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
    // {/* </Wrapper> */}
  );
};

// const Wrapper = styled.section`
//   .card {
//     transition: transform 0.2s ease-in-out;
//   }

//   .card:hover {
//     transform: translateY(-5px);
//   }
// `;
export default CategoryCard;
