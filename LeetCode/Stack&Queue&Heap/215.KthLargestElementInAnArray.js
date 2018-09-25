/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findKthLargest = function (nums, k) {
  // PriorityQueue
  // 默认堆顶为最大元素, 可传入 compare 函数定制优先级, compare(a, b) > 0 则 a 的 优先级更高
  // PriorityQueue接收两个参数, 第一个为 compare 函数, 第二个函数为可以传入的初始数组, 会被自动处理成优先队列
  class PriorityQueue {
    constructor(compare = (a, b) => a - b, initialVal = []) {
      this._compare = compare
      this._data = initialVal.slice()
      this._heapify()
    }
    // 获取优先队列中元素个数
    getSize() {
      return this._data.length
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
      return this._data[0]
    }
    // 添加一个元素进去优先队列
    enqueue(element) {
      this._data.push(element)
      this._siftUp(this.getSize() - 1)
    }
    // 取出优先队列顶端元素
    dequeue() {
      let outElement = this._data[0]
      // 注意 : 如果当前 _data 内只有一个元素, this._data[0] = this._data.pop() 会产生 bug
      // 并不会 pop 出一个元素
      let siftElement = this._data.pop()
      if (!this.isEmpty()) {
        this._data[0] = siftElement
        this._siftDown(0)
      }
      return outElement
    }
    // 替换掉优先队列顶端元素
    replace(element) {
      let outElement = this._data[0]
      this._data[0] = element
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
      let tmp = this._data[x]
      this._data[x] = this._data[y]
      this._data[y] = tmp
    }

    _siftUp(index) {
      let parentIndex = this._findParent(index)
      if (parentIndex >= 0 && this._compare(this._data[parentIndex], this._data[index]) < 0) {
        this._swap(parentIndex, index)
        this._siftUp(parentIndex)
      }
    }

    _siftDown(index) {
      let leftChild = this._findLeftChild(index)
      let rightChild = this._findRightChild(index)
      let large = index
      if (leftChild < this._data.length && this._compare(this._data[large], this._data[leftChild]) < 0) {
        large = leftChild
      }
      if (rightChild < this._data.length && this._compare(this._data[large], this._data[rightChild]) < 0) {
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

  //最小堆
  let minHeap = new PriorityQueue((a, b) => b - a)
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      minHeap.enqueue(nums[i])
    } else if (minHeap.getFront() < nums[i]) {
      minHeap.replace(nums[i])
    }
  }
  return minHeap.getFront()
}