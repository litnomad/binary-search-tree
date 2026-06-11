class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    // sorts and removes duplicate items
    array
      .reduce((accum, current) => {
        if (accum.includes(current) === false) {
          accum.push(current);
        }
        return accum;
      }, [])
      .sort();

    const middle = Math.ceil((start + end) / 2);
    const root = new Node(array[middle]);

    root.left = this.#buildTree(array, start, middle - 1);
    root.right = this.#buildTree(array, middle + 1, end);

    return root;
  }
}

const test = new Tree([1, 2, 3, 4, 5]);
console.log(test);

export { Tree };
