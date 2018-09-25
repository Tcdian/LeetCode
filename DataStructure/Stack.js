// ArrayStack 使用数组实现
// 支持 push pop peek getSize isEmpty 方法
class ArrayStack {
  constructor() {
    this._data = []
  }

  push(val) {
    this._data.push(val)
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }
    return this._data.pop()
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }
    return this._data[this.getSize() - 1]
  }

  getSize() {
    return this._data.length
  }

  isEmpty() {
    return this.getSize() === 0
  }
}

// LinkedListStack 使用链表实现

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