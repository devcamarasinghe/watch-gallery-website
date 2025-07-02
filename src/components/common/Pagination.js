// src/components/common/Pagination.js
import React from 'react';
import styled from 'styled-components';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronsLeft, 
  FiChevronsRight 
} from 'react-icons/fi';
import { usePagination } from '../../context/PaginationContext';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PaginationTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ResultsInfo = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.9rem;
  
  strong {
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }
`;

const ItemsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const ItemsPerPageSelect = styled.select`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '500'};
  
  &:hover:not(:disabled) {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
    color: ${props => props.active ? props.theme.colors.background : props.theme.colors.background};
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

const PageEllipsis = styled.span`
  padding: 0 0.5rem;
  color: ${props => props.theme.colors.textMuted};
  font-weight: 500;
`;

const MobilePageInfo = styled.div`
  display: none;
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.9rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    setCurrentPage,
    setItemsPerPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage
  } = usePagination();

  const itemsPerPageOptions = [6, 12, 24, 48];

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };

  const displayedItems = Math.min(endIndex, totalItems);

  if (totalItems === 0) return null;

  return (
    <PaginationContainer>
      <PaginationTop>
        <ResultsInfo>
          Showing <strong>{startIndex + 1}</strong> to <strong>{displayedItems}</strong> of{' '}
          <strong>{totalItems}</strong> watches
        </ResultsInfo>
        
        <ItemsPerPageContainer>
          <label>Show:</label>
          <ItemsPerPageSelect
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </ItemsPerPageSelect>
        </ItemsPerPageContainer>
      </PaginationTop>

      {totalPages > 1 && (
        <>
          <PaginationControls>
            {/* First Page */}
            <PaginationButton
              onClick={goToFirstPage}
              disabled={!hasPrevPage}
              title="First Page"
            >
              <FiChevronsLeft />
            </PaginationButton>

            {/* Previous Page */}
            <PaginationButton
              onClick={goToPrevPage}
              disabled={!hasPrevPage}
              title="Previous Page"
            >
              <FiChevronLeft />
            </PaginationButton>

            {/* Page Numbers */}
            <PageNumbers>
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <PageEllipsis key={`ellipsis-${index}`}>...</PageEllipsis>
                ) : (
                  <PaginationButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                    title={`Page ${page}`}
                  >
                    {page}
                  </PaginationButton>
                )
              ))}
            </PageNumbers>

            {/* Next Page */}
            <PaginationButton
              onClick={goToNextPage}
              disabled={!hasNextPage}
              title="Next Page"
            >
              <FiChevronRight />
            </PaginationButton>

            {/* Last Page */}
            <PaginationButton
              onClick={goToLastPage}
              disabled={!hasNextPage}
              title="Last Page"
            >
              <FiChevronsRight />
            </PaginationButton>
          </PaginationControls>

          <MobilePageInfo>
            Page {currentPage} of {totalPages}
          </MobilePageInfo>
        </>
      )}
    </PaginationContainer>
  );
};

export default Pagination;