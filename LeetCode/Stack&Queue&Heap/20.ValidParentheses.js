/**
 * @param {string} s
 * @return {boolean}
 */

// 查看栈顶元素和 s[i] 是否匹配
var isValid = function (s) {
  class Stack {
    constructor() {
      this.stack = []
    }
    push(val) {
      this.stack.push(val)
    }
    pop() {
      return this.stack.pop()
    }
    peek() {
      if (this.isEmpty()) {
        throw new Error('stack is empty')
      }
      return this.stack[this.getSize() - 1]
    }
    getSize() {
      return this.stack.length
    }
    isEmpty() {
      return this.getSize() === 0
    }
  }

  let stack = new Stack()
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i])
    } else {
      if (s[i] === ')' && stack.pop() === '(') {
        continue
      } else if (s[i] === ']' && stack.pop() === '[') {
        continue
      } else if (s[i] === '}' && stack.pop() === '{') {
        continue
      } else {
        return false
      }
    }
  }
  return stack.isEmpty()
}