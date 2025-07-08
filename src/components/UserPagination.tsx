
import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type UserPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const UserPagination = ({ currentPage, totalPages, onPageChange }: UserPaginationProps) => {
  return (
    <div className="mt-4 px-4 lg:px-0">
      <Pagination>
        <PaginationContent className="flex-wrap justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs lg:text-sm`}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const page = i + Math.max(1, currentPage - 2);
            if (page > totalPages) return null;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer text-xs lg:text-sm min-w-8 lg:min-w-10"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs lg:text-sm`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserPagination;
