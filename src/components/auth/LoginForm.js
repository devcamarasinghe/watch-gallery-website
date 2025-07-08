// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiEye, FiEyeOff, FiMail, FiLock, FiLoader, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// Animations
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FormOverlay = styled.div`
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

const FormContainer = styled.div`
  position: relative;
  max-width: 450px;
  width: 100%;
  max-height: 95vh;
  background: ${props => props.theme.colors.background};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0.5rem;
    max-height: 98vh;
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

const FormContent = styled.div`
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  
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
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1rem;
  margin-bottom: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !['$hasError'].includes(prop)
})`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    background: ${props => props.theme.colors.background};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
  
  &:hover:not(:focus) {
    border-color: ${props => props.theme.colors.textMuted};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${props => props.theme.colors.textMuted};
  z-index: 1;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  
  ${Input}:focus ~ & {
    color: ${props => props.theme.colors.secondary};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background: rgba(212, 175, 55, 0.1);
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
  font-weight: 500;
`;

const SubmitButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$isLoading'].includes(prop)
})`
  padding: 1.2rem 2rem;
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
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 44, 44, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  ${props => props.$isLoading && `
    svg {
      animation: spin 1s linear infinite;
    }
  `}
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin: 0;
    font-size: 0.95rem;
  }
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: #b8941f;
      text-decoration: underline;
    }
  }
`;

const AuthError = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${props => props.theme.colors.error};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const LoginForm = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, isLoading, error, clearError } = useAuth();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

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

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear auth error
    if (error) {
      clearError(); // This will reset the error state
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);

    if (result.success && onClose) {
      onClose();
    }
  };

  return (
    <FormOverlay onClick={handleOverlayClick}>
      <FormContainer onClick={handleFormClick}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <FormContent>
          <FormHeader>
            <FormTitle>Welcome Back</FormTitle>
            <FormSubtitle>Sign in to access your account</FormSubtitle>
          </FormHeader>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Email Address</InputLabel>
              <InputContainer>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  $hasError={!!errors.email}
                />
                <InputIcon>
                  <FiMail />
                </InputIcon>
              </InputContainer>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputContainer>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  $hasError={!!errors.password}
                />
                <InputIcon>
                  <FiLock />
                </InputIcon>
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </PasswordToggle>
              </InputContainer>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputGroup>

            {error && <AuthError>{error}</AuthError>}

            <SubmitButton type="submit" disabled={isLoading} $isLoading={isLoading}>
              {isLoading ? (
                <>
                  <FiLoader />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </SubmitButton>
          </Form>

          <FormFooter>
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
                Sign up here
              </a>
            </p>
          </FormFooter>
        </FormContent>
      </FormContainer>
    </FormOverlay>
  );
};

export default LoginForm;