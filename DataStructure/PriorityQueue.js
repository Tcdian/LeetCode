// PriorityQueue
// 默认堆顶为最大元素, 可传入 compare 函数定制优先级, compare(a, b) > 0 则 a 的 优先级更高
// PriorityQueue接收两个参数, 第一个为 compare 函数, 第二个函数为可以传入的初始数组, 会被自动处理成优先队列
class PriorityQueue {
  constructor(compare = (a, b) => a - b, initialVal = []) {
    this._compare = compare
    this.data = initialVal.slice()
    this._heapify()
  }
  // 获取优先队列中元素个数
  getSize() {
    return this.data.length
  }
  // 判断优先队列是非为空
  isEmpty() {
    return this.getSize() === 0
  }
  // 获取优先队列顶端元素
  getFront() {
    if (this.isEmpty()) {
      throw new Error('Heap is empty')
    }
    return this.data[0]
  }
  // 添加一个元素进去优先队列
  enqueue(element) {
    this.data.push(element)
    this._siftUp(this.getSize() - 1)
  }
  // 取出优先队列顶端元素
  dequeue() {
    let outElement = this.data[0]
    this.data[0] = this.data.pop()
    this._siftDown(0)
    return outElement
  }
  // 替换掉优先队列顶端元素
  replace(element) {
    let outElement = this.data[0]
    this.data[0] = element
    this._siftDown(0)
    return outElement
  }

  _findParent(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  _findLeftChild(parentIndex) {
    return parentIndex * 2 + 1
  }

  _findRightChild(parentIndex) {
    return parentIndex * 2 + 2
  }

  _swap(x, y) {
    let tmp = this.data[x]
    this.data[x] = this.data[y]
    this.data[y] = tmp
  }

  _siftUp(index) {
    let parentIndex = this._findParent(index)
    if (parentIndex >= 0 && this._compare(this.data[parentIndex], this.data[index]) < 0) {
      this._swap(parentIndex, index)
      this._siftUp(parentIndex)
    }
  }

  _siftDown(index) {
    let leftChild = this._findLeftChild(index)
    let rightChild = this._findRightChild(index)
    let large = index
    if (leftChild < this.data.length && this._compare(this.data[large], this.data[leftChild]) < 0) {
      large = leftChild
    }
    if (rightChild < this.data.length && this._compare(this.data[large], this.data[rightChild]) < 0) {
      large = rightChild
    }
    if (large !== index) {
      this._swap(large, index)
      this._siftDown(large)
    }
  }

  _heapify() {
    let startIndex = this._findParent(this.getSize() - 1)
    for (let i = startIndex; i >= 0; i--) {
      this._siftDown(i)
    }
  }
}