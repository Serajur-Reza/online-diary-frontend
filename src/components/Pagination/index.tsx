"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: for icons

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface Props {
  meta: PaginationMeta;
  onPageChange: (newPage: number) => void;
  isFetching?: boolean;
}

export default function Pagination({ meta, onPageChange, isFetching }: Props) {
  const { currentPage, totalPages } = meta;

  // Prevent rendering if there's only one page
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
      {/* <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isFetching}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isFetching}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div> */}

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {meta.itemsPerPage * (currentPage - 1) + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(meta.itemsPerPage * currentPage, meta.totalItems)}
            </span>{" "}
            of <span className="font-medium">{meta.totalItems}</span> results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Simple Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isCurrent = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${
                    isCurrent
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline-indigo-600"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
