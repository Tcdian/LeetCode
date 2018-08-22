/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */

var deleteNode = function (root, key) {
  if (root === null) {
    return root
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    if (root.left === null) {
      return root.right
    } else if (root.right === null) {
      return root.left
    } else {
      let tmp = root.right
      while (tmp.left) {
        tmp = tmp.left
      }
      root.val = tmp.val
      root.right = deleteNode(root.right, tmp.val)
    }
  }
  return root
}