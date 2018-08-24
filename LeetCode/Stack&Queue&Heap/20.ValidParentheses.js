/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  class LinkedListStack {
    constructor() {
      this._listNode = function (val) {
        this.val = val
        this.next = null
      }
      this.data = new this._listNode('guard')
      this.size = 0
    }
    push(val) {
      let newListNode = new this._listNode(val)
      newListNode.next = this.data.next
      this.data.next = newListNode
      this.size++
    }
    pop() {
      let result = this.peek()
      if (this.size === 0) {
        throw new Error('stack is empty')
      }
      this.data.next = this.data.next.next
      this.size--
        return result
    }
    peek() {
      if (this.size === 0) {
        throw new Error('stack is empty')
      }
      return this.data.next.val
    }
    getSize() {
      return this.size
    }
    isEmpty() {
      return this.getSize() === 0
    }
  }

  let stack = new LinkedListStack()
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i])
    } else {
      if (s[i] === ')' && !stack.isEmpty() && stack.pop() === '(') {
        continue
      } else if (s[i] === ']' && !stack.isEmpty() && stack.pop() === '[') {
        continue
      } else if (s[i] === '}' && !stack.isEmpty() && stack.pop() === '{') {
        continue
      } else {
        return false
      }
    }
  }
  return stack.isEmpty()
}