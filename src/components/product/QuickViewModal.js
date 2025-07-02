// src/components/product/QuickViewModal.js
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  FiX,
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiZoomIn
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

// Update these styled components to fix the issues:

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ModalContainer = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  background: ${props => props.theme.colors.background};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-height: 95vh;
    margin: 1rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundSecondary} 0%, #f0f0f0 100%);
  display: flex;
  flex-direction: column;
  min-height: 500px; // Add minimum height
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px; // Smaller on mobile
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem; // Add padding for better spacing
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto; // Add this
  height: auto; // Add this
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: zoom-in;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 200px; // Set specific width instead of 100%
  height: 200px; // Set specific height instead of 100%
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  color: ${props => props.theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
`;

// Fix thumbnail images
const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? props.theme.colors.secondary : 'transparent'};
  flex-shrink: 0; // Add this to prevent shrinking
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  
  // Custom scrollbar for thumbnails
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 2px;
  }
`;


// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.error};
    color: white;
    transform: scale(1.1);
  }
`;

const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
  pointer-events: none;
`;

const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  pointer-events: all;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: white;
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ThumbnailPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? props.theme.colors.secondary : 'transparent'};
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const BadgeOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 5;
`;

const Badge = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => props.type === 'sale' && `
    background: linear-gradient(135deg, ${props.theme.colors.error} 0%, #c53030 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  `}
  
  ${props => props.type === 'new' && `
    background: linear-gradient(135deg, ${props.theme.colors.success} 0%, #38a169 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  `}
  
  ${props => props.type === 'limited' && `
    background: linear-gradient(135deg, ${props.theme.colors.secondary} 0%, #b8941f 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
  `}
`;

const ProductHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProductBrand = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProductName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FiStar)`
  font-size: 1.1rem;
  color: ${props => props.filled ? '#FFD700' : props.theme.colors.border};
  fill: ${props => props.filled ? '#FFD700' : 'none'};
`;

const ReviewCount = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`;

const PriceSection = styled.div`
  margin-bottom: 2rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.textMuted};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.error};
  font-weight: 700;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.inStock ? props.theme.colors.success : props.theme.colors.error};
`;

const ProductDescription = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.8rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const ProductFeatures = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem 0;
    color: ${props => props.theme.colors.text};
    
    &:before {
      content: '✓';
      color: ${props => props.theme.colors.success};
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
`;

const QuantitySection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.8rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: white;
    border-color: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 50px;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 2;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #1a1a1a 100%);
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 44, 44, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.preOrder && `
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    
    &:hover {
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
  `}
`;

const WishlistButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? props.theme.colors.error : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.active ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.active ? '#dc2626' : props.theme.colors.error};
    color: white;
    border-color: ${props => props.theme.colors.error};
    transform: translateY(-2px);
  }
`;

const ProductInfo = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  
  svg {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.2rem;
  }
  
  span {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const ImageLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  
  svg {
    animation: spin 1s linear infinite;
  }
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  min-height: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr; // Define rows for mobile
    overflow: hidden;
  }
`;

// Update DetailsSection for mobile:
const DetailsSection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  // Custom scrollbar styling
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundSecondary};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #b8941f;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1.5rem;
    overflow-y: auto; // Keep scrolling on mobile
    max-height: 60vh; // Limit height on mobile
  }
`;

const QuickViewModal = ({ isOpen, onClose, product, onPreOrderClick }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false)

  if (!isOpen || !product) return null;

  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    images = [],
    rating = 0,
    reviewCount = 0,
    gender,
    badges = [],
    inStock = true
  } = product;

  const isWishlisted = isInWishlist(id);
  const hasImages = images.length > 0;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (inStock) {
      addToCart(product, quantity);
      onClose();
    }
  };

  const handlePreOrder = () => {
    onPreOrderClick(product);
    onClose();
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
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

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Mock product features and description
  const productFeatures = [
    "Swiss quartz movement",
    "Water resistant to 50m",
    "Scratch-resistant sapphire crystal",
    "Stainless steel case",
    "Genuine leather strap",
    "2-year international warranty"
  ];

  const productDescription = "This elegant timepiece combines classic design with modern functionality. Crafted with precision and attention to detail, it features a sophisticated dial layout and premium materials that ensure both durability and style.";

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={handleModalClick}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <ModalContent>
          {/* Image Section */}
          <ImageSection>

            <MainImageContainer>
              {hasImages ? (
                <>
                  <ImageLoader show={imageLoading}>
                    <FiRefreshCw />
                  </ImageLoader>
                  {!imageError ? (
                    <MainImage
                      src={images[currentImageIndex]}
                      alt={`${name} - View ${currentImageIndex + 1}`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{
                        opacity: imageLoading ? 0 : 1,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  ) : (
                    <ImagePlaceholder>⌚</ImagePlaceholder>
                  )}
                  {images.length > 1 && (
                    <ImageNavigation>
                      <NavButton
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                      >
                        <FiChevronLeft />
                      </NavButton>
                      <NavButton
                        onClick={nextImage}
                        disabled={currentImageIndex === images.length - 1}
                      >
                        <FiChevronRight />
                      </NavButton>
                    </ImageNavigation>
                  )}
                </>
              ) : (
                <ImagePlaceholder>⌚</ImagePlaceholder>
              )}

              {badges.length > 0 && (
                <BadgeOverlay>
                  {badges.map((badge, index) => (
                    <Badge key={index} type={badge.type}>
                      {badge.text}
                    </Badge>
                  ))}
                </BadgeOverlay>
              )}
            </MainImageContainer>


            {hasImages && images.length > 1 && (
              <ThumbnailContainer>
                {images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    active={index === currentImageIndex}
                    onClick={() => goToImage(index)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </ThumbnailContainer>
            )}
          </ImageSection>

          {/* Details Section */}
          <DetailsSection>
            <ProductHeader>
              <ProductBrand>{brand}</ProductBrand>
              <ProductName>{name}</ProductName>

              {rating > 0 && (
                <RatingContainer>
                  <StarRating>
                    {renderStars(rating)}
                  </StarRating>
                  <ReviewCount>({reviewCount} reviews)</ReviewCount>
                </RatingContainer>
              )}
            </ProductHeader>

            <PriceSection>
              <PriceContainer>
                <CurrentPrice>${price}</CurrentPrice>
                {originalPrice && originalPrice > price && (
                  <>
                    <OriginalPrice>${originalPrice}</OriginalPrice>
                    <Discount>-{discount}%</Discount>
                  </>
                )}
              </PriceContainer>
              <StockStatus inStock={inStock}>
                {inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </StockStatus>
            </PriceSection>

            <ProductDescription>
              <h3>Description</h3>
              <p>{productDescription}</p>
            </ProductDescription>

            <ProductFeatures>
              <h3>Features</h3>
              <FeatureList>
                {productFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </FeatureList>
            </ProductFeatures>

            {inStock && (
              <QuantitySection>
                <h3>Quantity</h3>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
              </QuantitySection>
            )}

            <ActionButtons>
              {inStock ? (
                <AddToCartButton onClick={handleAddToCart}>
                  <FiShoppingCart />
                  Add to Cart
                </AddToCartButton>
              ) : (
                <AddToCartButton preOrder onClick={handlePreOrder}>
                  <FiPackage />
                  Pre-Order
                </AddToCartButton>
              )}

              <WishlistButton
                active={isWishlisted}
                onClick={handleWishlistToggle}
              >
                <FiHeart />
                {isWishlisted ? 'Saved' : 'Save'}
              </WishlistButton>
            </ActionButtons>

            <ProductInfo>
              <InfoGrid>
                <InfoItem>
                  <FiTruck />
                  <span>Free shipping over $100</span>
                </InfoItem>
                <InfoItem>
                  <FiShield />
                  <span>2-year warranty</span>
                </InfoItem>
                <InfoItem>
                  <FiRefreshCw />
                  <span>30-day returns</span>
                </InfoItem>
                <InfoItem>
                  <FiZoomIn />
                  <span>Authentic guarantee</span>
                </InfoItem>
              </InfoGrid>
            </ProductInfo>
          </DetailsSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default QuickViewModal;
