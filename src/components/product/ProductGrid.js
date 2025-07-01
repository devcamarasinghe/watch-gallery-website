// src/components/product/ProductGrid.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
`;

const ProductGrid = ({ products, onPreOrderClick }) => { // Add onPreOrderClick prop
  return (
    <GridContainer>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onPreOrderClick={onPreOrderClick} // Pass it down
        />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
