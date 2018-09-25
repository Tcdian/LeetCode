/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  class ListNode {
    constructor(val) {
      this.val = val
      this.next = null
    }
  }

  class LinkedListStack {
    constructor() {
      this._listNode = ListNode
      this._data = new this._listNode('guard')
      this._size = 0
    }

    push(val) {
      let newListNode = new this._listNode(val)
      newListNode.next = this._data.next
      this._data.next = newListNode
      this._size++
    }

    pop() {
      let result = this.peek()
      if (this._size === 0) {
        throw new Error('stack is empty')
      }
      this._data.next = this._data.next.next
      this._size--
      return result
    }

    peek() {
      if (this._size === 0) {
        throw new Error('stack is empty')
      }
      return this._data.next.val
    }

    getSize() {
      return this._size
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