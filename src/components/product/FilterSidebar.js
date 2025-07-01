// src/components/product/FilterSidebar.js
import React from 'react';
import styled from 'styled-components';
import { FiX, FiStar } from 'react-icons/fi';
import { useFilter } from '../../context/FilterContext';

const SidebarContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  height: fit-content;
  position: sticky;
  top: 90px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    overflow-y: auto;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
    padding: 1.5rem;
  }
`;

// Make all sections more compact:
const FilterSection = styled.div`
  margin-bottom: 1rem; // Reduced from 1.2rem
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h4`
  font-size: 0.85rem; // Reduced from 0.9rem
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.6rem; // Reduced from 0.8rem
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem; // Reduced from 0.6rem
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.8rem; // Reduced from 0.85rem
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 0.4rem; // Reduced from 0.5rem
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 0.8rem; // Reduced from 0.85rem
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const RatingFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // Reduced from 0.6rem
`;

const RatingOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem; // Reduced from 0.4rem
  cursor: pointer;
  font-size: 0.8rem; // Reduced from 0.85rem
  
  input {
    margin: 0;
    transform: scale(0.9); // Make radio buttons smaller
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem; // Reduced from 0.6rem
  cursor: pointer;
  font-size: 0.8rem; // Reduced from 0.85rem
  
  input {
    margin: 0;
    transform: scale(0.9); // Make checkbox smaller
  }
`;


const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; // Reduced from 1.5rem
  
  h3 {
    font-size: 1.1rem; // Reduced from 1.2rem
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 0.6rem; // Reduced from 0.8rem
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px; // Reduced from 8px
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem; // Added smaller font
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const FilterSidebar = ({ isOpen, onClose, brands }) => {
  const {
    selectedGender,
    selectedBrand,
    priceRange,
    minRating,
    showOnlyInStock,
    setGender,
    setBrand,
    setPriceRange,
    setMinRating,
    setShowOnlyInStock,
    resetFilters
  } = useFilter();

  const handlePriceChange = (type, value) => {
    setPriceRange({
      ...priceRange,
      [type]: parseInt(value) || 0
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          size={14}
          fill={i <= rating ? '#D4AF37' : 'none'}
          color={i <= rating ? '#D4AF37' : '#E5E5E5'}
        />
      );
    }
    return stars;
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <h3>Filters</h3>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      </SidebarHeader>

      {/* Gender Filter */}
      <FilterSection>
        <FilterTitle>Gender</FilterTitle>
        <FilterSelect
          value={selectedGender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="all">All Watches</option>
          <option value="men">Men's Watches</option>
          <option value="women">Women's Watches</option>
          <option value="unisex">Unisex</option>
        </FilterSelect>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection>
        <FilterTitle>Brand</FilterTitle>
        <FilterSelect
          value={selectedBrand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="all">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </FilterSelect>
      </FilterSection>

      {/* Price Range */}
      <FilterSection>
        <FilterTitle>Price Range</FilterTitle>
        <PriceRangeContainer>
          <PriceInput
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <span>-</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </PriceRangeContainer>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection>
        <FilterTitle>Minimum Rating</FilterTitle>
        <RatingFilter>
          {[4, 3, 2, 1].map(rating => (
            <RatingOption key={rating}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={minRating === rating}
                onChange={(e) => setMinRating(parseInt(e.target.value))}
              />
              <StarContainer>
                {renderStars(rating)}
              </StarContainer>
              <span>& up</span>
            </RatingOption>
          ))}
          <RatingOption>
            <input
              type="radio"
              name="rating"
              value={0}
              checked={minRating === 0}
              onChange={(e) => setMinRating(parseInt(e.target.value))}
            />
            <span>All Ratings</span>
          </RatingOption>
        </RatingFilter>
      </FilterSection>

      {/* Stock Filter */}
      <FilterSection>
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={showOnlyInStock}
            onChange={(e) => setShowOnlyInStock(e.target.checked)}
          />
          <span>Show only in stock</span>
        </CheckboxContainer>
      </FilterSection>

      {/* Reset Button */}
      <ResetButton onClick={resetFilters}>
        Reset All Filters
      </ResetButton>
    </SidebarContainer>
  );
};

export default FilterSidebar;
