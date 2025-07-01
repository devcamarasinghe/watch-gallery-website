// src/components/common/ImageWithLoading.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ImageWithLoading = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  if (error) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5',
        fontSize: '3rem'
      }}>
        ⌚
      </div>
    );
  }

  return (
    <ImageContainer>
      <LoadingPlaceholder show={!loaded} />
      <Image
        src={src}
        alt={alt}
        loaded={loaded}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </ImageContainer>
  );
};

export default ImageWithLoading;
