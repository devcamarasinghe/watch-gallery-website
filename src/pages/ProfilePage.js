// src/components/pages/ProfilePage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    font-size: 1.1rem;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSection = styled.div`
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
  justify-content: space-between;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.2rem;
  }
  
  div {
    flex: 1;
    
    label {
      display: block;
      font-size: 0.85rem;
      color: ${props => props.theme.colors.textMuted};
      margin-bottom: 0.25rem;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    span {
      font-size: 1rem;
      color: ${props => props.theme.colors.text};
    }
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid ${props => props.theme.colors.border};
      border-radius: 4px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.secondary};
      }
    }
  }
`;

const SaveButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 1rem;
  
  &:hover {
    background: #b8941f;
  }
`;

const CancelButton = styled.button`
  background: none;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || ''
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || ''
      }
    });
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileHeader>
          <h1>Please Sign In</h1>
          <p>You need to be logged in to view your profile</p>
        </ProfileHeader>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </ProfileHeader>

      <ProfileContent>
        <ProfileSection>
          <SectionTitle>
            Personal Information
            <EditButton onClick={isEditing ? handleCancel : handleEdit}>
              {isEditing ? <FiX /> : <FiEdit2 />}
            </EditButton>
          </SectionTitle>

          <InfoItem>
            <FiUser />
            <div>
              <label>First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              ) : (
                <span>{user.firstName}</span>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <FiUser />
            <div>
              <label>Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              ) : (
                <span>{user.lastName}</span>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <FiMail />
            <div>
              <label>Email Address</label>
              <span>{user.email}</span>
            </div>
          </InfoItem>

          <InfoItem>
            <FiPhone />
            <div>
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <span>{user.phone || 'Not provided'}</span>
              )}
            </div>
          </InfoItem>

          {isEditing && (
            <div style={{ marginTop: '1rem' }}>
              <SaveButton onClick={handleSave}>
                <FiSave style={{ marginRight: '0.5rem' }} />
                Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel}>
                Cancel
              </CancelButton>
            </div>
          )}
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>
            Address Information
          </SectionTitle>

          <InfoItem>
            <FiMapPin />
            <div>
              <label>Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                />
              ) : (
                <span>{user.address?.street || 'Not provided'}</span>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <FiMapPin />
            <div>
              <label>City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                />
              ) : (
                <span>{user.address?.city || 'Not provided'}</span>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <FiMapPin />
            <div>
              <label>State</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                />
              ) : (
                <span>{user.address?.state || 'Not provided'}</span>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <FiMapPin />
            <div>
              <label>ZIP Code</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                />
              ) : (
                <span>{user.address?.zipCode || 'Not provided'}</span>
              )}
            </div>
          </InfoItem>
        </ProfileSection>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfilePage;
