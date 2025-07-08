// src/components/product/ProductCardList.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useInventory } from '../../hooks/useInventory'; // Import the useInventory hook
import StockStatus from '../common/StockStatus'; // Import StockStatus component
import QuantitySelector from '../common/QuantitySelector';
import { showToast } from '../../utils/toast';

// Update the ListCardContainer to center vertically
const ListCardContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
  align-items: center; // This centers vertically
  min-height: 180px; // Set a minimum height
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover .nav-button {
    opacity: 1;
  }
  
  &:hover .quick-view {
    transform: translateY(0);
  }
`;

const QuickViewOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 3;
  
  ${ListCardContainer}:hover & {
    transform: translateY(0);
  }
`;

// Update ImageCarousel to maintain aspect ratio
const ImageCarousel = styled.div`
  position: relative;
  width: 250px;  // Increased from 200px
  height: 180px; // Increased from 150px
  flex-shrink: 0;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundSecondary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 120px;
    height: 120px;
  }
`;

// Update ProductImage to center properly
const ProductImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['$totalImages'].includes(prop)
}).attrs(({ $totalImages }) => ({
  style: {
    width: `${100 / $totalImages}%`
  }
}))`
  height: 100%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

const ImageContainer = styled.div.attrs(({ $currentIndex, $imageCount }) => ({
  style: {
    width: `${$imageCount * 100}%`,
    transform: `translateX(-${$currentIndex * (100 / $imageCount)}%)`
  }
}))`
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 8px;
  }
  
  &.next {
    right: 8px;
  }
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
`;

const Indicator = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$active'].includes(prop)
})`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? props.theme.colors.secondary : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: scale(1.2);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.textMuted};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Badge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  
  ${props => props.type === 'sale' && css`
    background: ${props.theme.colors.error};
    color: white;
  `}
  
  ${props => props.type === 'new' && css`
    background: ${props.theme.colors.success};
    color: white;
  `}
  
  ${props => props.type === 'limited' && css`
    background: ${props.theme.colors.secondary};
    color: white;
  `}
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ProductHeader = styled.div`
  margin-bottom: 1rem;
`;

const ProductBrand = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
  font-weight: 600;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.5;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FiStar)`
  font-size: 0.9rem;
  color: ${props => props.filled ? '#FFD700' : props.theme.colors.border};
  fill: ${props => props.filled ? '#FFD700' : 'none'};
`;

const ReviewCount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`;

const GenderTag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 0.8rem;
`;

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.error};
  font-weight: 700;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  opacity: 0.7;
  transform: translateX(10px);
  transition: all 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    border-color: ${props => props.theme.colors.secondary};
    transform: scale(1.1);
  }
  
  ${props => props.active && css`
    background: ${props.theme.colors.error};
    color: white;
    border-color: ${props.theme.colors.error};
  `}
`;

const AddToCartButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
    justify-content: center; 
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.preOrder && css`
    background: #F59E0B;
    
    &:hover {
      background: #D97706;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const ProductCardList = ({ product, onPreOrderClick, onQuickViewClick }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isWishlisted = isInWishlist(product.id);
  const images = product.images || [];
  const hasImages = images.length > 0;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Use the useInventory hook for stock management
  const {
    // availableQuantity,
    remainingQuantity,
    isOutOfStock,
    getMaxQuantityForCart,
    getStockStatus,
    canAddToCart,
  } = useInventory(product);

  const stockStatus = getStockStatus();

  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    rating = 0,
    reviewCount = 0,
    gender,
    badges = [],
    // inStock = true
  } = product;

  // Add image navigation functions
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickViewClick(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (canAddToCart(quantity)) {
      addToCart(product, quantity);
      console.log(`Added ${quantity} ${product.name} to cart`);
    } else {
      showToast.error(`Sorry, this item is out of stock or you have reached the maximum available quantity`);
      return false;
    }
  };

  const handlePreOrder = (e) => {
    e.stopPropagation();
    onPreOrderClick(product);
  };

  const handleCardClick = () => {
    console.log('Navigate to product detail:', id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} filled={i < fullStars} />
      );
    }
    return stars;
  };

  // Mock description for list view
  const productDescription = "Premium timepiece featuring Swiss movement, water resistance, and elegant design. Perfect for both casual and formal occasions.";

  return (
    <ListCardContainer onClick={handleCardClick}>
      <ImageCarousel>
        {hasImages ? (
          <>
            <ImageContainer
              $currentIndex={currentImageIndex}
              $imageCount={images.length}
            >
              {images.map((image, index) => (
                <ProductImage
                  key={index}
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  $totalImages={images.length}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ))}
            </ImageContainer>

            {images.length > 1 && (
              <>
                <NavButton
                  className="nav-button prev"
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                >
                  <FiChevronLeft />
                </NavButton>
                <NavButton
                  className="nav-button next"
                  onClick={nextImage}
                  disabled={currentImageIndex === images.length - 1}
                >
                  <FiChevronRight />
                </NavButton>

                <ImageIndicators>
                  {images.map((_, index) => (
                    <Indicator
                      key={index}
                      $active={index === currentImageIndex}
                      onClick={(e) => goToImage(index, e)}
                    />
                  ))}
                </ImageIndicators>
              </>
            )}
          </>
        ) : (
          <ImagePlaceholder>⌚</ImagePlaceholder>
        )}

        {badges.length > 0 && (
          <BadgeContainer>
            {badges.map((badge, index) => (
              <Badge key={index} type={badge.type}>
                {badge.text}
              </Badge>
            ))}
          </BadgeContainer>
        )}

        <QuickViewOverlay
          className="quick-view"
          onClick={handleQuickView}
        >
          Quick View
        </QuickViewOverlay>
      </ImageCarousel>

      <ContentSection>
        <div>
          <ProductHeader>
            <ProductBrand>{brand}</ProductBrand>
            <ProductName>{name}</ProductName>
            <ProductDescription>{productDescription}</ProductDescription>
          </ProductHeader>

          {rating > 0 && (
            <RatingContainer>
              <StarRating>
                {renderStars(rating)}
              </StarRating>
              <ReviewCount>({reviewCount} reviews)</ReviewCount>
            </RatingContainer>
          )}

          <GenderTag>{gender}</GenderTag>
        </div>

        <ProductFooter>
          <PriceContainer>
            <CurrentPrice>${price}</CurrentPrice>
            {originalPrice && originalPrice > price && (
              <>
                <OriginalPrice>${originalPrice}</OriginalPrice>
                <Discount>-{discount}%</Discount>
              </>
            )}
          </PriceContainer>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ActionButtons className="action-buttons">
              <ActionButton
                onClick={handleQuickView}
                title="Quick View"
              >
                <FiEye />
              </ActionButton>
              <ActionButton
                onClick={handleWishlistToggle}
                active={isWishlisted}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <FiHeart />
              </ActionButton>
            </ActionButtons>

            {!isOutOfStock ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <QuantitySelector
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  max={getMaxQuantityForCart()}
                  availableQuantity={remainingQuantity}
                  showStockInfo={false}
                  style={{
                    marginBottom: '0.5rem',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                />
                <AddToCartButton
                  onClick={handleAddToCart}
                  disabled={!canAddToCart(quantity)}
                >
                  <FiShoppingCart />
                  {canAddToCart(quantity) ? 'Add to Cart' : 'Max Quantity Reached'}
                </AddToCartButton>
              </div>
            ) : (
              <AddToCartButton
                preOrder
                onClick={handlePreOrder}
              >
                <FiPackage />
                Pre-Order
              </AddToCartButton>
            )}
          </div>
        </ProductFooter>
        {/* Display stock status */}
        <StockStatus
          status={stockStatus.status}
          label={stockStatus.label}
          showIcon={true}
        />
      </ContentSection>
    </ListCardContainer>
  );
};

export default ProductCardList;