// src/components/product/ProductCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CardContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundSecondary};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  color: ${props => props.theme.colors.textMuted};
  font-size: 3rem;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Badge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => props.type === 'sale' && `
    background: ${props.theme.colors.error};
    color: white;
  `}
  
  ${props => props.type === 'new' && `
    background: ${props.theme.colors.success};
    color: white;
  `}
  
  ${props => props.type === 'limited' && `
    background: ${props.theme.colors.secondary};
    color: white;
  `}
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    transform: scale(1.1);
  }
  
  ${props => props.active && `
    background: ${props.theme.colors.error};
    color: white;
  `}
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FiStar)`
  font-size: 0.9rem;
  color: ${props => props.filled ? props.theme.colors.secondary : props.theme.colors.border};
  fill: ${props => props.filled ? props.theme.colors.secondary : 'none'};
`;

const ReviewCount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.error};
  font-weight: 600;
`;

const GenderTag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart(); // Add this line

  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    image,
    rating = 0,
    reviewCount = 0,
    gender,
    badges = [],
    inStock = true
  } = product;

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    console.log('Quick view for product:', id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product, 1);
      // Optional: Show success message
      console.log(`Added ${product.name} to cart`);
    }
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

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageContainer>
        {image ? (
          <ProductImage src={image} alt={name} />
        ) : (
          <ImagePlaceholder>
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

        <ActionButtons>
          <ActionButton
            onClick={handleWishlistToggle}
            active={isWishlisted}
            title="Add to Wishlist"
          >
            <FiHeart />
          </ActionButton>
          <ActionButton
            onClick={handleQuickView}
            title="Quick View"
          >
            <FiEye />
          </ActionButton>
        </ActionButtons>
      </ImageContainer>

      <CardContent>
        <ProductBrand>{brand}</ProductBrand>
        <ProductName>{name}</ProductName>

        {rating > 0 && (
          <RatingContainer>
            <StarRating>
              {renderStars(rating)}
            </StarRating>
            <ReviewCount>({reviewCount})</ReviewCount>
          </RatingContainer>
        )}

        <GenderTag>{gender}</GenderTag>

        <PriceContainer>
          <CurrentPrice>${price}</CurrentPrice>
          {originalPrice && originalPrice > price && (
            <>
              <OriginalPrice>${originalPrice}</OriginalPrice>
              <Discount>-{discount}%</Discount>
            </>
          )}
        </PriceContainer>

        <AddToCartButton
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <FiShoppingCart />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </AddToCartButton>
      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;
