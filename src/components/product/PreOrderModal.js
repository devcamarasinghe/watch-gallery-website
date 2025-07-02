// src/components/product/PreOrderModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiX, FiUser, FiMail, FiPhone, FiMessageCircle, FiPackage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { usePreOrder } from '../../context/PreOrderContext';

// In PreOrderModal.js, update the ModalOverlay:

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999; // Increase z-index to ensure it's on top
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;


const ModalContainer = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: relative;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.text};
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
`;

const ProductInfo = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ProductDetails = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 0.25rem;
  }
  
  .price {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  z-index: 1;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
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

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
`;

const PreOrderNotice = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  h4 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  p {
    color: ${props => props.theme.colors.text};
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const WhatsAppButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  
  &:hover {
    background: #20BA5A;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreOrderModal = ({ isOpen, onClose, product }) => {
    const { user, isAuthenticated } = useAuth();
    const { addPreOrder } = usePreOrder();

    const [formData, setFormData] = useState({
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        phone: user?.phone || '',
        quantity: 1
    });

    const [errors, setErrors] = useState({});

    // WhatsApp business number
    const WHATSAPP_NUMBER = '+1234567890'; // Replace with your WhatsApp Business number

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
Watch: ${product.name}
Brand: ${product.brand}
Price: $${product.price}
Quantity: ${formData.quantity}
Total: $${(product.price * formData.quantity).toFixed(2)}

📋 *Pre-Order Information:*
This is a pre-order request for an out-of-stock item. Please notify the customer when this watch becomes available.

Expected restock: Please provide estimated date
Payment: Will be collected when item is ready to ship

Thank you! 🙏`;

        return encodeURIComponent(message);
    };

    const handlePreOrderSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Add this to prevent event bubbling

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

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !product) return null;

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContainer>
                <ModalHeader>
                    <CloseButton onClick={onClose}>
                        <FiX />
                    </CloseButton>

                    <h2>
                        <FiPackage />
                        Pre-Order Request
                    </h2>
                    <p>
                        This item is currently out of stock. Submit a pre-order request and we'll notify you when it's available.
                    </p>
                </ModalHeader>

                <ModalContent>
                    <ProductInfo>
                        <ProductImage>⌚</ProductImage>
                        <ProductDetails>
                            <h3>{product.name}</h3>
                            <p>{product.brand}</p>
                            <p className="price">${product.price}</p>
                        </ProductDetails>
                    </ProductInfo>

                    <PreOrderNotice>
                        <h4>Pre-Order Information</h4>
                        <p>
                            • No payment required now<br />
                            • We'll contact you when available<br />
                            • Estimated restock: 2-4 weeks<br />
                            • You can cancel anytime before shipping
                        </p>
                    </PreOrderNotice>

                    <Form onSubmit={handlePreOrderSubmit}>
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
                                    placeholder="Enter your email"
                                    className={errors.email ? 'error' : ''}
                                />
                            </InputContainer>
                            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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

                        <FormGroup>
                            <FormLabel>Quantity</FormLabel>
                            <QuantityContainer>
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
                            </QuantityContainer>
                        </FormGroup>

                        <WhatsAppButton type="submit">
                            <FiMessageCircle />
                            Submit Pre-Order Request
                        </WhatsAppButton>
                    </Form>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default PreOrderModal;
