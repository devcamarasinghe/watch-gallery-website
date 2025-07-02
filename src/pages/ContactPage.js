// src/components/pages/ContactPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend, 
  FiUser,
  FiMessageSquare,
  FiLoader
} from 'react-icons/fi';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContactHeader = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.background};
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.6;
  }
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
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
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  position: relative;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const FormSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const InputWithIcon = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textMuted};
    z-index: 1;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
`;

const SubmitButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background: #b8941f;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with real form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactHeader>
        <HeaderTitle>Get In Touch</HeaderTitle>
        <HeaderSubtitle>
          Have questions about our watches or need assistance? We're here to help! 
          Reach out to our expert team for personalized service.
        </HeaderSubtitle>
      </ContactHeader>

      <ContactContent>
        <ContactInfo>
          <InfoTitle>Contact Information</InfoTitle>
          
          <InfoItem>
            <InfoIcon>
              <FiPhone />
            </InfoIcon>
            <InfoContent>
              <h3>Phone</h3>
              <p>
                <a href="tel:+15551234567">+1 (555) 123-4567</a><br />
                Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                Saturday: 10:00 AM - 4:00 PM EST
              </p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiMail />
            </InfoIcon>
            <InfoContent>
              <h3>Email</h3>
              <p>
                General: <a href="mailto:info@watchshop.com">info@watchshop.com</a><br />
                Support: <a href="mailto:support@watchshop.com">support@watchshop.com</a><br />
                Sales: <a href="mailto:sales@watchshop.com">sales@watchshop.com</a>
              </p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiMapPin />
            </InfoIcon>
            <InfoContent>
              <h3>Address</h3>
              <p>
                123 Luxury Avenue<br />
                New York, NY 10001<br />
                United States
              </p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiClock />
            </InfoIcon>
            <InfoContent>
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed<br />
                <em>All times Eastern Standard Time</em>
              </p>
            </InfoContent>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send Us a Message</FormTitle>
          
          {isSubmitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you within 24 hours.
            </SuccessMessage>
          )}
          
          <FormGrid>
            <FormGroup>
              <FormLabel>First Name *</FormLabel>
              <InputWithIcon>
                <FiUser />
                <FormInput
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className={errors.firstName ? 'error' : ''}
                />
              </InputWithIcon>
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Last Name *</FormLabel>
              <InputWithIcon>
                <FiUser />
                <FormInput
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className={errors.lastName ? 'error' : ''}
                />
              </InputWithIcon>
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <FormLabel>Email Address *</FormLabel>
              <InputWithIcon>
                <FiMail />
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error' : ''}
                />
              </InputWithIcon>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              <InputWithIcon>
                <FiPhone />
                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
              </InputWithIcon>
            </FormGroup>
          </FormGrid>

          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <FormLabel>Subject</FormLabel>
            <FormSelect
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="general">General Inquiry</option>
              <option value="product">Product Question</option>
              <option value="order">Order Support</option>
              <option value="return">Returns & Exchanges</option>
              <option value="warranty">Warranty Claim</option>
              <option value="partnership">Business Partnership</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Message *</FormLabel>
            <FormTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help you..."
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FiLoader className="spin" />
                Sending...
              </>
            ) : (
              <>
                <FiSend />
                Send Message
              </>
            )}
          </SubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactPage;
