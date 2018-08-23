/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

 //先序遍历非递归
var preorderTraversal = function (root) {
  let result = []
  if (root === null) return result
  let stack = [root]
  while (stack.length !== 0) {
    let treeNode = stack.pop()
    result.push(treeNode.val)
    if (treeNode.right !== null) {
      stack.push(treeNode.right)
    }
    if (treeNode.left !== null) {
      stack.push(treeNode.left)
    }
  }
  return result
}