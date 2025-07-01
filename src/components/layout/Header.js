// src/components/layout/Header.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  
  span {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.background};
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const GenderFilter = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 25px;
  width: 250px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  font-size: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.secondary};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemCount = 3; // This will come from state management later

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* Logo */}
        <Logo>
          Watch<span>Shop</span>
        </Logo>

        {/* Navigation */}
        <Navigation isOpen={isMenuOpen}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/catalog">Catalog</NavLink>
          <NavLink href="/brands">Brands</NavLink>
          
          {/* Gender Filter Dropdown */}
          <GenderFilter 
            value={selectedGender} 
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="all">All Watches</option>
            <option value="men">Men's Watches</option>
            <option value="women">Women's Watches</option>
            <option value="unisex">Unisex</option>
          </GenderFilter>
          
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </Navigation>

        {/* Search Bar */}
        <SearchContainer>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="Search watches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        {/* Header Actions */}
        <HeaderActions>
          <IconButton>
            <FiUser />
          </IconButton>
          
          <IconButton>
            <FiShoppingCart />
            {cartItemCount > 0 && (
              <CartBadge>{cartItemCount}</CartBadge>
            )}
          </IconButton>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
