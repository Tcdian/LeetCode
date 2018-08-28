/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

var levelOrder = function (root) {
  if (root === null) {
    return []
  }
  let result = []
  let queue = [[0, root]]
  while (queue.length !== 0) {
    let pairs = queue.shift()
    let node = pairs[1]
    let level = pairs[0]
    result[level] = result[level] || []
    result[level].push(node.val)
    if (node.left !== null) {
      queue.push([level + 1, node.left])
    }
    if (node.right !== null) {
      queue.push([level + 1, node.right])
    }
  }
  return result
}