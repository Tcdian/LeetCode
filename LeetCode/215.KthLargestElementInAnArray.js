/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  class PriorityQueue {
    //默认最大堆
    constructor(compare = (a, b) => a - b) {
      this.compare = compare
      this.heap = []
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
      let tmp = this.heap[x]
      this.heap[x] = this.heap[y]
      this.heap[y] = tmp
    }
    _siftUp(index) {
      let parentIndex = this._findParent(index)
      if (parentIndex >= 0 && this.compare(this.heap[index], this.heap[parentIndex]) > 0) {
        this._swap(index, parentIndex)
        this._siftUp(parentIndex)
      }
    }
    _siftDown(index) {
      let leftChild = this._findLeftChild(index)
      let rightChild = this._findRightChild(index)
      let large = index
      if (leftChild <= this.heap.length - 1 && this.compare(this.heap[leftChild], this.heap[large]) > 0) {
        large = leftChild
      }
      if (rightChild <= this.heap.length - 1 && this.compare(this.heap[rightChild], this.heap[large]) > 0) {
        large = rightChild
      }
      if (large !== index) {
        this._swap(index, large)
        this._siftDown(large)
      }
    }
    getFront() {
      if (this.isEmpty())
        throw new Error('priority queue is empty')
      return this.heap[0]
    }
    isEmpty() {
      return this.getSize() === 0 ? true : false
    }
    getSize() {
      return this.heap.length
    }
    entryQueue(element) {
      this.heap.push(element)
      this._siftUp(this.heap.length - 1)
    }
    outQueue() {
      let outElement = this.heap[0]
      this.heap[0] = this.heap[this.heap.length - 1]
      this.heap.pop()
      this._siftDown(0)
      return outElement
    }
    replace(element) {
      let outElement = this.heap[0]
      this.heap[0] = element
      this._siftDown(0)
      return outElement
    }
    heapify() {
      let startIndex = this._findParent(this.heap.length - 1)
      for (let i = startIndex; i >= 0; i--) {
        this._siftDown(i)
      }
    }
  }

  // k个元素最小堆
  let minHeap = new PriorityQueue((a, b) => b - a)
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      minHeap.entryQueue(nums[i])
    } else if (minHeap.getFront() < nums[i]) {
      minHeap.replace(nums[i])
    }
  }
  return minHeap.getFront()
}