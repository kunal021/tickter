/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Paging({ pageNumber, setPageNumber, pagination }) {
  const { totalPages } = pagination;

  const handlePrevious = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  const handlePageClick = (page) => {
    setPageNumber(page);
  };

  const renderPaginationItems = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(1, pageNumber - 1);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageClick(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageClick(i)}
            className={`cursor-pointer ${pageNumber === i && "bg-gray-100/10"}`}
            isActive={pageNumber === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageClick(totalPages)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="my-1">
      <Pagination className="flex justify-center">
        <PaginationContent className="flex items-center">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={`cursor-pointer ${
                pageNumber === 1 && "cursor-not-allowed"
              }`}
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={`cursor-pointer ${
                pageNumber === totalPages && "cursor-not-allowed"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Paging;
