// src/components/pages/CheckoutPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiMessageCircle,
  FiCreditCard,
  FiAlertCircle
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 60vh;
`;

const CheckoutHeader = styled.div`
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

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const FormInput = styled.input`
  padding: 0.8rem;
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

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
`;

const OrderSummary = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
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

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 1.5rem;
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
  
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 0.25rem;
  }
  
  .price {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  
  &.total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${props => props.theme.colors.border};
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const PaymentNotice = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    margin-bottom: 0.8rem;
  }
  
  .whatsapp-number {
    font-weight: 600;
    color: ${props => props.theme.colors.secondary};
    font-size: 1.1rem;
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

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState('');

  // WhatsApp business number - replace with your actual number
  const WHATSAPP_NUMBER = '+1234567890'; // Replace with your WhatsApp Business number

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `WS${timestamp}${random}`;
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const orderNum = orderNumber || generateOrderNumber();
    setOrderNumber(orderNum);
    
    const itemsList = items.map(item => 
      `• ${item.name} (${item.brand}) - Qty: ${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');
    
    const message = `🛒 *New Watch Order - ${orderNum}*

👤 *Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

📍 *Shipping Address:*
${formData.address}
${formData.city}, ${formData.state} ${formData.zipCode}

🕐 *Order Items:*
${itemsList}

💰 *Order Total: $${total.toFixed(2)}*

${formData.notes ? `📝 *Notes:* ${formData.notes}` : ''}

Please confirm this order and provide bank transfer details for payment.

Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Optional: Clear cart after successful order
    // clearCart();
    
    // Optional: Show success message or redirect
    alert('Order sent via WhatsApp! We will contact you shortly with payment details.');
  };

  if (items.length === 0) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
            <FiArrowLeft />
            Continue Shopping
          </BackButton>
        </CheckoutHeader>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Your cart is empty</h2>
          <p>Add some watches to proceed with checkout</p>
        </div>
      </CheckoutContainer>
    );
  }

  const subtotal = total;
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <BackButton onClick={() => window.history.back()}>
          <FiArrowLeft />
          Back to Cart
        </BackButton>
        <h1>Checkout</h1>
      </CheckoutHeader>

      <CheckoutContent>
        <CheckoutForm onSubmit={handleWhatsAppOrder}>
          {/* Customer Information */}
          <FormSection>
            <SectionTitle>
              <FiUser />
              Customer Information
            </SectionTitle>
            
            <FormGrid>
              <FormGroup>
                <FormLabel>First Name *</FormLabel>
                <FormInput
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Last Name *</FormLabel>
                <FormInput
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
            </FormGrid>
            
            <FormGrid>
              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
            </FormGrid>
          </FormSection>

          {/* Shipping Address */}
          <FormSection>
            <SectionTitle>
              <FiMapPin />
              Shipping Address
            </SectionTitle>
            
            <FormGroup style={{ marginBottom: '1rem' }}>
              <FormLabel>Street Address *</FormLabel>
              <FormInput
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>
            
            <FormGrid>
              <FormGroup>
                <FormLabel>City *</FormLabel>
                <FormInput
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>State *</FormLabel>
                <FormInput
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
              </FormGroup>
            </FormGrid>
            
            <FormGroup>
              <FormLabel>ZIP Code *</FormLabel>
              <FormInput
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={errors.zipCode ? 'error' : ''}
                style={{ maxWidth: '200px' }}
              />
              {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
            </FormGroup>
          </FormSection>

          {/* Order Notes */}
          <FormSection>
            <SectionTitle>
              Order Notes (Optional)
            </SectionTitle>
            <FormGroup>
              <FormTextarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or notes for your order..."
              />
            </FormGroup>
          </FormSection>
        </CheckoutForm>

        {/* Order Summary */}
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {items.map(item => (
            <OrderItem key={item.id}>
              <ItemImage>⌚</ItemImage>
              <ItemDetails>
                <h4>{item.name}</h4>
                <p>{item.brand}</p>
                <p>Qty: {item.quantity}</p>
                <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
              </ItemDetails>
            </OrderItem>
          ))}
          
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
          <SummaryRow className="total">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </SummaryRow>
          
          {/* Payment Notice */}
          <PaymentNotice>
            <h4>
              <FiAlertCircle />
              Payment Method
            </h4>
            <p>
              We currently accept <strong>Bank Transfer</strong> payments only. 
              After placing your order via WhatsApp, we'll provide you with our 
              bank details for payment.
            </p>
            <p>
              WhatsApp: <span className="whatsapp-number">{WHATSAPP_NUMBER}</span>
            </p>
          </PaymentNotice>
          
          <WhatsAppButton type="submit" onClick={handleWhatsAppOrder}>
            <FiMessageCircle />
            Place Order via WhatsApp
          </WhatsAppButton>
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
