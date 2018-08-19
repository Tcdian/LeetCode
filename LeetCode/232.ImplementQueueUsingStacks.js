/**
 * Initialize your data structure here.
 */

var MyQueue = function () {
  this.queue = []
}

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */

MyQueue.prototype.push = function (x) {
  // 栈的 push 方法
  this.queue.push(x)
}

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */

MyQueue.prototype.pop = function () {
  let tmpStack = []
  // 栈的 size 方法
  while (!this.empty()) {
    // 栈的 push pop 方法
    tmpStack.push(this.queue.pop())
  }
  // 栈的 pop 方法
  let result = tmpStack.pop()
  // 栈的 size 方法
  while (tmpStack.length !== 0) {
    // 栈的 push pop 方法
    this.queue.push(tmpStack.pop())
  }
  return result
}

/**
 * Get the front element.
 * @return {number}
 */

MyQueue.prototype.peek = function () {
  let tmpStack = []
  // 栈的 size 方法
  while (!this.empty()) {
    // 栈的 push pop 方法
    tmpStack.push(this.queue.pop())
  }
  // 栈的 top 方法
  let result = tmpStack[tmpStack.length - 1]
  // 栈的 size 方法
  while (tmpStack.length !== 0) {
    // 栈的 push pop 方法
    this.queue.push(tmpStack.pop())
  }
  return result
}

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */

MyQueue.prototype.empty = function () {
  // 栈的 size 方法
  return this.queue.length === 0
}