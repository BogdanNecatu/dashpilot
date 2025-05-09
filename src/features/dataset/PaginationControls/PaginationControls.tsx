// type Props = {
//   page: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   limit: number;
//   onLimitChange: (limit: number) => void;
// };

// export default function PaginationControls({
//   page,
//   totalPages,
//   onPageChange,
//   limit,
//   onLimitChange,
// }: Props) {
//   const goToPage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const value = (
//       e.currentTarget.elements.namedItem("page") as HTMLInputElement
//     ).value;
//     const pageNum = Number(value);
//     if (pageNum >= 1 && pageNum <= totalPages) {
//       onPageChange(pageNum);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-2 border-b">
//       <div className="flex items-center gap-2">
//         <label htmlFor="limit">Items per page:</label>
//         <select
//           id="limit"
//           value={limit}
//           onChange={(e) => {
//             onLimitChange(Number(e.target.value));
//             onPageChange(1); // reset to page 1
//           }}
//           className="border rounded px-2 py-1"
//         >
//           {[20, 40, 60].map((n) => (
//             <option key={n} value={n}>
//               {n}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex items-center gap-2 flex-wrap">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="px-2 py-1 border rounded"
//         >
//           ‹ Prev
//         </button>
//         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(
//           (p) => (
//             <button
//               key={p}
//               onClick={() => onPageChange(p)}
//               className={`px-2 py-1 border rounded ${
//                 p === page ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {p}
//             </button>
//           )
//         )}
//         <span>... {totalPages}</span>
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, page + 1))}
//           disabled={page === totalPages}
//           className="px-2 py-1 border rounded"
//         >
//           Next ›
//         </button>
//       </div>

//       <form onSubmit={goToPage} className="flex items-center gap-2">
//         <label htmlFor="page">Go to:</label>
//         <input
//           type="number"
//           name="page"
//           id="page"
//           min={1}
//           max={totalPages}
//           className="w-16 px-2 py-1 border rounded"
//         />
//         <button
//           type="submit"
//           className="px-2 py-1 border rounded bg-blue-500 text-white"
//         >
//           Go
//         </button>
//       </form>
//     </div>
//   );
// }

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
  const goToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (
      e.currentTarget.elements.namedItem("page") as HTMLInputElement
    ).value;
    const pageNum = Number(value);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  const renderPageButtons = () => {
    const visiblePages = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + visiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
      (p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded transition ${
            p === page
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b py-2">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm dark:text-white">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1); // reset page to 1
          }}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
        >
          {[20, 40, 60].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ‹ Prev
        </button>

        {renderPageButtons()}

        {totalPages > 5 && page + 2 < totalPages && (
          <>
            <span className="px-2 text-gray-500 dark:text-gray-300">…</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-1 border rounded ${
                page === totalPages
                  ? "bg-blue-600 text-white"
                  : "dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Next ›
        </button>
      </div>

      {/* Go to page */}
      <form onSubmit={goToPage} className="flex items-center gap-2">
        <label htmlFor="page" className="text-sm dark:text-white">
          Go to:
        </label>
        <input
          type="number"
          name="page"
          id="page"
          min={1}
          max={totalPages}
          className="w-16 px-2 py-1 border rounded bg-white dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go
        </button>
      </form>
    </div>
  );
}
