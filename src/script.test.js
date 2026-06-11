import { Tree } from "./script.js";

describe("Create Tree", () => {
  const bst = new Tree([1, 2, 3, 4, 5]);

  test("Expecting it to be an object of nodes ordered by roots", () => {
    expect(bst).toEqual({
      root: {
        data: 3,
        left: {
          data: 2,
          left: {
            data: 1,
            left: null,
            right: null,
          },
          right: null,
        },
        right: {
          data: 5,
          left: {
            data: 4,
            left: null,
            right: null,
          },
          right: null,
        },
      },
    });
  });
});
