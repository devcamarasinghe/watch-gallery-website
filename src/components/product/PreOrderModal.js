// src/components/product/PreOrderModal.js
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageCircle, 
  FiPackage,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTruck,
  FiShield,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { usePreOrder } from '../../context/PreOrderContext';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  min-height: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow: hidden;
  }
`;

const ProductSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundSecondary} 0%, #f0f0f0 100%);
  display: flex;
  flex-direction: column;
  min-height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 12px;
`;

const ImagePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  color: ${props => props.theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
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

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  
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

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? props.theme.colors.secondary : 'transparent'};
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
  color: white;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ProductBrand = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  .current-price {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${props => props.theme.colors.secondary};
  }
  
  .original-price {
    font-size: 1.1rem;
    opacity: 0.7;
    text-decoration: line-through;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FiStar)`
  font-size: 0.9rem;
  color: ${props => props.filled ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'};
  fill: ${props => props.filled ? '#FFD700' : 'none'};
`;

const FormSection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
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
    max-height: 60vh;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  font-size: 1rem;
`;

const PreOrderNotice = styled.div`
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
  border: 2px solid ${props => props.theme.colors.warning};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: ${pulse} 2s ease-in-out infinite;
  
  h4 {
    color: ${props => props.theme.colors.warning};
    margin-bottom: 0.8rem;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      color: ${props => props.theme.colors.text};
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      &:before {
        content: '✓';
        color: ${props => props.theme.colors.success};
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.background};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${props => props.theme.colors.textMuted};
  z-index: 1;
  font-size: 1.1rem;
`;

const QuantitySection = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 1rem;
  border-radius: 12px;
`;

const QuantityButton = styled.button`
  width: 44px;
  height: 44px;
  border: 2px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: white;
    border-color: ${props => props.theme.colors.secondary};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 60px;
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
  font-weight: 500;
`;

const WhatsAppButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
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
    background: linear-gradient(135deg, #20BA5A 0%, #1ea854 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  
  svg {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  span {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
    line-height: 1.3;
  }
`;

const PreOrderModal = ({ isOpen, onClose, product }) => {
  const { user, isAuthenticated } = useAuth();
  const { addPreOrder } = usePreOrder();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    quantity: 1
  });
  
  const [errors, setErrors] = useState({});

  // WhatsApp business number
  const WHATSAPP_NUMBER = '+1234567890'; // Replace with your WhatsApp Business number

  if (!isOpen || !product) return null;

  const {
    name,
    brand,
    price,
    originalPrice,
    discount,
    images = [],
    rating = 0,
    reviewCount = 0
  } = product;

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, formData.quantity + change);
    setFormData(prev => ({
      ...prev,
      quantity: newQuantity
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePreOrderMessage = () => {
    const preOrderNumber = `PRE${Date.now()}`;
    
    const message = `🔔 *Pre-Order Request - ${preOrderNumber}*

👤 *Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

⌚ *Product Details:*
Watch: ${name}
Brand: ${brand}
Price: $${price}
Quantity: ${formData.quantity}
Total: $${(price * formData.quantity).toFixed(2)}

📋 *Pre-Order Information:*
This is a pre-order request for an out-of-stock item. Please notify the customer when this watch becomes available.

Expected restock: Please provide estimated date
Payment: Will be collected when item is ready to ship

Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handlePreOrderSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!validateForm()) return;
    
    // Add to pre-orders if user is authenticated
    if (isAuthenticated) {
      const preOrderData = {
        product: product,
        quantity: formData.quantity,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      };
      
      addPreOrder(preOrderData);
    }
    
    // Generate WhatsApp message
    const message = generatePreOrderMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    onClose();
    
    // Show success message
    alert('Pre-order request sent! We will contact you when this watch is back in stock.');
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
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={handleModalClick}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <ModalContent>
          {/* Product Section */}
          <ProductSection>
            <ProductImageContainer>
              {hasImages ? (
                <>
                  <ProductImage
                    src={images[currentImageIndex]}
                    alt={`${name} - View ${currentImageIndex + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
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
            </ProductImageContainer>

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

            <ProductInfo>
              <ProductBrand>{brand}</ProductBrand>
              <ProductName>{name}</ProductName>
              <ProductPrice>
                <span className="current-price">${price}</span>
                {originalPrice && originalPrice > price && (
                  <span className="original-price">${originalPrice}</span>
                )}
              </ProductPrice>
              {rating > 0 && (
                <RatingContainer>
                  <StarRating>
                    {renderStars(rating)}
                  </StarRating>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    ({reviewCount} reviews)
                  </span>
                </RatingContainer>
              )}
            </ProductInfo>
          </ProductSection>

          {/* Form Section */}
          <FormSection>
            <FormHeader>
              <FormTitle>
                <FiPackage />
                Pre-Order Request
              </FormTitle>
              <FormSubtitle>
                This item is currently out of stock. Submit a pre-order request and we'll notify you when it's available.
              </FormSubtitle>
            </FormHeader>

            <PreOrderNotice>
              <h4>
                <FiAlertCircle />
                Pre-Order Benefits
              </h4>
              <ul>
                <li>No payment required now</li>
                <li>Priority notification when available</li>
                <li>Estimated restock: 2-4 weeks</li>
                <li>Cancel anytime before shipping</li>
                <li>Same price guarantee</li>
              </ul>
            </PreOrderNotice>

            <Form onSubmit={handlePreOrderSubmit}>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FiUser />
                    </InputIcon>
                    <FormInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.name ? 'error' : ''}
                    />
                  </InputContainer>
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number *</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FiPhone />
                    </InputIcon>
                    <FormInput
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className={errors.phone ? 'error' : ''}
                    />
                  </InputContainer>
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <InputContainer>
                  <InputIcon>
                    <FiMail />
                  </InputIcon>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={errors.email ? 'error' : ''}
                  />
                </InputContainer>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <QuantitySection>
                <h3>Quantity</h3>
                <QuantityControls>
                  <QuantityButton 
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={formData.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{formData.quantity}</QuantityDisplay>
                  <QuantityButton 
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
              </QuantitySection>

              <WhatsAppButton type="submit">
                <FiMessageCircle />
                Submit Pre-Order Request
              </WhatsAppButton>

              <TrustIndicators>
                <TrustItem>
                  <FiTruck />
                  <span>Free shipping when available</span>
                </TrustItem>
                <TrustItem>
                  <FiShield />
                  <span>Secure & authentic</span>
                </TrustItem>
                <TrustItem>
                  <FiClock />
                  <span>Quick notification</span>
                </TrustItem>
              </TrustIndicators>
            </Form>
          </FormSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PreOrderModal;