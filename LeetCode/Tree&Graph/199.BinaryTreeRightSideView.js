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

// 层序遍历
var rightSideView = function (root) {
  if (root === null) return []
  let queue = [[root, 0]]
  let viewRight = []
  while (queue.length !== 0) {
    let treeNode = queue[0][0]
    let deep = queue[0][1]
    queue.shift()
    viewRight[deep] = treeNode.val
    if (treeNode.left !== null) {
      queue.push([treeNode.left, deep + 1])
    }
    if (treeNode.right !== null) {
      queue.push([treeNode.right, deep + 1])
    }
  }
  return viewRight
}