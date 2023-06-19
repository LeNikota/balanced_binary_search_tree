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
}

// Delete successor.  Since successor
// is always left child of its parent
// we can safely make successor's right
// right child as left of its parent.
// If there is no succ, then assign
// succ.right to succParent.right

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.print();
tree.delete(8);
console.log(tree.find(0));
tree.print();
