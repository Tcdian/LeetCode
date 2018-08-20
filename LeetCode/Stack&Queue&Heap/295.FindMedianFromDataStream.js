/**
 * initialize your data structure here.
 */

// 解法一: 维持两个元素个数相差不超过1的最大堆和最小堆, 时间复杂度 0(n.logn)
var MedianFinder = function () {

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

  this.minHeap = new PriorityQueue((a, b) => b - a)
  this.maxHeap = new PriorityQueue()

}

/**
 * @param {number} num
 * @return {void}
 */

MedianFinder.prototype.addNum = function (num) {
  let minHeap = this.minHeap
  let maxHeap = this.maxHeap
  if (minHeap.getSize() === maxHeap.getSize()) {
    if (maxHeap.getSize() === 0 || num <= maxHeap.getFront()) {
      maxHeap.entryQueue(num)
    } else {
      minHeap.entryQueue(num)
    }
  } else if (minHeap.getSize() > maxHeap.getSize()) {
    if (minHeap.getFront() >= num) {
      maxHeap.entryQueue(num)
    } else {
      let tmp = minHeap.replace(num)
      maxHeap.entryQueue(tmp)
    }
  } else {
    if (maxHeap.getFront() <= num) {
      minHeap.entryQueue(num)
    } else {
      let tmp = maxHeap.replace(num)
      minHeap.entryQueue(tmp)
    }
  }
}

/**
 * @return {number}
 */

MedianFinder.prototype.findMedian = function () {
  let minHeap = this.minHeap
  let maxHeap = this.maxHeap
  if (minHeap.getSize() === maxHeap.getSize()) {
    return (minHeap.getFront() + maxHeap.getFront()) / 2
  }
  return minHeap.getSize() < maxHeap.getSize() ? maxHeap.getFront() : minHeap.getFront()
}

// 解法二 : 二分法维持一个有序的数组, 时间复杂度 0(n.logn)
/**
 * initialize your data structure here.
 */

var MedianFinder = function () {
  this.stack = []
}

/**
 * @param {number} num
 * @return {void}
 */

MedianFinder.prototype.addNum = function (num) {
  var len = this.stack.length
  if (len === 0) {
    this.stack.push(num)
  } else {
    var left = 0
    var right = len - 1
    if (num <= this.stack[left]) {
      this.stack.unshift(num)
    } else if (num >= this.stack[right]) {
      this.stack.push(num)
    } else {
      var flag = false
      while (left !== right - 1) {
        var mid = Math.floor((left + right) / 2)
        if (this.stack[mid] === num) {
          flag = true
          this.stack.splice(mid, 0, num)
          break
        } else if (this.stack[mid] < num) {
          left = mid
        } else {
          right = mid
        }
      }
      if (!flag) {
        this.stack.splice(right, 0, num)
      }
    }
  }
}

/**
 * @return {number}
 */

MedianFinder.prototype.findMedian = function () {
  var len = this.stack.length
  if (len % 2 === 0) {
    return (this.stack[Math.floor(len / 2)] + this.stack[Math.floor(len / 2) - 1]) / 2
  } else {
    return this.stack[Math.floor(len / 2)]
  }
}
