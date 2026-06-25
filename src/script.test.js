import { Tree } from "./script.js";

describe("Initiate Tree", () => {
  const tree = new Tree([1, 2, 3, 4, 5]);

  test("Turn an array into a Binary Search Tree containing a root of subtrees", () => {
    expect(tree).toEqual({
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

  describe("Binary Tree Traversals", () => {
    test("levelOrderForEach() should print data in breadth-first order", () => {
      expect(tree.levelOrderForEach(tree.root)).toStrictEqual([3, 2, 5, 1, 4]);
    });

    test("preOrderForEach() should print data in depth-first level with each child as the root of each left subtree", () => {
      expect(tree.preOrderForEach(tree.root)).toStrictEqual([3, 2, 1, 5, 4]);
    });

    test("inOrderForEach() should print data from the Tree in sorted order", () => {
      expect(tree.inOrderForEach(tree.root)).toStrictEqual([1, 2, 3, 4, 5]);
    });

    test("postOrderForEach() should print data starting from the bottom of the leaf nodes back up to the root", () => {
      expect(tree.postOrderForEach(tree.root)).toStrictEqual([1, 2, 4, 5, 3]);
    });
  });

  describe("Methods", () => {
    test("includes(value) should return true if the value is in the tree. If it isn't in the tree, then returns false", () => {
      expect(tree.includes(2)).toBeTruthy();
    });

    test("insert(value) should insert a new node with that value into the tree", () => {
      expect(tree.insert(6)).toEqual({
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
          right: {
            data: 6,
            left: null,
            right: null,
          },
        },
      });
    });

    test("deleteItem(value) accepts a value and removes it from the tree", () => {
      expect(tree.deleteItem(tree.root, 3)).toEqual({
        data: 4,
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
          left: null,
          right: {
            data: 6,
            left: null,
            right: null,
          },
        },
      });
    });

    test("deleteItem(value) should still work after previous node removal", () => {
      expect(tree.deleteItem(tree.root, 2)).toEqual({
        data: 4,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 5,
          left: null,
          right: {
            data: 6,
            left: null,
            right: null,
          },
        },
      });
    });

    test("deleteItem(6) should remove the last leaf node", () => {
      expect(tree.deleteItem(tree.root, 6)).toEqual({
        data: 4,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 5,
          left: null,
          right: null,
        },
      });
    });

    test("deleteItem(10) does nothing if there is no existing value", () => {
      expect(tree.deleteItem(tree.root, 10)).toEqual({
        data: 4,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 5,
          left: null,
          right: null,
        },
      });
    });

    test("height(value) returns the height of the node containing the given value", () => {
      expect(tree.height(5)).toBe(0);
    });

    test("height(3) returns undefined because the value does not exist in the tree", () => {
      expect(tree.height(3)).toBeUndefined();
    });

    test("depth(value) returns the number of edges from the path of that node to the root node", () => {
      expect(tree.depth(4)).toBe(0);
    });

    test("depth(value) returns the number of edges from the path of that node to the root node", () => {
      expect(tree.depth(1)).toBe(1);
    });

    test("depth(value) returns undefined if the value is not found in the tree", () => {
      expect(tree.depth(10)).toBeUndefined();
    });

    test("isBalanced() returns true or false if the height difference between left and right subtree is less than or greater than 1", () => {
      expect(tree.isBalanced()).toBeTruthy();
    });

    test("insert(10) adds a new node to the right subtree", () => {
      expect(tree.insert(10)).toEqual({
        data: 4,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 5,
          left: null,
          right: {
            data: 10,
            left: null,
            right: null,
          },
        },
      });
    });

    test("insert(15) adds a new node to the right subtree", () => {
      expect(tree.insert(15)).toEqual({
        data: 4,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 5,
          left: null,
          right: {
            data: 10,
            left: null,
            right: {
              data: 15,
              left: null,
              right: null,
            },
          },
        },
      });
    });

    test("isBalanced() returns false after two new nodes were inserted to the tree", () => {
      expect(tree.isBalanced()).toBe(false);
    });

    test("isBalanced() returns true after the tree has been rebalanced with rebalance()", () => {
      tree.rebalance();

      expect(tree.isBalanced()).toBe(true);
    });
  });
});
