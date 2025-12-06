import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {

  const getPages = () => {
    if (totalPages <= 6) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();


  return (
    <div className="flex items-center justify-center gap-1 py-4 select-none">
      <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full  bg-gray-300 hover:bg-gray-200"
        aria-label="previous page"
      >
        <FaChevronLeft size={12} />
      </button>

     {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="w-10 h-10 pb-2 flex text-gray-600 items-center justify-center rounded-full bg-gray-300 hover:bg-gray-200">...</span>
        ) : (
          <button
            key={idx}
            onClick={() => typeof p === "number" && setCurrentPage(p)}
            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${
                currentPage === p
                  ? "bg-black text-white border-black"
                  : "bg-gray-300 text-gray-800 border-gray-400 hover:bg-gray-200"
              }
            `}
          >
            {p}
        </button>
      ))}

      <button
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full  bg-gray-300 hover:bg-gray-200"
        aria-label="next page"
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;

