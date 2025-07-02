// src/components/layout/Footer.js
import React from 'react';
import styled from 'styled-components';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiTruck
} from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    font-family: ${props => props.theme.fonts.secondary};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: ${props => props.theme.colors.background};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  
  svg {
    margin-right: 0.8rem;
    color: ${props => props.theme.colors.secondary};
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 4px;
  }
`;

const NewsletterButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #b8941f;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 4px;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.2rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.textMuted};
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;

const PaymentIcon = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>

          {/* Quick Links */}
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('catalog'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('catalog'); }}>Men's Watches</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('catalog'); }}>Women's Watches</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Brands</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Sale</a></li>
            </FooterLinks>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection>
            <h3>Customer Service</h3>
            <FooterLinks>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('contact'); }}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Shipping Info</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Returns & Exchanges</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Warranty</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Size Guide</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>FAQ</a></li>
            </FooterLinks>
          </FooterSection>


          {/* Quick Links */}
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><a href="/">Home</a></li>
              <li><a href="/catalog">All Watches</a></li>
              <li><a href="/catalog?gender=men">Men's Watches</a></li>
              <li><a href="/catalog?gender=women">Women's Watches</a></li>
              <li><a href="/brands">Brands</a></li>
              <li><a href="/sale">Sale</a></li>
            </FooterLinks>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection>
            <h3>Customer Service</h3>
            <FooterLinks>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/warranty">Warranty</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
              <li><a href="/faq">FAQ</a></li>
            </FooterLinks>
          </FooterSection>

          {/* Contact & Newsletter */}
          <FooterSection>
            <h3>Get In Touch</h3>
            <ContactInfo>
              <FiPhone />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <FiMail />
              <span>info@watchshop.com</span>
            </ContactInfo>
            <ContactInfo>
              <FiMapPin />
              <span>123 Luxury Ave, New York, NY 10001</span>
            </ContactInfo>

            <h3 style={{ marginTop: '1.5rem' }}>Newsletter</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Subscribe for exclusive offers and new arrivals
            </p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                required
              />
              <NewsletterButton type="submit">
                Subscribe
              </NewsletterButton>
            </NewsletterForm>

            <SocialLinks>
              <SocialIcon href="#" aria-label="Facebook">
                <FiFacebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <FiTwitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <FiInstagram />
              </SocialIcon>
            </SocialLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <div>
            <p>&copy; 2025 LuxWatch. All rights reserved.</p>
            <div style={{ marginTop: '0.5rem' }}>
              <a href="/privacy" style={{ color: 'inherit', marginRight: '1rem' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: 'inherit' }}>Terms of Service</a>
            </div>
          </div>

          <PaymentMethods>
            <span>We Accept:</span>
            <PaymentIcon>VISA</PaymentIcon>
            <PaymentIcon>MC</PaymentIcon>
            <PaymentIcon>AMEX</PaymentIcon>
            <PaymentIcon>PAYPAL</PaymentIcon>
          </PaymentMethods>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
