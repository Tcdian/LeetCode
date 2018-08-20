/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

var lowestCommonAncestor = function (root, p, q) {

  let stackP
  let stackQ
  let flag = 0
  dfs(root)
  let result

  for (let i = 0;; i++) {
    if (stackP[i] !== stackQ[i]) {
      return result
    }
    result = stackQ[i]
  }

  //求出从根节点到 p , q 的路径
  function dfs(root, stack = []) {
    if (root === null || flag === 2) {
      return
    }

    stack.push(root)
    if (root === p) {
      stackP = stack.slice()
      flag++
    }
    if (root === q) {
      stackQ = stack.slice()
      flag++
    }
    dfs(root.left, stack)
    dfs(root.right, stack)
    stack.pop()
  }
}