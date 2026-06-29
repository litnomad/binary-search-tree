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

  // remove duplicates and sorts
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

  #buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const left = this.#buildTree(arr.slice(0, mid));
    const right = this.#buildTree(arr.slice(mid + 1));

    const root = new Node(arr[mid]);
    root.left = left;
    root.right = right;
    return root;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback must be provided.");
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode.data);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
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
    const array = this.inOrderForEach();
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

  #inOrderSuccessor(root) {
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
        root.data = this.#inOrderSuccessor(root);
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

    // if node exists, count the number of edges from the node to the leaf node
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
    const tree = this.inOrderForEach();
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

export { Tree };
