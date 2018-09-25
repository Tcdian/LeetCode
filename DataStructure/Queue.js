// Queue 使用数组实现
// 支持 enqueue dequeue getFront getSize isEmpty 方法
class ArrayQueue {
  constructor() {
    this._data = []
  }

  enqueue(val) {
    this._data.push(val)
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this._data.shift()
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this._data[0]
  }

  getSize() {
    return this._data.length
  }

  isEmpty() {
    return this.getSize() === 0
  }
}

// LoopQueue 使用数组实现
class LoopQueue {
  constructor(capacity = 10) {
    this._data = new Array(capacity + 1)
    this._front = 0
    this._tail = 0
    this._size = 0
  }

  enqueue(val) {
    if ((this._tail + 1) % this._data.length === this._front) {
      this._resize(this.getCapacity() * 2)
    }
    this._data[this._tail] = val
    this._tail = (this._tail + 1) % this._data.length
    this._size++
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is Empty')
    }
    let result = this._data[this._front]
    this._data[this._front] = null
    this._front = (this._front + 1) % this._data.length
    this._size--
    if (this._size === Math.floor(this.getCapacity() / 4) && Math.floor(this.getCapacity() / 2) !== 0) {
      this._resize(Math.floor(this.getCapacity() / 2))
    }
    return result
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is Empty')
    }
    return this._data[this._front]
  }

  getSize() {
    return this._size
  }

  isEmpty() {
    return this._front === this._tail
  }

  getCapacity() {
    return this._data.length - 1
  }

  _resize(newCapacity) {
    let newData = new Array(newCapacity + 1)
    for(let i = 0; i < this._size; i++) {
      newData[i] = this._data[(i + this._front) % this._data.length]
    }
    this._data = newData
    this._front = 0
    this._tail = this._size
  }
}

// LinkedListQueue 使用链表实现

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedListQueue {
  constructor() {
    this._listNode = ListNode
    this.head = new this._listNode('guard')
    this._size = 0
    this._tail = this.head
  }

  enqueue(val) {
    let newListNode = new this._listNode(val)
    this._tail.next = newListNode
    this._tail = this._tail.next
    this._size++
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    let result = this.head.next.val
    this.head.next = this.head.next.next
    this._size--
    return result
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this.head.next.val
  }

  getSize() {
    return this._size
  }

  isEmpty() {
    return this.getSize() === 0
  }
}
