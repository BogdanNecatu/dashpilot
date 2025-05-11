"use client";

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
    const range = 5;
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
              className="px-3 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
            >
              1
            </button>
            {start > 2 && (
              <span className="px-2 text-gray-500 dark:text-gray-300">...</span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border rounded ${
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
              <span className="px-2 text-gray-500 dark:text-gray-300">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b border-gray-300 dark:border-gray-600">
      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm dark:text-white">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1); // reset to page 1
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
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          ‹ Prev
        </button>

        {renderPages()}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          Next ›
        </button>
      </div>

      {/* Go To Page */}
      <form onSubmit={handleGoToPage} className="flex items-center gap-2">
        <label htmlFor="page" className="text-sm dark:text-white">
          Go to:
        </label>
        <input
          type="number"
          name="page"
          id="page"
          min={1}
          max={totalPages}
          className="w-16 px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded border border-blue-600 hover:bg-blue-700"
        >
          Go
        </button>
      </form>
    </div>
  );
}
