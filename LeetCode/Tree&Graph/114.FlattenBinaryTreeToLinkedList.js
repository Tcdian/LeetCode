/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

// 定义一个临时指针 lastPoint, 先序遍历时, 将指针的 right 指向遍历的元素, left指针指向 null, lastPoint 指向 lastPoint.right
var flatten = function (root) {
  let newTreeNode = new TreeNode(0)
  let lastPoint = newTreeNode

  function dfs(root) {
    if (root === null) {
      return
    }
    let left = root.left
    let right = root.right
    lastPoint.right = root
    lastPoint.left = null
    lastPoint = lastPoint.right
    dfs(left)
    dfs(right)
  }
  dfs(root)
}