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
    if(this.root == null){
      this.root = new Node(value);
      return;
    }
    
    let previousNode = null;
    let currentNode = this.root;
    while(currentNode != null){
      if(value === currentNode.value) return;

      if(value < currentNode.value){
        previousNode = currentNode;
        currentNode = currentNode.left
      } else {
        previousNode = currentNode;
        currentNode = currentNode.right
      }
    }
    if(value < previousNode.value) previousNode.left = new Node(value)
    else  previousNode.right = new Node(value);
  }

  delete(value){

  }
}

const tree = new Tree([]);
tree.print();
tree.insert(3)
tree.insert(4)
tree.insert(5)
tree.insert(5)
tree.insert(5)
tree.insert(5)
tree.insert(5)
tree.insert(1)
tree.insert(2)
tree.insert(6)
console.log(tree.insert(23))
tree.print();
