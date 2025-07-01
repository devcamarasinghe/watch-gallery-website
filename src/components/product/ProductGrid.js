// src/components/product/ProductGrid.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); // Reduced from 280px
  gap: 1.5rem; // Reduced from 2rem
  padding: 1rem 0; // Reduced from 2rem 0
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); // Reduced from 250px
    gap: 1.2rem; // Reduced from 1.5rem
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); // Even smaller for mobile
    gap: 1rem;
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
