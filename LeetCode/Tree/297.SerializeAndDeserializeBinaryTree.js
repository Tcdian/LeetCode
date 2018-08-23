/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

var serialize = function (root) {
  if (root === null) {
    return '#'
  }
  return root.val + '(' + serialize(root.left) + ')' + '(' + serialize(root.right) + ')'
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

var deserialize = function (data) {
  if (data === '#') {
    return null
  }
  let valEndIndex = data.indexOf('(')
  let val = Number(data.slice(0, valEndIndex))
  let leftQuoteCount = 0
  let rightQuoteCount = 0
  for (var i = valEndIndex; i < data.length; i++) {
    if (data[i] === '(') {
      leftQuoteCount++
    }
    if (data[i] === ')') {
      rightQuoteCount++
    }
    if (leftQuoteCount === rightQuoteCount) {
      break
    }
  }
  let leftData = data.slice(valEndIndex + 1, i)
  let rightData = data.slice(i + 2, data.length - 1)
  let rootNode = new TreeNode(val)
  rootNode.left = deserialize(leftData)
  rootNode.right = deserialize(rightData)
  return rootNode
}