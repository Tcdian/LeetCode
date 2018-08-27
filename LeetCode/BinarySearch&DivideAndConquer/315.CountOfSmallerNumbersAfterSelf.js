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

// 解法三: 将原数据离散化, 记录之前的 index, val, 离散化之后对应的值
// 倒序插入线段树, 以离散化后的数据作为数据的index, 将数据插入对应的 index 处, 插入过程中, 记录比它小的 index 数量, 即离散后比它小的值
var countSmaller = function (nums) {
  // 将 nums离散化成 [val, 离散值, index]
  let bindNums = nums.map((num, index) => [num, 0, index])
  bindNums.sort((a, b) => a[0] - b[0])
  let discretization = []
  for (let i = 0, j = -1; i < bindNums.length; i++) {
    if (i === 0 || bindNums[i][0] !== bindNums[i - 1][0]) {
      j++
    }
    discretization[i] = [bindNums[i][0], j, bindNums[i][2]]
  }
  // 离散后的值按 index 倒序排列
  discretization.sort((a, b) => b[2] - a[2])
  let result = new Array(discretization.length).fill(0)
  let segementTree = new Array(discretization.length * 4).fill(0)
  // 倒序后的离散值插入线段树中
  for (let i = 0; i < discretization.length; i++) {
    buildSegementTree(0, 0, discretization.length - 1, discretization[i][1], discretization[i][2])
  }

  return result

  function buildSegementTree(treeIndex, left, right, updateIndex, index) {
    if (left === right) {
      segementTree[treeIndex] += 1
      return
    }
    let leftTreeIndex = treeIndex * 2 + 1
    let rightTreeIndex = treeIndex * 2 + 2
    let mid = Math.floor((left + right) / 2)

    if (updateIndex <= mid) {
      buildSegementTree(leftTreeIndex, left, mid, updateIndex, index)
    } else {
      // 插入过程中, 记录前面出现过的比当前小的离散值的数量
      result[index] += segementTree[leftTreeIndex]
      buildSegementTree(rightTreeIndex, mid + 1, right, updateIndex, index)
    }

    segementTree[treeIndex] = segementTree[leftTreeIndex] + segementTree[rightTreeIndex]
  }
}