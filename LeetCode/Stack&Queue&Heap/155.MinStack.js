/**
 * initialize your data structure here.
 */

// 利用两个stack, 一个dataStack存储基础的数据, 另一个minStack存储从stack底部到当前元素的最小值.

var MinStack = function () {
  this.dataStack = []
  this.minStack = []
}

/**
 * @param {number} x
 * @return {void}
 */

MinStack.prototype.push = function (x) {
  this.dataStack.push(x)
  let min = this.minStack[this.minStack.length - 1]
  if (min <= x) {
    this.minStack.push(min)
  } else {
    this.minStack.push(x)
  }
}

/**
 * @return {void}
 */

MinStack.prototype.pop = function () {
  this.dataStack.pop()
  this.minStack.pop()
}

/**
 * @return {number}
 */

MinStack.prototype.top = function () {
  return this.dataStack[this.dataStack.length - 1]
}

/**
 * @return {number}
 */

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1]
}
