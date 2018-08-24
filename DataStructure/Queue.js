// Queue 使用数组实现
// 支持 enqueue dequeue getFront getSize isEmpty 方法

class Queue {
  constructor() {
    this.queue = []
  }
  enqueue(val) {
    this.queue.push(val)
  }
  dequeue() {
    return this.queue.shift()
  }
  getFront() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this.queue[0]
  }
  getSize() {
    return this.queue.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
}