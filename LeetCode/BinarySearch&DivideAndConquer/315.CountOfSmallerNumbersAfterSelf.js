/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 解法一: 分治
var countSmaller = function (nums) {
  let count = new Array(nums.length).fill(0)
  let pairs = nums.map((num, index) => [num, index])

  function merge(pairs) {
    if (pairs.length <= 1) {
      return pairs
    }
    let len = pairs.length
    let separator = Math.floor(len / 2)
    let leftPart = merge(pairs.slice(0, separator))
    let rightPart = merge(pairs.slice(separator))
    let mergeResult = []
    for (var i = 0, j = 0; i < leftPart.length; i++) {
      // rightPart部分有几个元素比当前leftPart元素小
      while (j < rightPart.length && leftPart[i][0] > rightPart[j][0]) {
        mergeResult.push(rightPart[j])
        j++
      }
      count[leftPart[i][1]] += j
      mergeResult.push(leftPart[i])
    }
    mergeResult.push(...rightPart.slice(j))
    return mergeResult
  }

  merge(pairs)
  return count
}

//解法二: 倒序后插入 BST, BST节点上定义一个leftCount 记录左子树有多少个节点
var countSmaller = function (nums) {

  function TreeNode(val) {
    this.val = val
    this.leftCount = 0
    this.left = this.right = null
  }

  function insert(root, val, result, index) {
    if (root === null) {
      return new TreeNode(val)
    }
    if (root.val >= val) {
      // root 新添加了一个左子树, leftCount + 1
      root.leftCount += 1
      root.left = insert(root.left, val, result, index)
    } else {
      // 记录经过的节点有多少个左子树, 累加到计算结果中, 再加上 1 (当前节点)
      result[index] += root.leftCount + 1
      root.right = insert(root.right, val, result, index)
    }
    return root
  }

  let result = new Array(nums.length).fill(0)
  let treeRoot = null
  nums.reverse().forEach((num, index) => {
    treeRoot = insert(treeRoot, num, result, index)
  })
  return result.reverse()
}