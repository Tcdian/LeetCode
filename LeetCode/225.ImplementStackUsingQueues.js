/**
 * Initialize your data structure here.
 */

var MyStack = function () {
  this.stack = []
}

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */

MyStack.prototype.push = function (x) {
  this.stack.push(x)
}

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */

MyStack.prototype.pop = function () {
  let size = this.stack.length
  let tmp
  while (size > 0) {
    // 队列 pop 方法
    tmp = this.stack.shift()
    if (size > 1) {
      // 队列 push 方法
      this.stack.push(tmp)
    }
    size--
  }
  return tmp
}

/**
 * Get the top element.
 * @return {number}
 */

MyStack.prototype.top = function () {
  // 队列的 back 方法
  return this.stack[this.stack.length - 1]
}

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */

MyStack.prototype.empty = function () {
  // 队列的size 方法
  return this.stack.length === 0
}