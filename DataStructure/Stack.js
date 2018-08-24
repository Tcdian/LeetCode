// ArrayStack 使用数组实现
// 支持 push pop peek getSize isEmpty 方法
class ArrayStack {
  constructor() {
    this.data = []
  }
  push(val) {
    this.data.push(val)
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }
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

//LinkedListStack 使用链表实现
class LinkedListStack {
  constructor() {
    this._listNode = function(val) {
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