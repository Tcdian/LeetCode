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

// 中序非递归遍历
// 定义一个 patrol,优先将它和它的左子树放入 stack 中, 当没有左子树时, 弹出并访问, 然后 patrol = patrol.rigth,
// 然后接着循环将其所有的左子树放入 stack 中
var inorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  let patrol = root
  let stack = []
  let result = []
  while (patrol !== null || stack.length !== 0) {
    while (patrol !== null) {
      stack.push(patrol)
      patrol = patrol.left
    }
    patrol = stack.pop()
    result.push(patrol.val)
    patrol = patrol.right
  }
  return result
}