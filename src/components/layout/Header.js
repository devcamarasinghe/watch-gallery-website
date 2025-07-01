// src/components/layout/Header.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiLogOut } from 'react-icons/fi';
import { useFilter } from '../../context/FilterContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

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

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.secondary};
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textMuted};
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &:last-child {
    border-top: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.error};
  }
`;

const WishlistButton = styled(IconButton)`
  ${props => props.hasItems && `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: ${props.theme.colors.error};
      border-radius: 50%;
    }
  `}
`;

const Header = ({ onAuthModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const {
    searchQuery,
    selectedGender,
    setSearchQuery,
    setGender
  } = useFilter();

  const { itemCount, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      toggleUserMenu();
    } else {
      onAuthModalOpen('login');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Mock wishlist count - replace with real data later
  const wishlistCount = user?.wishlist?.length || 0;

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => window.navigateTo && window.navigateTo('catalog')}>
          Watch<span>Shop</span>
        </Logo>

        <Navigation isOpen={isMenuOpen}>
          <NavLink onClick={() => { window.navigateTo && window.navigateTo('catalog'); setIsMenuOpen(false); }}>
            Home
          </NavLink>
          <NavLink onClick={() => { window.navigateTo && window.navigateTo('catalog'); setIsMenuOpen(false); }}>
            Catalog
          </NavLink>

          <GenderFilter
            value={selectedGender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="all">All Watches</option>
            <option value="men">Men's Watches</option>
            <option value="women">Women's Watches</option>
            <option value="unisex">Unisex</option>
          </GenderFilter>

          <NavLink onClick={() => { window.navigateTo && window.navigateTo('about'); setIsMenuOpen(false); }}>
            About
          </NavLink>
          <NavLink onClick={() => { window.navigateTo && window.navigateTo('contact'); setIsMenuOpen(false); }}>
            Contact
          </NavLink>
        </Navigation>

        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search watches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <HeaderActions>
          {/* Wishlist - only show for authenticated users */}
          {isAuthenticated && (
            <WishlistButton hasItems={wishlistCount > 0} title="Wishlist">
              <FiHeart />
            </WishlistButton>
          )}

          {/* Shopping Cart */}
          <IconButton onClick={toggleCart} title="Shopping Cart">
            <FiShoppingCart />
            {itemCount > 0 && (
              <CartBadge>{itemCount}</CartBadge>
            )}
          </IconButton>

          {/* User Menu */}
          <UserMenu>
            <UserButton onClick={handleAuthClick} title={isAuthenticated ? 'Account' : 'Sign In'}>
              <FiUser />
              {isAuthenticated && (
                <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                  {user.firstName}
                </span>
              )}
            </UserButton>

            {isAuthenticated && (
              <UserDropdown isOpen={isUserMenuOpen}>
                <UserInfo>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>{user.email}</p>
                </UserInfo>

                <DropdownItem onClick={() => { setIsUserMenuOpen(false); /* Navigate to profile */ }}>
                  <FiUser />
                  My Profile
                </DropdownItem>

                <DropdownItem onClick={() => { setIsUserMenuOpen(false); /* Navigate to orders */ }}>
                  <FiShoppingCart />
                  My Orders
                </DropdownItem>

                <DropdownItem onClick={() => { setIsUserMenuOpen(false); /* Navigate to wishlist */ }}>
                  <FiHeart />
                  Wishlist ({wishlistCount})
                </DropdownItem>

                <DropdownItem onClick={handleLogout}>
                  <FiLogOut />
                  Sign Out
                </DropdownItem>
              </UserDropdown>
            )}
          </UserMenu>

          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
