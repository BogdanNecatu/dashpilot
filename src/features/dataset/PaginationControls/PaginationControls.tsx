"use client";

import { useEffect, useState } from "react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
};

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGoToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "page"
    ) as HTMLInputElement;
    const value = Number(input.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
      input.value = "";
    }
  };

  const renderPages = () => {
    const visiblePages: number[] = [];
    const range = isMobile ? 3 : 5;
    const half = Math.floor(range / 2);

    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + range - 1);

    if (end - start < range - 1) {
      start = Math.max(1, end - range + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return (
      <>
        {start > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              1
            </button>
            {start > 2 && (
              <span className="px-1 text-gray-500 dark:text-gray-300">...</span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-2 py-1 text-sm border rounded ${
              p === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-700 dark:text-white"
            }`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="px-1 text-gray-500 dark:text-gray-300">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-gray-300 dark:border-gray-600">
      {/* Limit Selector */}
      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="limit" className="dark:text-white">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="border px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          {[20, 40, 60].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-1 flex-wrap overflow-x-auto max-sm:text-xs max-sm:gap-1 max-sm:px-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          ‹ Prev
        </button>

        {renderPages()}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          Next ›
        </button>
      </div>

      {/* Go To Page */}
      <form
        onSubmit={handleGoToPage}
        className="flex items-center gap-2 text-sm"
      >
        <label htmlFor="page" className="dark:text-white">
          Go to:
        </label>
        <input
          type="number"
          name="page"
          id="page"
          min={1}
          max={totalPages}
          className="w-16 px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white text-sm"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-blue-600 text-white rounded border border-blue-600 hover:bg-blue-700 text-sm"
        >
          Go
        </button>
      </form>
    </div>
  );
}
