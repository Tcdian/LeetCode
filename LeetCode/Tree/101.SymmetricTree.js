/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

// 判断 root 的左子树和右子树是否是镜像的
var isSymmetric = function (root) {
  if (root === null) {
    return true
  }
  return symmetric(root.left, root.right)

  function symmetric(root1, root2) {
    if (root1 === null && root2 === null) {
      return true
    }
    if (root1 === null || root2 === null) {
      return false
    }

    if (root1.val !== root2.val) {
      return false
    }

    return symmetric(root1.left, root2.right) && symmetric(root1.right, root2.left)
  }
}