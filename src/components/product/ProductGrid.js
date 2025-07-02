// src/components/product/ProductGrid.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Increased from 260px
  gap: 2rem; // Increased from 1.5rem
  padding: 1rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Increased from 240px
    gap: 1.5rem; // Increased from 1.2rem
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); // Increased from 220px
    gap: 1.2rem; // Increased from 1rem
  }
`;

const ProductGrid = ({ products, onPreOrderClick, onQuickViewClick }) => {
  return (
    <GridContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onPreOrderClick={onPreOrderClick}
          onQuickViewClick={onQuickViewClick} // Add this prop
        />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
