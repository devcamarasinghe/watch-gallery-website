// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.8rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const CheckboxGroup = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
  
  input {
    margin-top: 0.2rem;
  }
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
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

const FormLinks = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterForm = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, isLoading, error, clearError } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error
    if (error) {
      clearError();
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
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await register(formData);
    
    if (result.success && onClose) {
      onClose();
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create Account</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <InputRow>
          <InputGroup>
            <InputLabel>First Name</InputLabel>
            <InputContainer>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className={errors.firstName ? 'error' : ''}
              />
            </InputContainer>
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputLabel>Last Name</InputLabel>
            <InputContainer>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className={errors.lastName ? 'error' : ''}
              />
            </InputContainer>
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </InputGroup>
        </InputRow>

        <InputGroup>
          <InputLabel>Email Address</InputLabel>
          <InputContainer>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
          </InputContainer>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <InputLabel>Phone Number (Optional)</InputLabel>
          <InputContainer>
            <InputIcon>
              <FiPhone />
            </InputIcon>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </InputContainer>
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <InputContainer>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputContainer>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <InputLabel>Confirm Password</InputLabel>
          <InputContainer>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputContainer>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </InputGroup>

        <CheckboxGroup>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <span>Subscribe to our newsletter for exclusive offers and updates</span>
        </CheckboxGroup>

        <CheckboxGroup>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <span>
            I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </span>
        </CheckboxGroup>
        {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <FiLoader className="spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </SubmitButton>
      </Form>

      <FormLinks>
        <p>
          Already have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
            Sign in here
          </a>
        </p>
      </FormLinks>
    </FormContainer>
  );
};

export default RegisterForm;
