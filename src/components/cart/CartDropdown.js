// src/components/cart/CartDropdown.js
import React from 'react';
import styled from 'styled-components';
import { FiX, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartOverlay = styled(({ isOpen, ...props }) => <div {...props} />)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const CartContainer = styled(({ isOpen, ...props }) => <div {...props} />)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  background: ${props => props.theme.colors.background};
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const CartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  line-height: 1.3;
`;

const ItemBrand = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  padding: 0.25rem;
  font-size: 0.8rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
  
  svg {
    font-size: 3rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 1rem;
  }
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundSecondary};
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  span:first-child {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
  
  span:last-child {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
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
  
  &:hover {
    background: #b8941f;
    transform: translateY(-1px);
  }
`;

const ClearCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: none;
  color: ${props => props.theme.colors.textMuted};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const CartDropdown = () => {
  const {
    items,
    isOpen,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCartOpen
  } = useCart();

  const handleOverlayClick = () => {
    setCartOpen(false);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
  };

  const handleCheckout = () => {
    setCartOpen(false);
    window.navigateTo && window.navigateTo('checkout');
  };

  return (
    <>
      <CartOverlay isOpen={isOpen} onClick={handleOverlayClick} />
      <CartContainer isOpen={isOpen} onClick={handleCartClick}>
        <CartHeader>
          <h3>Shopping Cart ({itemCount})</h3>
          <CloseButton onClick={() => setCartOpen(false)}>
            <FiX />
          </CloseButton>
        </CartHeader>

        {items.length === 0 ? (
          <EmptyCart>
            <FiShoppingBag />
            <h3>Your cart is empty</h3>
            <p>Add some watches to get started!</p>
          </EmptyCart>
        ) : (
          <>
            <CartItems>
              {items.map(item => (
                <CartItem key={item.id}>
                  <ItemImage>⌚</ItemImage>
                  <ItemDetails>
                    <ItemBrand>{item.brand}</ItemBrand>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price}</ItemPrice>
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
                      Remove
                    </RemoveButton>
                  </ItemDetails>
                </CartItem>
              ))}
            </CartItems>

            <CartFooter>
              <CartSummary>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </CartSummary>
              <CheckoutButton onClick={handleCheckout}>
                Proceed to Checkout
              </CheckoutButton>
              <ClearCartButton onClick={clearCart}>
                Clear Cart
              </ClearCartButton>
            </CartFooter>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default CartDropdown;
