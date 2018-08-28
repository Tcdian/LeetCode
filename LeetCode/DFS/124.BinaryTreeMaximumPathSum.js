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

// 深度优先搜索, 以当前节点为根节点, 经过当前节点的最大值为 (左 + 右, 左, 右, 0) + 当前节点
// 返回上一层的最大值为 (左, 右, 0) + 当前节点
var maxPathSum = function (root) {
  let max = -Infinity

  function pathSum(root) {
    if (root === null) {
      return 0
    }
    let leftSum = pathSum(root.left)
    let leftMax = leftSum > 0 ? leftSum : 0
    let rightSum = pathSum(root.right)
    let rightMax = rightSum > 0 ? rightSum : 0
    max = Math.max(root.val + leftMax + rightMax, max)
    return Math.max(leftMax, rightMax) + root.val
  }
  pathSum(root)
  return max
}