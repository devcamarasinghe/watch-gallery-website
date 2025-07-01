// src/components/product/ProductGrid.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const ProductGrid = ({ products }) => {
  return (
    <GridContainer>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
