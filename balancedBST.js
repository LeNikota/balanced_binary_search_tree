function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const midIndex = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, midIndex));
  const right = mergeSort(arr.slice(midIndex));

  return merge(left, right);

  function merge(left, right) {
    const mergedArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        mergedArr.push(left[leftIndex]);
        leftIndex++;
      } else {
        mergedArr.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      mergedArr.push(left[leftIndex]);
      leftIndex++;
    }
    while (rightIndex < right.length) {
      mergedArr.push(right[rightIndex]);
      rightIndex++;
    }

    return mergedArr;
  }
}

function removeDuplicates(arr) {
  return arr.filter((value, index, arr) => arr.indexOf(value) === index);
}

class Queue {
  constructor() {
    this.values = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.values[this.head++] = value;
  }

  dequeue() {
    if (this.isEmpty) return null;

    const item = this.values[this.tail];
    delete this.values[this.tail++];
    return item;
  }

  get isEmpty() {
    return this.head === this.tail;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.#prepareForBuildingTree(arr);
  }

  #prepareForBuildingTree(arr) {
    if(arr == null) return new Node();

    const sortedArr = mergeSort(arr);
    const uniqSortedArr = removeDuplicates(sortedArr);
    return this.#buildTree(uniqSortedArr);
  }

  #buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);
    node.left = this.#buildTree(arr.slice(0, mid));
    node.right = this.#buildTree(arr.slice(mid + 1));
    return node;
  }

  print(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (this.root == null) {
      this.root = new Node(value);
      return;
    }

    let previousNode = null;
    let currentNode = this.root;
    while (currentNode != null) {
      if (value === currentNode.value) return;

      if (value < currentNode.value) {
        previousNode = currentNode;
        currentNode = currentNode.left;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    if (value < previousNode.value) previousNode.left = new Node(value);
    else previousNode.right = new Node(value);
  }

  delete(value, node = this.root) {
    if (node === null) return node;

    if (value < node.value) {
      node.left = this.delete(value, node.left);
      return node;
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
      return node;
    }

    if (node.left == null) return node.right;
    else if (node.right == null) return node.left;

    let parent = node;
    let successor = node.right;
    while (successor.left != null) {
      parent = successor;
      successor = successor.left;
    }
    if (parent !== node) {
      parent.left = successor.right;
    } else {
      parent.right = successor.right;
    }
    node.value = successor.value;
    return node;
  }

  find(value, node = this.root) {
    if (node === null || value === node.value) return node;

    if (value < node.value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    const arr = [];
    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty) {
      const node = queue.dequeue();

      if (typeof callback === "function") callback(node);
      else arr.push(node.value);

      if (node.left != null) queue.enqueue(node.left);
      if (node.right != null) queue.enqueue(node.right);
    }

    if (arr.length != 0) return arr;
  }

  preorder(callback, node = this.root, arr = []) {
    typeof callback === "function" ? callback(node) : arr.push(node.value);

    if (node.left != null) this.preorder(callback, node.left, arr);
    if (node.right != null) this.preorder(callback, node.right, arr);

    if (arr.length != 0) return arr;
  }

  inorder(callback, node = this.root, arr = []) {
    if (node.left != null) this.inorder(callback, node.left, arr);
    typeof callback === "function" ? callback(node) : arr.push(node.value);
    if (node.right != null) this.inorder(callback, node.right, arr);

    if (arr.length != 0) return arr;
  }

  postorder(callback, node = this.root, arr = []) {
    if (node.left != null) this.postorder(callback, node.left, arr);
    if (node.right != null) this.postorder(callback, node.right, arr);

    typeof callback === "function" ? callback(node) : arr.push(node.value);

    if (arr.length != 0) return arr;
  }

  height(node = this.root) {
    if (node == null) return -1;
    const leftHight = this.height(node.left);
    const rightHight = this.height(node.right);

    return Math.max(leftHight, rightHight) + 1;
  }

  depth(node = this.root, value, depth = 0) {
    if (node == null) return;

    if (value == null) {
      value = node.value;
      node = this.root;
    }

    if (value < node.value) {
      return this.depth(node.left, value, depth + 1);
    } else if (value > node.value) {
      return this.depth(node.right, value, depth + 1);
    }

    return depth;
  }

  isBalanced(node = this.root) {
    if (node == null) return true;

    const leftHight = this.height(node.left);
    const rightHight = this.height(node.right);

    return (
      Math.abs(leftHight - rightHight) <= 1 &&
      this.isBalanced(node.left)  &&
      this.isBalanced(node.right)
    );
  }

  rebalance(){
    this.root = this.#buildTree(this.inorder())
  }
}









// Create a new instance of the Tree class
const tree = new Tree([5, 2, 7, 1, 3, 6, 8]);

// Print the tree structure
console.log("Tree Structure:");
tree.print();
console.log();

// Insert a new node
tree.insert(4);
tree.print();
console.log();

// Delete a node
tree.delete(1);
tree.print();
console.log();

// Find a node
console.log("Found Node:", tree.find(3));
console.log();

// Perform a level-order traversal
console.log("Level-order Traversal:");
console.log(tree.levelOrder());
console.log();

// Perform a pre-order traversal
console.log("Pre-order Traversal:");
console.log(tree.preorder());
console.log();

// Perform an in-order traversal
console.log("In-order Traversal:");
console.log(tree.inorder());
console.log();

// Perform a post-order traversal
console.log("Post-order Traversal:");
console.log(tree.postorder());
console.log();

// Get the height of the tree
console.log("Tree Height:", tree.height());
console.log();

// Get the depth of a node
console.log("Node with the value 7 depth:", tree.depth(tree.find(7)));
console.log();

// Check if the tree is balanced
console.log("Before replanning Tree Structure:");
tree.print();
console.log("Is Balanced:", tree.isBalanced());
console.log();

// Rebalance the tree
tree.rebalance();

// Print the rebalanced tree structure
console.log("Rebalanced Tree Structure:");
tree.print();
console.log("Is Balanced:", tree.isBalanced());