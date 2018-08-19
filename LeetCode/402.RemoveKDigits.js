/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */

// 如果高位大于低位, 则移除高位的元素才能是得到的结果最小
// 维持一个从栈底到栈顶递增的stack, 如果 后面的元素小于栈顶的元素,则移除栈顶的元素, 大于则放入栈中, 直到num遍历结束, 或者 k === 0
// 需注意如果 遍历结束 k 依然大于 0, 则 从尾部去除 k 个元素. 删掉头部多余的 0
var removeKdigits = function (num, k) {
  let stack = []
  for (let i = 0; i < num.length; i++) {
    while (k > 0 && stack.length !== 0 && stack[stack.length - 1] > num[i]) {
      stack.pop()
      k--
    }
    stack.push(num[i])
  }
  // 没有删除到 k 个元素时, 则从尾部去除 k 个
  let resultArr = stack.slice(0, stack.length - k)
  // 删掉头部多余的 0
  while (resultArr[0] === '0') {
    resultArr.shift()
  }
  return resultArr.join('') || '0'
}
