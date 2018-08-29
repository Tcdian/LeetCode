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

// 方法二: 记录第几次访问当前节点
// 将节点放入 stack 中时, 记录是第几次访问当前节点, 第一次访问时, 标记访问次数, 然后再次放入 stack 中, 接着查看他的右子树
// 第二次访问时, 将 val 放入result 中
var postorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  let result = []
  let stack = []
  let patrol = root
  while (patrol !== null || stack.length !== 0) {
    while (patrol !== null) {
      stack.push([1, patrol])
      patrol = patrol.left
    }
    let pairs = stack.pop()
    if (pairs[0] === 1) {
      pairs[0] = 2
      stack.push(pairs)
      patrol = pairs[1].right
    } else {
      result.push(pairs[1].val)
    }
  }
  return result
}