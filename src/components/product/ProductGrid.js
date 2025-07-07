// src/components/product/ProductGrid.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import ProductCardList from './ProductCardList';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem 0;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s ease;
`;

const ProductGrid = ({ products, onPreOrderClick, onQuickViewClick, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <ListContainer>
        {products.map(product => (
          <ProductCardList 
            key={product.id} 
            product={product} 
            onPreOrderClick={onPreOrderClick}
            onQuickViewClick={onQuickViewClick}
          />
        ))}
      </ListContainer>
    );
  }

  return (
    <GridContainer>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onPreOrderClick={onPreOrderClick}
          onQuickViewClick={onQuickViewClick}
        />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
