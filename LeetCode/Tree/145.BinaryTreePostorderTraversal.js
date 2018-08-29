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

// 后序遍历非递归
// 方法一: 反转法
// 后序是 左 -> 右 -> 当前   反转成  当前 -> 右 -> 左
// 那么其遍历和先序遍历非递归实现基本类似,最后反转得到的结果, 即为后序遍历
var postorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  let result = []
  let stack = [root]
  while (stack.length !== 0) {
    let currentNode = stack.pop()
    result.push(currentNode.val)
    if (currentNode.left) {
      stack.push(currentNode.left)
    }
    if (currentNode.right) {
      stack.push(currentNode.right)
    }
  }
  return result.reverse()
}