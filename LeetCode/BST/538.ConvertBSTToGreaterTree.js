/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// 先右子树的中序遍历
var convertBST = function (root) {
  let sum = 0
  function inorderTravel(root) {
    if (root === null) {
      return null
    }
    inorderTravel(root.right)
    sum += root.val
    root.val = sum
    inorderTravel(root.left)
    return root
  }
  return inorderTravel(root)
}