import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  gap: 20px;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 2rem;
  font-weight: 900;
  margin: 30px 0 20px;
`;

const NewProducts = ({ products }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox {...product} key={product._id}>
              {product.title}
            </ProductBox>
          ))}
      </ProductGrid>
    </Center>
  );
};

export default NewProducts;
