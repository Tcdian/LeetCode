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
  constructor() {
    this.data = []
    this.front = 0
    this.tail = 0
  }


}
