// Queue 使用数组实现
// 支持 enqueue dequeue getFront getSize isEmpty 方法

class ArrayQueue {
  constructor() {
    this.data = []
  }
  enqueue(val) {
    this.data.push(val)
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this.data.shift()
  }
  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this.data[0]
  }
  getSize() {
    return this.data.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
}

// LoopQueue 使用数组实现

class LoopQueue {
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1)
    this.front = 0
    this.tail = 0
    this.size = 0
  }
  enqueue(val) {
    if ((this.tail + 1) % this.data.length === this.front) {
      this._resize(this.getCapacity() * 2)
    }
    this.data[this.tail] = val
    this.tail = (this.tail + 1) % this.data.length
    this.size++
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is Empty')
    }
    let result = this.data[this.front]
    this.data[this.front] = null
    this.front = (this.front + 1) % this.data.length
    this.size--
    if (this.size === Math.floor(this.getCapacity() / 4) && Math.floor(this.getCapacity() / 2) !== 0) {
      this._resize(Math.floor(this.getCapacity() / 2))
    }
    return result
  }
  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is Empty')
    }
    return this.data[this.front]
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    return this.front === this.tail
  }
  getCapacity() {
    return this.data.length - 1
  }
  _resize(newCapacity) {
    let newData = new Array(newCapacity + 1)
    for(let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length]
    }
    this.data = newData
    this.front = 0
    this.tail = this.size
  }
}
