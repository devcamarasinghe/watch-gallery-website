// src/components/pages/WishlistPage.js
import React from 'react';
import styled from 'styled-components';
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiArrowLeft,
  FiEye
} from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 60vh;
`;

const WishlistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const WishlistTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  svg {
    color: ${props => props.theme.colors.error};
  }
`;

const ItemCount = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  font-weight: 400;
`;

const ClearAllButton = styled.button`
  background: none;
  color: ${props => props.theme.colors.error};
  border: 1px solid ${props => props.theme.colors.error};
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.error};
    color: white;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const WishlistCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${props => props.theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.textMuted};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.error};
    color: white;
    transform: scale(1.1);
  }
`;

const AddedDate = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductBrand = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.8rem;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  
  .current-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
  }
  
  .original-price {
    font-size: 1rem;
    color: ${props => props.theme.colors.textMuted};
    text-decoration: line-through;
  }
`;

const StockStatus = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  display: inline-block;
  
  ${props => props.$inStock ? `
    background: rgba(16, 185, 129, 0.1);
    color: ${props.theme.colors.success};
  ` : `
    background: rgba(239, 68, 68, 0.1);
    color: ${props.theme.colors.error};
  `}
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.primary {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    
    &:hover:not(:disabled) {
      background: #b8941f;
      transform: translateY(-1px);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover {
      background: ${props => props.theme.colors.border};
    }
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  .icon {
    font-size: 4rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const ShopButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #b8941f;
    transform: translateY(-1px);
  }
`;

const SignInPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
  }
`;

const WishlistPage = ({ onAuthModalOpen }) => {
  const { items, removeFromWishlist, clearWishlist, itemCount } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddToCart = (product) => {
    if (product.inStock) {
      addToCart(product, 1);
      // Optional: Remove from wishlist after adding to cart
      // removeFromWishlist(product.id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  if (!isAuthenticated) {
    return (
      <WishlistContainer>
        <WishlistHeader>
          <HeaderLeft>
            <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
              <FiArrowLeft />
              Continue Shopping
            </BackButton>
          </HeaderLeft>
        </WishlistHeader>

        <SignInPrompt>
          <h2>Sign In Required</h2>
          <p>Please sign in to view and manage your wishlist</p>
          <ShopButton onClick={() => onAuthModalOpen && onAuthModalOpen('login')}>
            Sign In
          </ShopButton>
        </SignInPrompt>
      </WishlistContainer>
    );
  }

  if (items.length === 0) {
    return (
      <WishlistContainer>
        <WishlistHeader>
          <HeaderLeft>
            <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
              <FiArrowLeft />
              Continue Shopping
            </BackButton>
            <WishlistTitle>
              <FiHeart />
              My Wishlist
              <ItemCount>(0 items)</ItemCount>
            </WishlistTitle>
          </HeaderLeft>
        </WishlistHeader>

        <EmptyWishlist>
          <div className="icon">💝</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite watches here to purchase them later</p>
          <ShopButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
            Start Shopping
          </ShopButton>
        </EmptyWishlist>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <WishlistHeader>
        <HeaderLeft>
          <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
            <FiArrowLeft />
            Continue Shopping
          </BackButton>
          <WishlistTitle>
            <FiHeart />
            My Wishlist
            <ItemCount>({itemCount} items)</ItemCount>
          </WishlistTitle>
        </HeaderLeft>

        <ClearAllButton onClick={handleClearAll}>
          Clear All
        </ClearAllButton>
      </WishlistHeader>

      <WishlistGrid>
        {items.map(item => (
          <WishlistCard key={item.id}>
            <CardImage>
              ⌚
              <RemoveButton
                onClick={() => removeFromWishlist(item.id)}
                title="Remove from wishlist"
              >
                <FiTrash2 />
              </RemoveButton>
              {item.addedAt && (
                <AddedDate>
                  Added {formatDate(item.addedAt)}
                </AddedDate>
              )}
            </CardImage>

            <CardContent>
              <ProductBrand>{item.brand}</ProductBrand>
              <ProductName>{item.name}</ProductName>

              <ProductPrice>
                <span className="current-price">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="original-price">${item.originalPrice}</span>
                )}
              </ProductPrice>

              <StockStatus $inStock={item.inStock}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </StockStatus>

              <CardActions>
                <ActionButton
                  className="primary"
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                >
                  <FiShoppingCart />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </ActionButton>

                <ActionButton
                  className="secondary"
                  onClick={() => {/* Navigate to product detail */ }}
                >
                  <FiEye />
                  View
                </ActionButton>
              </CardActions>
            </CardContent>
          </WishlistCard>
        ))}
      </WishlistGrid>
    </WishlistContainer>
  );
};

export default WishlistPage;
