// src/components/pages/CatalogPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { useProductFilter } from '../hooks/useProductFilter';
import { useFilter } from '../context/FilterContext';
import PreOrderModal from '../components/product/PreOrderModal';
import QuickViewModal from '../components/product/QuickViewModal';

// Update the layout to give more space to products:

const CatalogContainer = styled.div`
  max-width: 1400px; // Increased from 1200px
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  gap: 1.2rem; // Reduced from 1.5rem
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Sidebar = styled.aside`
  flex: 0 0 200px; // Reduced from 240px
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

const CatalogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem; // Reduced from 1.5rem
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsInfo = styled.div`
  h2 {
    font-size: 1.5rem; // Reduced from 1.6rem
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.2rem; // Reduced from 0.3rem
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    font-size: 0.85rem; // Reduced from 0.9rem
  }
`;

const CatalogControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortSelect = styled.select`
  padding: 0.6rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const FilterButton = styled.button`
  display: none;
  padding: 0.6rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 0.6rem;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h3 {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: 2rem;
  }
`;

const ClearFiltersButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
`;

const CatalogPage = ({ products }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [preOrderModal, setPreOrderModal] = useState({ isOpen: false, product: null });
  const [quickViewModal, setQuickViewModal] = useState({ isOpen: false, product: null }); // Add this state

  const { sortBy, setSortBy, resetFilters } = useFilter();
  const filteredProducts = useProductFilter(products);

  // Get unique brands for filter
  const brands = [...new Set(products.map(product => product.brand))].sort();

  const handleQuickViewClick = (product) => {
    setQuickViewModal({ isOpen: true, product });
  };

  const handleQuickViewClose = () => {
    setQuickViewModal({ isOpen: false, product: null });
  };

  // Add this handler
  const handlePreOrderClick = (product) => {
    setPreOrderModal({ isOpen: true, product });
  };

  const handlePreOrderClose = () => {
    setPreOrderModal({ isOpen: false, product: null });
  };

  return (
    <>
      <CatalogContainer>
        <Sidebar>
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            brands={brands}
          />
        </Sidebar>

        <MainContent>
          <CatalogHeader>
            <ResultsInfo>
              <h2>Watch Collection</h2>
              <p>{filteredProducts.length} watches found</p>
            </ResultsInfo>

            <CatalogControls>
              <FilterButton onClick={() => setIsSidebarOpen(true)}>
                <FiFilter />
                Filters
              </FilterButton>

              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </SortSelect>

              <ViewToggle>
                <ViewButton
                  active={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </ViewButton>
                <ViewButton
                  active={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </ViewButton>
              </ViewToggle>
            </CatalogControls>
          </CatalogHeader>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts}
              onPreOrderClick={handlePreOrderClick}
              onQuickViewClick={handleQuickViewClick} // Add this prop
            />
          ) : (
            <NoResults>
              <h3>No watches found</h3>
              <p>Try adjusting your filters to see more results</p>
              <ClearFiltersButton onClick={resetFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </NoResults>
          )}
        </MainContent>
      </CatalogContainer>
      {/* Add PreOrderModal at the end, outside the main container */}
      <PreOrderModal
        isOpen={preOrderModal.isOpen}
        onClose={handlePreOrderClose}
        product={preOrderModal.product}
      />

      <QuickViewModal
        isOpen={quickViewModal.isOpen}
        onClose={handleQuickViewClose}
        product={quickViewModal.product}
        onPreOrderClick={handlePreOrderClick}
      />

    </>
  );
};

export default CatalogPage;
