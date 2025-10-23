import { createPaginationArray } from "../../lib/utils/pagination";

test("should return [1] when there is only 1 page", () => {
  const result = createPaginationArray(1, 1);
  expect(result).toEqual([1]);
});

test("should return [1,2] when there is only 2 pages", () => {
  const result = createPaginationArray(1, 2);
  expect(result).toEqual([1, 2]);
});

test("should return [1, 2, 3, 4,...,12] when there are 12 pages", () => {
  const result = createPaginationArray(2, 12);
  expect(result).toEqual([1, 2, 3, 4, "...", 12]);
});

test("should return [1,2,3,4,5,6] when there are 6 pages", () => {
  const result = createPaginationArray(1, 6);
  expect(result).toEqual([1, 2, 3, 4, 5, 6]);
});

test("should return [1,2,3,4,5,6,7] when there are 7 pages", () => {
  const result = createPaginationArray(4, 7);
  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("should return [1,2,3,...,10] when there are 10 pages", () => {
  const result = createPaginationArray(1, 10);
  expect(result).toEqual([1, 2, 3, "...", 10]);
});

test("should return [1 ,..., 4,5,6,7,8 ,...,12] when there are 12 pages and user is in the middle", () => {
  const result = createPaginationArray(6, 12);
  expect(result).toEqual([1, "...", 4, 5, 6, 7, 8, "...", 12]);
});

test("should return [1,..., 48, 49, 50, 51, 52,..., 100] when there are 100 pages", () => {
  const result = createPaginationArray(50, 100);
  expect(result).toEqual([1, "...", 48, 49, 50, 51, 52, "...", 100]);
});

test("should return [1,..., 8, 9, 10, 11, 12] when there are 12 pages", () => {
  const result = createPaginationArray(10, 12);
  expect(result).toEqual([1, "...", 8, 9, 10, 11, 12]);
});

test("should return [1,...,10,11,12] when user is on the last page", () => {
  const result = createPaginationArray(12, 12);
  expect(result).toEqual([1, "...", 10, 11, 12]);
});

test("should return [1,...,9,10,11,12] when user is on second-to-last page", () => {
  const result = createPaginationArray(11, 12);
  expect(result).toEqual([1, "...", 9, 10, 11, 12]);
});
