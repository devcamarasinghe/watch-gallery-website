// src/components/pages/CartPage.js
import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 60vh;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemBrand = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
  font-weight: 500;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`;

const CartSummary = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 90px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-of-type {
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${props => props.theme.colors.border};
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    background: #b8941f;
    transform: translateY(-1px);
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: none;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
  }
`;

const CartPage = () => {
  const { 
    items, 
    total, 
    itemCount,
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const subtotal = total;
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

const handleCheckout = () => {
  window.navigateTo && window.navigateTo('checkout');
};

  if (items.length === 0) {
    return (
      <CartPageContainer>
        <CartHeader>
          <BackButton onClick={() => window.history.back()}>
            <FiArrowLeft />
            Continue Shopping
          </BackButton>
        </CartHeader>
        <EmptyCartMessage>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any watches to your cart yet.</p>
          <ContinueShoppingButton onClick={() => window.history.back()}>
            Start Shopping
          </ContinueShoppingButton>
        </EmptyCartMessage>
      </CartPageContainer>
    );
  }

  return (
    <CartPageContainer>
      <CartHeader>
        <BackButton onClick={() => window.history.back()}>
          <FiArrowLeft />
          Continue Shopping
        </BackButton>
        <h1>Shopping Cart ({itemCount} items)</h1>
      </CartHeader>

      <CartContent>
        <CartItems>
          {items.map(item => (
            <CartItem key={item.id}>
              <ItemImage>⌚</ItemImage>
              <ItemDetails>
                <ItemBrand>{item.brand}</ItemBrand>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price}</ItemPrice>
                <ItemActions>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </QuantityButton>
                  </QuantityControls>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 />
                    Remove
                  </RemoveButton>
                </ItemActions>
              </ItemDetails>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
          <ContinueShoppingButton onClick={() => window.history.back()}>
            Continue Shopping
          </ContinueShoppingButton>
        </CartSummary>
      </CartContent>
    </CartPageContainer>
  );
};

export default CartPage;
