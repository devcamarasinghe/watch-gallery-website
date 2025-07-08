// src/components/product/ProductCard.js
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiHeart, FiShoppingCart, FiStar, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useInventory } from '../../hooks/useInventory';
import StockStatus from '../common/StockStatus';
import QuantitySelector from '../common/QuantitySelector';
import { showToast } from '../../utils/toast';

const ActionButtons = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
`;

// Update the ImageCarousel height for larger cards:
const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 260px; // Increased from 220px
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundSecondary} 0%, #f0f0f0 100%);
`;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Update CardContent padding for larger cards:
const CardContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  animation: ${fadeIn} 0.6s ease;
`;

// Update font sizes for larger cards:
const ProductBrand = styled.p`
  font-size: 0.85rem; // Increased from 0.8rem
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.6rem; // Increased from 0.5rem
  font-weight: 600;
`;

const ProductName = styled.h3`
  font-size: 1.2rem; // Increased from 1.1rem
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem; // Increased from 0.8rem
  line-height: 1.3;
  min-height: 2.8rem; // Increased from 2.6rem
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem; // Increased from 1.4rem
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1.1rem; // Increased from 1rem
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #1a1a1a 100%);
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.05rem; // Increased from 1rem
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem; // Increased from 0.5rem
  margin-top: auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 44, 44, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${props => props.theme.colors.textMuted};
  }
  
  ${props => props.$preOrder && `
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    
    &:hover {
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
  `}
`;

const slideIn = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Add to your existing styled components:

const CardContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  &:hover .image-carousel {
    .nav-button {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
  
  &:hover .action-buttons {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover .quick-view {
    transform: translateY(0);
  }
  
  // Better responsive behavior for larger cards
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    &:hover {
      transform: translateY(-4px) scale(1.01); // Less dramatic on mobile
    }
  }
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

const ImagePlaceholder = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$totalImages'].includes(prop)
}).attrs(({ $totalImages }) => ({
  style: {
    width: `${100 / $totalImages}%`
  }
}))`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${props => props.theme.colors.textMuted};
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  flex-shrink: 0;
`;

// Also update the ProductImage component to use transient props:
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

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  width: 32px;
  height: 32px;
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
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 8px;
  }
  
  &.next {
    right: 8px;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
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

const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 3;
`;

const Badge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${slideIn} 0.5s ease;
  
  ${props => props.type === 'sale' && css`
    background: linear-gradient(135deg, ${props.theme.colors.error} 0%, #c53030 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  `}
  
  ${props => props.type === 'new' && css`
    background: linear-gradient(135deg, ${props.theme.colors.success} 0%, #38a169 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  `}
  
  ${props => props.type === 'limited' && css`
    background: linear-gradient(135deg, ${props.theme.colors.secondary} 0%, #b8941f 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
  `}
`;

// Fixed ActionButton - using transient prop $active instead of active
const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$active'].includes(prop)
})`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? props.theme.colors.error : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    transform: scale(1.1);
  }
  
  ${props => props.$active && css`
    animation: ${pulse} 0.6s ease;
  `}
`;

const QuickView = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
  color: white;
  text-align: center;
  padding: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, #b8941f 100%);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  min-height: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FiStar).withConfig({
  shouldForwardProp: (prop) => !['$filled'].includes(prop)
}).attrs(({ $filled, theme }) => ({
  color: $filled ? '#FFD700' : theme.colors.border,
  fill: $filled ? '#FFD700' : 'none'
}))`
  font-size: 0.9rem;
  transition: all 0.2s ease;
`;

const ReviewCount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
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

const GenderTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundSecondary} 0%, #e8e8e8 100%);
  color: ${props => props.theme.colors.text};
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: capitalize;
  align-self: flex-start;
`;

const CardSpacer = styled.div`
  flex-grow: 1;
`;

const ProductCard = ({ product, onPreOrderClick, onQuickViewClick }) => {
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

  // Add inventory hook
  const {
    // availableQuantity,
    remainingQuantity,
    getMaxQuantityForCart,
    isOutOfStock,
    getStockStatus,
    canAddToCart
  } = useInventory(product);

  const stockStatus = getStockStatus();

  const {
    id,
    name,
    brand,
    // price,
    // originalPrice,
    // discount,
    rating = 0,
    reviewCount = 0,
    gender,
    badges = [],
    // inStock = true
  } = product;

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
    onQuickViewClick(product); // Pass product to parent
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} $filled={i < fullStars} />
      );
    }
    return stars;
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageCarousel className="image-carousel">
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
          <ImagePlaceholder $totalImages={1}>
            ⌚
          </ImagePlaceholder>
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

        <ActionButtons className="action-buttons">
          <ActionButton
            onClick={handleWishlistToggle}
            $active={isWishlisted}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart />
          </ActionButton>
        </ActionButtons>

        <QuickView className="quick-view" onClick={handleQuickView}>
          Quick View
        </QuickView>
      </ImageCarousel>

      <CardContent>
        <ProductBrand>{brand}</ProductBrand>
        <ProductName>{name}</ProductName>

        <StockStatus
          status={stockStatus.status}
          label={stockStatus.label}
          showIcon={true}
        />

        {rating > 0 ? (
          <RatingContainer>
            <StarRating>
              {renderStars(rating)}
            </StarRating>
            <ReviewCount>({reviewCount})</ReviewCount>
          </RatingContainer>
        ) : (
          <RatingContainer />
        )}

        <GenderTag>{gender}</GenderTag>

        <PriceContainer>
          <CurrentPrice>${product.price}</CurrentPrice>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <OriginalPrice>${product.originalPrice}</OriginalPrice>
              <Discount>-{product.discount}%</Discount>
            </>
          )}
        </PriceContainer>

        <CardSpacer />

        {!isOutOfStock ? (
          <>
            <QuantitySelector
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={getMaxQuantityForCart()}
              availableQuantity={remainingQuantity}
              showStockInfo={false}
            />
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={!canAddToCart(quantity)}
            >
              <FiShoppingCart />
              {canAddToCart(quantity) ? 'Add to Cart' : 'Max Quantity Reached'}
            </AddToCartButton>
          </>
        ) : (
          <AddToCartButton
            $preOrder
            onClick={handlePreOrder}
          >
            <FiPackage />
            Pre-Order
          </AddToCartButton>
        )}

      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;