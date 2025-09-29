# Caching Optimizations for Products List Page

## Overview

This document outlines the caching strategies and performance optimizations implemented in the products list page using TanStack Query (React Query).

## Implemented Optimizations

### 1. Enhanced Query Configuration

**File:** `src/app/products/page.tsx`

```typescript
const {
  data,
  isLoading,
  isError,
  error,
  isFetching,
  isPlaceholderData,
  isPending,
} = useQuery<ProductsResponse, Error>({
  queryKey: ["products", page, filters, sort],
  queryFn: () => fetchProducts({ page, filter: filters, sort }),
  staleTime: 2 * 60 * 1000, // 2 minutes
  gcTime: 5 * 60 * 1000, // 5 minutes
  placeholderData: keepPreviousData,
});
```

**Benefits:**

- **Stale Time (2 minutes):** Data is considered fresh for 2 minutes, reducing unnecessary API calls
- **Garbage Collection Time (5 minutes):** Cached data is kept in memory for 5 minutes after component unmount
- **Placeholder Data:** Prevents loading states during pagination by showing previous data

### 2. Smart Pagination Caching

**Implementation:** Each page with different filters/sort combinations creates separate cache entries

**Query Key Structure:**

```typescript
["products", page, filters, sort];
```

**Examples:**

- `["products", 1, {}, ""]` - First page, no filters, no sort
- `["products", 2, {price_from: 10, price_to: 100}, ""]` - Second page with price filter
- `["products", 1, {}, "-price"]` - First page sorted by price descending

### 3. Prefetching Strategy

**File:** `src/app/products/page.tsx`

```typescript
useEffect(() => {
  if (page < (data?.meta.last_page || 0)) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["products", nextPage, filters, sort],
      queryFn: () => fetchProducts({ page: nextPage, filter: filters, sort }),
    });
  }
}, [page, filters, sort, data?.meta.last_page]);
```

**Benefits:**

- **Instant Navigation:** Next page loads immediately when user clicks pagination
- **Improved UX:** Eliminates loading states for next page
- **Smart Prefetching:** Only prefetches when there's a next page available

### 4. Cache Invalidation on Filter/Sort Changes

**Implementation:** Automatic cache invalidation when filters or sort parameters change

```typescript
const handleFilter = (filter: { price_from: number; price_to: number }) => {
  setPage(1);
  setFilters(filter);
  setFilterModalOpen(false);
};

const handleSort = (sort: string) => {
  setPage(1);
  setSort(sort);
  setSortModalOpen(false);
};
```

**Benefits:**

- **Fresh Data:** Ensures filtered/sorted results are always up-to-date
- **Page Reset:** Automatically resets to page 1 when filters change
- **Clean State:** Prevents showing stale data from previous filter combinations

## Cache Behavior Patterns

### 1. Initial Load

- Fresh API call made
- Data cached with 2-minute stale time
- Placeholder data prevents loading states

### 2. Pagination Navigation

- Previous data shown immediately (placeholderData)
- Fresh data fetched in background
- Next page prefetched automatically

### 3. Filter/Sort Changes

- Cache invalidated for all product queries
- Fresh API call with new parameters
- Page reset to 1

### 4. Browser Navigation

- Cached data shown if within stale time
- Background refetch if data is stale
- No loading states for recently viewed pages

## Performance Benefits

### Before Optimizations

- ❌ Loading state on every pagination click
- ❌ No caching between page visits
- ❌ Unnecessary API calls on repeated visits
- ❌ Poor user experience during navigation

### After Optimizations

- ✅ Instant pagination navigation
- ✅ Intelligent caching with prefetching
- ✅ Reduced API calls through stale time
- ✅ Smooth user experience with placeholder data
- ✅ Automatic cache management

## Monitoring and Debugging

### Query DevTools

**Status:** ✅ **IMPLEMENTED**

React Query DevTools are enabled in development:

**File:** `components/providers/tankstack-provider.tsx`

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const TankstackProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
```

**Features Available:**

- Query inspection and debugging
- Cache state visualization
- Query timeline and performance metrics
- Manual query invalidation and refetching
- Query key explorer

### Cache Inspection

Use browser DevTools to inspect:

- Active queries
- Cache entries
- Query states
- Background refetches

### Performance Metrics

Monitor:

- API call frequency
- Cache hit rates
- User navigation patterns
- Loading state occurrences

## Future Optimizations

### 1. Infinite Scroll (Alternative to Pagination)

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["products", filters, sort],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined,
  });
```

### 2. Optimistic Updates for User Actions

```typescript
const addToFavorites = useMutation({
  mutationFn: addToFavoritesAPI,
  onMutate: async (productId) => {
    // Optimistically update UI
    queryClient.setQueryData(["products", page, filters, sort], (old) => ({
      ...old,
      data: old.data.map((product) =>
        product.id === productId ? { ...product, isFavorited: true } : product
      ),
    }));
  },
});
```

### 3. Advanced Prefetching

- Prefetch on hover over pagination buttons
- Prefetch popular filter combinations
- Prefetch based on user behavior patterns

## Configuration Recommendations

### Production Settings

```typescript
const queryConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes for production
  gcTime: 10 * 60 * 1000, // 10 minutes for production
  retry: 3, // Retry failed requests
  refetchOnWindowFocus: true, // Refetch when window gains focus
};
```

### Development Settings

```typescript
const queryConfig = {
  staleTime: 30 * 1000, // 30 seconds for development
  gcTime: 2 * 60 * 1000, // 2 minutes for development
  retry: 1, // Fewer retries in development
  refetchOnWindowFocus: false, // Disable for development
};
```

## Troubleshooting

### Common Issues

1. **Stale Data Showing**

   - Check staleTime configuration
   - Verify cache invalidation logic
   - Ensure query keys are unique

2. **Excessive API Calls**

   - Increase staleTime value
   - Check for unnecessary query key changes
   - Verify prefetching logic

3. **Memory Leaks**
   - Monitor gcTime settings
   - Check for unused cache entries
   - Verify component cleanup

### Debug Commands

```typescript
// Clear all caches
queryClient.clear();

// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: ["products"] });

// Remove specific cache entry
queryClient.removeQueries({ queryKey: ["products", 1] });
```

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Maintainer:** Development Team
