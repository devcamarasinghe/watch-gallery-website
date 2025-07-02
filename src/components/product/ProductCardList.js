// src/components/product/ProductCardList.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiPackage } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ListCardContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover .action-buttons {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.backgroundSecondary};
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 120px;
    height: 120px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ListCardContainer}:hover & {
    transform: scale(1.05);
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
  
  const isWishlisted = isInWishlist(product.id);
  const images = product.images || [];
  const hasImages = images.length > 0;

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
    inStock = true
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
    onQuickViewClick(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (inStock) {
      addToCart(product, 1);
      console.log(`Added ${name} to cart`);
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
      <ImageSection>
        {hasImages ? (
          <ProductImage
            src={images[0]}
            alt={name}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
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
      </ImageSection>
      
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
            
            {inStock ? (
              <AddToCartButton onClick={handleAddToCart}>
                <FiShoppingCart />
                Add to Cart
              </AddToCartButton>
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
      </ContentSection>
    </ListCardContainer>
  );
};

export default ProductCardList;