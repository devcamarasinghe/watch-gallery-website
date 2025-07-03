// src/components/common/QuantitySelector.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMinus, FiPlus } from 'react-icons/fi';

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const QuantityLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  min-width: 60px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 36px;
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
  }
  
  /* Hide number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const StockInfo = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  margin-left: 0.5rem;
`;

const QuantitySelector = ({ 
  value = 1, 
  onChange, 
  min = 1, 
  max = 99, 
  availableQuantity = 0,
  showStockInfo = true,
  disabled = false 
}) => {
  const [quantity, setQuantity] = useState(value);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleIncrease = () => {
    const maxAllowed = Math.min(max, availableQuantity);
    const newQuantity = Math.min(maxAllowed, quantity + 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const maxAllowed = Math.min(max, availableQuantity);
    const newQuantity = Math.max(min, Math.min(maxAllowed, value));
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const maxAllowed = Math.min(max, availableQuantity);
  const canDecrease = quantity > min && !disabled;
  const canIncrease = quantity < maxAllowed && !disabled;

  return (
    <QuantityContainer>
      <QuantityLabel>Qty:</QuantityLabel>
      <QuantityControls>
        <QuantityButton
          type="button"
          onClick={handleDecrease}
          disabled={!canDecrease}
          title="Decrease quantity"
        >
          <FiMinus />
        </QuantityButton>
        
        <QuantityInput
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={maxAllowed}
          disabled={disabled}
        />
        
        <QuantityButton
          type="button"
          onClick={handleIncrease}
          disabled={!canIncrease}
          title="Increase quantity"
        >
          <FiPlus />
        </QuantityButton>
      </QuantityControls>
      
      {showStockInfo && (
        <StockInfo>
          {availableQuantity > 0 ? `${availableQuantity} available` : 'Out of stock'}
        </StockInfo>
      )}
    </QuantityContainer>
  );
};

export default QuantitySelector;