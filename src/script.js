class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Queue {
  constructor() {
    this.item = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.item[this.headIndex] = item;
    this.headIndex++;
  }

  dequeue() {
    const value = this.item[this.tailIndex];
    delete this.item[this.tailIndex];
    this.tailIndex++;
    return value;
  }

  isEmpty() {
    return this.headIndex === this.tailIndex;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(this.#sort(array));
  }

  // removes duplicate items from the array and returns it sorted
  #sort(array) {
    return array
      .reduce((accum, current) => {
        if (accum.includes(current) === false) {
          accum.push(current);
        }
        return accum;
      }, [])
      .sort((a, b) => {
        return a - b;
      });
  }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    const middle = Math.ceil((start + end) / 2);
    const root = new Node(array[middle]);

    root.left = this.#buildTree(array, start, middle - 1);
    root.right = this.#buildTree(array, middle + 1, end);

    return root;
  }

  levelOrderForEach(
    root = this.root,
    result = [],
    nextLeft = [],
    nextRight = [],
  ) {
    if (root === undefined) {
      throw new Error("Tree node needs to be provided.");
    }

    if (root === null) {
      return;
    }

    if (
      nextLeft.length > 0 &&
      nextLeft.every((node) => node == null) &&
      nextRight.length > 0 &&
      nextRight.every((node) => node == null)
    ) {
      return result;
    }

    const q = new Queue();

    if (result.length === 0) {
      q.enqueue(root.data);
    }

    if (nextLeft.length === 0 && nextRight.length === 0) {
      if (root.left) {
        q.enqueue(root.left.data);
      }
      if (root.right) {
        q.enqueue(root.right.data);
      }
    }

    nextLeft.forEach((node) => {
      if (node !== null) {
        if (node.left) {
          q.enqueue(node.left.data);
        }
        if (node.right) {
          q.enqueue(node.right.data);
        }
      }
    });

    nextRight.forEach((node) => {
      if (node !== null) {
        if (node.left) {
          q.enqueue(node.left.data);
        }
        if (node.right) {
          q.enqueue(node.right.data);
        }
      }
    });

    while (!q.isEmpty()) {
      const printData = q.dequeue();
      result.push(printData);
    }

    if (nextRight.length === 0 && nextLeft.length === 0) {
      nextLeft.push(root.left);
      nextRight.push(root.right);
    } else {
      let copy = nextLeft;
      let copy2 = nextRight;
      nextLeft = [];
      nextRight = [];

      copy.forEach((node) => {
        if (node !== null) {
          nextLeft.push(node.left, node.right);
        }
      });
      copy2.forEach((node) => {
        if (node !== null) {
          nextRight.push(node.left, node.right);
        }
      });
    }

    this.levelOrderForEach(root, result, nextLeft, nextRight);

    return result;
  }

  preOrderForEach(root = this.root, result = []) {
    if (root === undefined) {
      throw new Error("Tree node needs to be provided.");
    }

    if (root === null) return;

    const q = new Queue();
    q.enqueue(root.data);

    while (!q.isEmpty()) {
      const printData = q.dequeue();
      result.push(printData);
    }

    let left = root.left;
    let right = root.right;
    this.preOrderForEach(left, result);
    this.preOrderForEach(right, result);

    return result;
  }

  inOrderForEach(root = this.root, result = []) {
    if (root === undefined) {
      throw new Error("Tree node needs to be provided.");
    }

    if (root === null) return;

    let left = root.left;
    this.inOrderForEach(left, result);

    const q = new Queue();
    q.enqueue(root.data);

    while (!q.isEmpty()) {
      const printData = q.dequeue();
      result.push(printData);
    }

    let right = root.right;
    this.inOrderForEach(right, result);

    return result;
  }

  postOrderForEach(root = this.root, result = []) {
    if (root === undefined) {
      throw new Error("Tree node needs to be provided.");
    }

    if (root === null) return;

    let left = root.left;
    this.postOrderForEach(left, result);
    let right = root.right;
    this.postOrderForEach(right, result);

    const q = new Queue();
    q.enqueue(root.data);

    while (!q.isEmpty()) {
      const printData = q.dequeue();
      result.push(printData);
    }

    return result;
  }

  includes(value) {
    const array = this.levelOrderForEach(this.root);
    return array.includes(value);
  }

  insert(value, root = this.root) {
    if (value < root.data) {
      if (root.left === null) {
        root.left = new Node(value);
      } else {
        this.insert(root.left, value);
      }
    } else {
      if (root.right === null) {
        root.right = new Node(value);
      } else {
        this.insert(value, root.right);
      }
    }

    return root;
  }

  #successor(root) {
    let current = root.right;
    let pointer = "";

    while (current !== null && current.left !== null) {
      pointer = current;
      current = current.left;
    }

    if (pointer == "") {
      root.right = null;
    } else {
      pointer.left = null;
    }
    return current.data;
  }

  deleteItem(root, value, previous = "") {
    if (root === null) {
      return;
    }

    if (root.data === value) {
      // children
      if (root.left && root.right) {
        root.data = this.#successor(root);
        return root;
      }

      // no children
      if (root.left === null && root.right === null) {
        if (root === previous.left) {
          previous.left = null;
          return root;
        }
        if (root === previous.right) {
          previous.right = null;
          return root;
        }
      }
      // 1 children
      if (root.left === null) {
        previous.left = root.right;
        return root;
      }
      if (root.right === null) {
        previous.left = root.left;
        return root;
      }
    }

    if (value < root.data) {
      previous = root;
      this.deleteItem(root.left, value, previous);
    } else {
      previous = root;
      this.deleteItem(root.right, value, previous);
    }

    return root;
  }

  height(value, root = this.root) {
    // return undefined if value is not in the tree
    const tree = this.inOrderForEach(this.root);
    const truthy = tree.includes(value);
    if (!truthy) {
      return;
    }

    let i = 0;

    if (root === null) {
      return i;
    }

    // if node value exists, count the number of edges from the node to the leaf node
    let current = root;
    if (current.data === value) {
      let leftSide = current;
      let rightSide = current;

      while (leftSide.left !== null || rightSide.right !== null) {
        if (leftSide.left !== null) {
          leftSide = leftSide.left;
        }
        if (rightSide.right !== null) {
          rightSide = rightSide.right;
        }
        i++;
      }
      return i;
    }
    // traverse the tree nodes
    if (root.data !== value) {
      i += this.height(value, current.left);
      i += this.height(value, current.right);

      // i must be returned to avoid NaN
      return i;
    } else {
      null;
    }
  }

  depth(value, current = this.root) {
    const tree = this.levelOrderForEach(this.root);
    const truthy = tree.includes(value);
    if (!truthy) {
      return;
    }

    let i = 0;

    if (current.data === value) {
      return i;
    }

    if (value > current.data) {
      current = current.right;
    } else {
      current = current.left;
    }
    i++;

    i += this.depth(value, current);

    return i;
  }

  isBalanced(root = this.root) {
    if (root === null) return;

    // left subtree
    let leftTree = root;
    if (root.left != null) {
      leftTree = root.left;
    }

    // right subtree
    let rightTree = root;
    if (root.right != null) {
      rightTree = root.right;
    }

    // get the height of left subtree
    const leftHeight = this.height(leftTree.data);

    // get the height of right subtree
    const rightHeight = this.height(rightTree.data);

    // height difference between left and right subtree
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    }
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
  }

  rebalance() {
    const array = this.inOrderForEach(this.root);
    this.root = this.#buildTree(this.#sort(array));
  }
}

const balance = new Tree([1, 2, 3, 4, 5]);
console.log(balance.levelOrderForEach());
console.log(balance.preOrderForEach());
console.log(balance.postOrderForEach());
console.log(balance.inOrderForEach());
balance.insert(324);
balance.insert(400);
balance.insert(500);
console.log(balance.isBalanced());
balance.rebalance();
console.log(balance.isBalanced());
//console.log(balance.levelOrderForEach());
console.log(balance.preOrderForEach());
console.log(balance.postOrderForEach());
console.log(balance.inOrderForEach());

const empty = new Tree([]);
console.log(empty);
empty.levelOrderForEach();

export { Tree };
