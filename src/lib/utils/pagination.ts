export const createPaginationArray = (
  currentPage: number,
  totalPages: number
) => {
  const result: (number | string)[] = [];

  // Always show first page
  result.push(1);

  // If total pages <= 7, show all pages
  if (totalPages <= 7) {
    for (let i = 2; i <= totalPages; i++) {
      result.push(i);
    }
    return result;
  }

  // Determine ranges
  const showEllipsis = totalPages > 7;
  const showAroundCurrent = 2; // pages to show around current

  // Calculate ranges
  const leftRange = Math.max(2, currentPage - showAroundCurrent);
  const rightRange = Math.min(totalPages - 1, currentPage + showAroundCurrent);

  // Add ellipsis and pages based on current position
  if (leftRange > 2) {
    result.push("...");
  }

  // Add pages around current
  for (let i = leftRange; i <= rightRange; i++) {
    if (i !== 1 && i !== totalPages) {
      result.push(i);
    }
  }

  // Add ellipsis if needed
  if (rightRange < totalPages - 1) {
    result.push("...");
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    result.push(totalPages);
  }

  return result;
};
