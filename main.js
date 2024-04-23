const util = require("util");
const { makeQueue } = require("./queue.js");

const createNode = (data_, left_ = null, right_ = null) => {
  const data = data_;
  let left = left_;
  let right = right_;
  return { data, left, right };
};

const removeNulls = (sortedArr) => {
  let i = 0;
  for (; i < sortedArr.length; i += 1) {
    if (sortedArr[i] !== null) {
      break;
    }
  }
  sortedArr.splice(0, i);
};

const sortAndRemoveDuplicates = (arr) => {
  if (arr === null) return null;
  arr.sort((a, b) => a - b);
  let first = 0;
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] === arr[first]) {
      arr[i] = null;
      continue;
    }
    first = i;
  }
  arr.sort((a, b) => a - b);
  removeNulls(arr);
  return arr;
};

const buildTreeFromArray = (arr, start, end) => {
  if (end - start < 0) return null;
  if (end - start === 0) return createNode(arr[start]);
  const mid = Math.floor((start + end) / 2);
  const node = createNode(arr[mid]);
  node.left = buildTreeFromArray(arr, start, mid - 1);
  node.right = buildTreeFromArray(arr, mid + 1, end);
  return node;
};

const getRoot = () => root;
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const createTree = (arr = null) => {
  let root = null;
  if (arr !== null || arr.length !== 0) {
    sortAndRemoveDuplicates(arr);
    root = buildTreeFromArray(arr, 0, arr.length - 1);
  }
  const print = (node = root) => {
    console.log(util.inspect(node, false, null, true));
  };
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  const insert = (data, node = root) => {
    if (node === null) return createNode(data);
    if (data < node.data) {
      node.left = insert(data, node.left);
    } else {
      node.right = insert(data, node.right);
    }
    return node;
  };
  const shift = (left, right) => {
    if (right.left === null) right.left = left;
    else right.left = shift(left, right.left);
    return right;
  };

  const remove = (data, node = root) => {
    if (node === null) return null;
    if (data < node.data) node.left = remove(data, node.left);
    else if (data > node.data) node.right = remove(data, node.right);
    else {
      if (node.left === null && node.right === null) {
        if (node === root) root = null;
        return null;
      } else if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      else return shift(node.left, node.right);
    }
    return node;
  };

  const find = (data, node = root) => {
    if (node === null) return null;
    if (data < node.data) return find(data, node.left);
    if (data > node.data) return find(data, node.right);
    return node;
  };

  const levelOrder = (callback = null) => {
    const queue = makeQueue();
    queue.enqueue(root);
    const values = [];
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (callback !== null) callback(node);
      else values.push(node.data);
      if (node.left !== null) queue.enqueue(node.left);
      if (node.right !== null) queue.enqueue(node.right);
    }
    if (callback === null) return values;
  };

  const levelOrderRecursively = (callback = null, queue = null, arr = []) => {
    if (queue !== null && queue.isEmpty()) {
      if (callback === null) return arr;
      return;
    }
    if (queue === null) {
      queue = makeQueue();
      if (root !== null) queue.enqueue(root);
      return levelOrderRecursively(callback, queue, arr);
    } else {
      const node = queue.dequeue();
      if (callback !== null) callback(node);
      else arr.push(node.data);
      if (node.left !== null) queue.enqueue(node.left);
      if (node.right !== null) queue.enqueue(node.right);
      return levelOrderRecursively(callback, queue, arr);
    }
  };
  const preOrder = (callback = null, node = root, arr = []) => {
    if (node === null) return arr;
    if (callback !== null) callback(node);
    else arr.push(node.data);
    preOrder(callback, node.left, arr);
    preOrder(callback, node.right, arr);
    return arr;
  };

  const inOrder = (callback = null, node = root, arr = []) => {
    if (node === null) return arr;
    inOrder(callback, node.left, arr);
    if (callback !== null) callback(node);
    else arr.push(node.data);
    inOrder(callback, node.right, arr);
    return arr;
  };

  const postOrder = (callback = null, node = root, arr = []) => {
    if (node === null) return arr;
    postOrder(callback, node.left, arr);
    postOrder(callback, node.right, arr);
    if (callback !== null) callback(node);
    else arr.push(node.data);
    return arr;
  };

  const height = (node = root) => {
    if (node === null) return -1;
    if (node.left === null && node.right === null) return 0;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  };
  return {
    insert,
    prettyPrint,
    getRoot,
    remove,
    print,
    find,
    levelOrder,
    levelOrderRecursively,
    preOrder,
    inOrder,
    postOrder,
    height,
  };
};

const testTree = () => {
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = createTree(arr);
  tree.prettyPrint();
  console.log(tree.height());
};

testTree();
