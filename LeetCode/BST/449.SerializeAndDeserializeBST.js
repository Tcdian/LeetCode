/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

// 先序遍历 BST, 按顺序依次插入新的BST中, 可以还原出原先的BST
var serialize = function (root) {
  let str = ''

  function preorderTravel(root) {
    if (root === null) {
      return root
    }
    str += '#' + root.val
    preorderTravel(root.left)
    preorderTravel(root.right)
  }
  preorderTravel(root)
  return str.slice(1)
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

var deserialize = function (data) {
  let dataArr = data.split('#').filter(it => it !== '')
  let treeRoot = null
  for (let i = 0; i < dataArr.length; i++) {
    treeRoot = insert(treeRoot, Number(dataArr[i]))
  }

  function insert(root, val) {
    if (root === null) {
      return new TreeNode(val)
    }
    if (root.val > val) {
      root.left = insert(root.left, val)
    } else {
      root.right = insert(root.right, val)
    }
    return root
  }
  return treeRoot
}