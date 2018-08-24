/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  class ArrayStack {
    constructor(size = 0) {
      this.data = new Array(size)
    }
    push(val) {
      this.data.push(val)
    }
    pop() {
      return this.data.pop()
    }
    peek() {
      if (this.isEmpty()) {
        throw new Error('stack is empty')
      }
      return this.data[this.getSize() - 1]
    }
    getSize() {
      return this.data.length
    }
    isEmpty() {
      return this.getSize() === 0
    }
  }

  let stack = new ArrayStack()
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