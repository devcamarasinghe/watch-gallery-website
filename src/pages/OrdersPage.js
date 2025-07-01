// src/components/pages/OrdersPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiArrowLeft, 
  FiPackage, 
  FiTruck, 
  FiCheck, 
  FiClock,
  FiEye,
  FiRefreshCw,
  FiShoppingCart,
  FiX
} from 'react-icons/fi';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 60vh;
`;

const OrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const OrdersTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 0.6rem 1.2rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.background};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.backgroundSecondary};
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const OrderInfo = styled.div`
  h4 {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.textMuted};
    text-transform: uppercase;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }
  
  p {
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .status-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
  
  .status-processing {
    background: ${props => props.theme.colors.warning};
    color: white;
  }
  
  .status-shipped {
    background: ${props => props.theme.colors.secondary};
    color: white;
  }
  
  .status-delivered {
    background: ${props => props.theme.colors.success};
    color: white;
  }
  
  .status-cancelled {
    background: ${props => props.theme.colors.error};
    color: white;
  }
`;

const OrderContent = styled.div`
  padding: 1.5rem;
`;

const OrderItems = styled.div`
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
    margin-bottom: 0;
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
  
  .item-price {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
`;

const OrderActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &.primary {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    border-color: ${props => props.theme.colors.secondary};
    
    &:hover {
      background: #b8941f;
    }
  }
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  .icon {
    font-size: 4rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const ShopButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #b8941f;
    transform: translateY(-1px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const OrdersPage = ({ onAuthModalOpen }) => {
  const { orders, isLoading, error } = useOrders();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <FiClock className="status-icon status-processing" />;
      case 'shipped':
        return <FiTruck className="status-icon status-shipped" />;
      case 'delivered':
        return <FiCheck className="status-icon status-delivered" />;
      case 'cancelled':
        return <FiX className="status-icon status-cancelled" />;
      default:
        return <FiPackage className="status-icon status-processing" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity);
    });
    alert(`${order.items.length} item(s) added to cart!`);
  };

  const handleTrackOrder = (order) => {
    if (order.trackingNumber) {
      alert(`Tracking Number: ${order.trackingNumber}\n\nIn a real app, this would open the shipping carrier's tracking page.`);
    } else {
      alert('Tracking information is not yet available for this order.');
    }
  };

  if (!isAuthenticated) {
    return (
      <OrdersContainer>
        <OrdersHeader>
          <HeaderLeft>
            <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
              <FiArrowLeft />
              Continue Shopping
            </BackButton>
          </HeaderLeft>
        </OrdersHeader>
        
        <EmptyOrders>
          <div className="icon">🔐</div>
          <h2>Sign In Required</h2>
          <p>Please sign in to view your order history</p>
          <ShopButton onClick={() => onAuthModalOpen && onAuthModalOpen('login')}>
            Sign In
          </ShopButton>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  if (isLoading) {
    return (
      <OrdersContainer>
        <LoadingSpinner>
          <FiRefreshCw />
        </LoadingSpinner>
      </OrdersContainer>
    );
  }

  if (error) {
    return (
      <OrdersContainer>
        <EmptyOrders>
          <div className="icon">⚠️</div>
          <h2>Error Loading Orders</h2>
          <p>{error}</p>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersHeader>
        <HeaderLeft>
          <BackButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
            <FiArrowLeft />
            Continue Shopping
          </BackButton>
          <OrdersTitle>
            <FiPackage />
            My Orders
          </OrdersTitle>
        </HeaderLeft>
      </OrdersHeader>

      <FilterTabs>
        <FilterTab 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          All Orders ({orders.length})
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'processing'} 
          onClick={() => setActiveFilter('processing')}
        >
          Processing ({orders.filter(o => o.status === 'processing').length})
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'shipped'} 
          onClick={() => setActiveFilter('shipped')}
        >
          Shipped ({orders.filter(o => o.status === 'shipped').length})
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'delivered'} 
          onClick={() => setActiveFilter('delivered')}
        >
          Delivered ({orders.filter(o => o.status === 'delivered').length})
        </FilterTab>
      </FilterTabs>

      {filteredOrders.length === 0 ? (
        <EmptyOrders>
          <div className="icon">📦</div>
          <h2>No Orders Found</h2>
          <p>
            {activeFilter === 'all' 
              ? "You haven't placed any orders yet" 
              : `No ${activeFilter} orders found`
            }
          </p>
          <ShopButton onClick={() => window.navigateTo && window.navigateTo('catalog')}>
            Start Shopping
          </ShopButton>
        </EmptyOrders>
      ) : (
        <OrdersList>
          {filteredOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <h4>Order Number</h4>
                  <p>{order.orderNumber}</p>
                </OrderInfo>
                
                <OrderInfo>
                  <h4>Order Date</h4>
                  <p>{formatDate(order.date)}</p>
                </OrderInfo>
                
                <OrderInfo>
                  <h4>Total</h4>
                  <p>${order.total.toFixed(2)}</p>
                </OrderInfo>
                
                <OrderInfo>
                  <h4>Status</h4>
                  <OrderStatus>
                    {getStatusIcon(order.status)}
                    <p>{getStatusText(order.status)}</p>
                  </OrderStatus>
                </OrderInfo>
              </OrderHeader>

              <OrderContent>
                <OrderItems>
                  {order.items.map((item, index) => (
                    <OrderItem key={index}>
                      <ItemImage>⌚</ItemImage>
                      <ItemDetails>
                        <h4>{item.name}</h4>
                        <p>{item.brand}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                      </ItemDetails>
                    </OrderItem>
                  ))}
                </OrderItems>

                <OrderActions>
                  <ActionButton onClick={() => handleTrackOrder(order)}>
                    <FiTruck />
                    Track Order
                  </ActionButton>
                  
                  <ActionButton onClick={() => handleReorder(order)}>
                    <FiShoppingCart />
                    Reorder
                  </ActionButton>
                  
                  <ActionButton className="primary">
                    <FiEye />
                    View Details
                  </ActionButton>
                </OrderActions>
              </OrderContent>
            </OrderCard>
          ))}
        </OrdersList>
      )}
    </OrdersContainer>
  );
};

export default OrdersPage;
