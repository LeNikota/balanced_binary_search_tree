# Balanced binary search tree

# Tree Class

The `Tree` class represents a binary search tree data structure. It provides methods for building, manipulating, and traversing the tree.

## Constructor

### `constructor(arr)`

- Initializes a new instance of the `Tree` class.
- Parameters:
  - `arr` (optional): An array of values to build the balanced tree from.

## Methods

### `print()`

- Prints the tree structure in a hierarchical format.

### `insert(value)`

- Inserts a new node with the given value into the tree.
- Parameters:
  - `value`: The value to be inserted.

### `delete(value)`

- Deletes a node with the given value from the tree.
- Parameters:
  - `value`: The value of the node to be deleted.

### `find(value)`

- Finds a node with the given value in the tree.
- Parameters:
  - `value`: The value of the node to be found.
- Returns: The node with the specified value, or `null` if not found.

### `levelOrder(callback)`

- Performs a level-order traversal of the tree and applies the specified callback function to each visited node.
- Parameters:
  - `callback` (optional): The callback function to be applied to each visited node. If not specified, an array of visited nodes will be returned.
- Returns: An array of visited nodes, if no callback is provided.

### `preorder(callback)`

- Performs a pre-order traversal of the tree and applies the specified callback function to each visited node.
- Parameters:
  - `callback` (optional): The callback function to be applied to each visited node. If not specified, an array of visited nodes will be returned.
- Returns: An array of visited nodes, if no callback is provided.

### `inorder(callback)`

- Performs an in-order traversal of the tree and applies the specified callback function to each visited node.
- Parameters:
  - `callback` (optional): The callback function to be applied to each visited node. If not specified, an array of visited nodes will be returned.
- Returns: An array of visited nodes, if no callback is provided.

### `postorder(callback)`

- Performs a post-order traversal of the tree and applies the specified callback function to each visited node.
- Parameters:
  - `callback` (optional): The callback function to be applied to each visited node. If not specified, an array of visited nodes will be returned.
- Returns: An array of visited nodes, if no callback is provided.

### `height(node)`

- Calculates the height of the tree or a specific subtree.
- Parameters:
  - `node` (optional): The root node of the subtree. If not specified, the method uses the root of the current instance.
- Returns: The height of the tree or subtree.

### `depth(node)`

- Calculates the depth of a node with the given value in the tree or a specific subtree.
- Parameters:
  - `node` (optional): The root node of the subtree. If not specified, the method uses the root of the current instance.
- Returns: The depth of the node.

### `isBalanced(node)`

- Checks if the tree or a specific subtree is balanced.
- Parameters:
- Returns: `true` if the tree or subtree is balanced, `false` otherwise.

### `rebalance()`

- Rebalances the tree by rebuilding it using the current nodes in an in-order traversal.
- Note: This method modifies the tree structure.