/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */

var pathSum = function (root, sum) {
  let result = []
  let item = []

  function dfs(root) {
    if (root === null) {
      return result
    }
    sum -= root.val
    item.push(root.val)
    if (root.left === null && root.right === null && sum === 0) {
      result.push(item.slice())
    }
    dfs(root.left)
    dfs(root.right)
    sum += root.val
    item.pop()
    return result
  }
  return dfs(root)
}