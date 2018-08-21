/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var longestUnivaluePath = function (root) {
  let longestPath = 0

  function path(root) {
    let leftLen = 0
    let rightLen = 0
    if (root.left !== null) {
      if (root.val === root.left.val) {
        leftLen = path(root.left) + 1
      } else {
        path(root.left)
      }
    }
    if (root.right !== null) {
      if (root.val === root.right.val) {
        rightLen = path(root.right) + 1
      } else {
        path(root.right)
      }
    }
    longestPath = Math.max(longestPath, leftLen + rightLen)
    return Math.max(leftLen, rightLen)
  }

  if (root === null) return 0
  path(root)
  return longestPath
}