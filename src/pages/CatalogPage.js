// src/components/pages/CatalogPage.js
import React, { useState, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { useProductFilter } from '../hooks/useProductFilter';
import { useFilter } from '../context/FilterContext';
import PreOrderModal from '../components/product/PreOrderModal';
import QuickViewModal from '../components/product/QuickViewModal';
import Pagination from '../components/common/Pagination';
import { usePaginatedProducts } from '../hooks/usePaginatedProducts';

// Styled components remain exactly the same
const CatalogContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  gap: 1.2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CatalogControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ViewModeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ViewButton = styled.button.attrs(({ $active }) => ({
  'data-active': $active
}))`
  padding: 0.7rem 1rem;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.$active ? props.theme.colors.background : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  min-width: 44px;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  }
  
  &:first-child {
    border-right: 1px solid ${props => props.theme.colors.border};
  }
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
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

const CatalogPageContent = memo(({ products }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [preOrderModal, setPreOrderModal] = useState({ isOpen: false, product: null });
  const [quickViewModal, setQuickViewModal] = useState({ isOpen: false, product: null });

  const { sortBy, setSortBy, resetFilters } = useFilter();

  // First get filtered products using the hook directly
  const filteredProducts = useProductFilter(products);

  // Then memoize the result to prevent recalculations
  const memoizedFilteredProducts = useMemo(() => filteredProducts, [filteredProducts]);

  const { paginatedProducts } = usePaginatedProducts(memoizedFilteredProducts);

  // Memoize brands calculation
  const brands = useMemo(() => {
    return [...new Set(products.map(product => product.brand))].sort();
  }, [products]);

  // Memoize all event handlers
  const handleQuickViewClick = useCallback((product) => {
    setQuickViewModal({ isOpen: true, product });
  }, []);

  const handleQuickViewClose = useCallback(() => {
    setQuickViewModal({ isOpen: false, product: null });
  }, []);

  const handlePreOrderClick = useCallback((product) => {
    setPreOrderModal({ isOpen: true, product });
  }, []);

  const handlePreOrderClose = useCallback(() => {
    setPreOrderModal({ isOpen: false, product: null });
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, [setSortBy]);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  // Memoize the main content to prevent unnecessary re-renders
  const memoizedContent = useMemo(() => (
    <>
      <CatalogContainer>
        <Sidebar>
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={handleSidebarClose}
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
              <FilterButton onClick={handleSidebarToggle}>
                <FiFilter />
                Filters
              </FilterButton>

              <SortSelect
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </SortSelect>

              <ViewModeIndicator>
                View:
              </ViewModeIndicator>

              <ViewToggle>
                <ViewButton
                  $active={viewMode === 'grid'}
                  onClick={() => handleViewModeChange('grid')}
                  title="Grid View"
                >
                  <FiGrid />
                </ViewButton>
                <ViewButton
                  $active={viewMode === 'list'}
                  onClick={() => handleViewModeChange('list')}
                  title="List View"
                >
                  <FiList />
                </ViewButton>
                {/* <FiList /> */}
              </ViewToggle>
            </CatalogControls>
          </CatalogHeader>

          {filteredProducts.length > 0 ? (
            <div>
              <ProductGrid
                products={paginatedProducts}
                onPreOrderClick={handlePreOrderClick}
                onQuickViewClick={handleQuickViewClick}
                viewMode={viewMode}
              />
              <Pagination />
            </div>
          ) : (
            <NoResults>
              <h3>No watches found</h3>
              <p>Try adjusting your filters to see more results</p>
              <ClearFiltersButton onClick={handleResetFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </NoResults>
          )}
        </MainContent>
      </CatalogContainer >

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
  ), [
    isSidebarOpen,
    viewMode,
    sortBy,
    filteredProducts,
    paginatedProducts,
    brands,
    preOrderModal,
    quickViewModal,
    handleSidebarClose,
    handleSidebarToggle,
    handleSortChange,
    handleViewModeChange,
    handlePreOrderClick,
    handleQuickViewClick,
    handleResetFilters,
    handlePreOrderClose,
    handleQuickViewClose
  ]);

  return memoizedContent;
});

// Main component with proper memoization
const CatalogPage = memo(({ products }) => {
  return <CatalogPageContent products={products} />;
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.products) === JSON.stringify(nextProps.products);
});

CatalogPage.displayName = 'CatalogPage';
export default CatalogPage;