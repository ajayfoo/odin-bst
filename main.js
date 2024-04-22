const util = require("util");

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
  if (arr[mid] === undefined) {
    console.log("arr: " + arr);
    console.log("mid: ", mid);
  }
  const node = createNode(arr[mid]);
  node.left = buildTreeFromArray(arr, start, mid - 1);
  node.right = buildTreeFromArray(arr, mid + 1, end);
  return node;
};

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
  const insert = (value, node) => {
    if (node === null) return createNode(value);
    if (value < node.value) {
      node.left = insert(value, node.left);
    } else {
      node.right = insert(value, node.right);
    }
    return node;
  };
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
  const getRoot = () => root;

  return { insert, prettyPrint, getRoot };
};

const testTree = () => {
  const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = createTree(arr);
  tree.prettyPrint(tree.getRoot());
  tree.insert(99, tree.getRoot());
  tree.prettyPrint(tree.getRoot());
};

testTree();
