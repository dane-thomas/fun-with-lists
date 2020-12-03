const { TestScheduler } = require("jest");
const library = require("./index");

test("filters 0 from array", () => {
  expect(
    library.filter([0, 1, 2, 3, 0, 4, 5, 0], (val) => val !== 0)
  ).not.toContain(0);
});

test("keep only 0s in array", () => {
  expect(library.filter([0, 1, 2, 3, 0, 4, 5, 0], (val) => val === 0)).toEqual([
    0,
    0,
    0,
  ]);
});

test("sums an array", () => {
  expect(library.reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0)).toBe(15);
});

test("do nothing to a flat array", () => {
  expect(library.flatten([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test("flatten a 2d array", () => {
  expect(
    library.flatten([
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
    ])
  ).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3]);
});

test("flatten a wild nested array", () => {
  expect(
    library.flatten([
      [1, 1, 1],
      [2, [4, [4, 5, 5, [6, 7]]], 2],
      [3, 3, 3],
    ])
  ).toEqual([1, 1, 1, 2, 4, 4, 5, 5, 6, 7, 2, 3, 3, 3]);
});
