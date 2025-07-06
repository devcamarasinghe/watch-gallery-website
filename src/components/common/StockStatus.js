// src/components/common/StockStatus.js
import React from 'react';
import styled from 'styled-components';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';

const StockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StockIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  
  ${props => props.$status === 'in-stock' && `
    background: ${props.theme.colors.success};
    color: white;
  `}
  
  ${props => props.$status === 'low-stock' && `
    background: ${props.theme.colors.warning};
    color: white;
  `}
  
  ${props => props.$status === 'out-of-stock' && `
    background: ${props.theme.colors.error};
    color: white;
  `}
`;

const StockText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  
  ${props => props.$status === 'in-stock' && `
    color: ${props.theme.colors.success};
  `}
  
  ${props => props.$status === 'low-stock' && `
    color: ${props.theme.colors.warning};
  `}
  
  ${props => props.$status === 'out-of-stock' && `
    color: ${props.theme.colors.error};
  `}
`;

const StockStatus = ({ status, label, showIcon = true }) => {
  const getIcon = () => {
    switch (status) {
      case 'in-stock':
        return <FiCheck />;
      case 'low-stock':
        return <FiAlertTriangle />;
      case 'out-of-stock':
        return <FiX />;
      default:
        return <FiCheck />;
    }
  };

  return (
    <StockContainer>
      {showIcon && (
        <StockIcon $status={status}>
          {getIcon()}
        </StockIcon>
      )}
      <StockText $status={status}>
        {label}
      </StockText>
    </StockContainer>
  );
};

export default StockStatus;