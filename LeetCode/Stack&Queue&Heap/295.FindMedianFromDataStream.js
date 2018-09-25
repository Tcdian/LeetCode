/**
 * initialize your data structure here.
 */

// 解法一: 维持两个元素个数相差不超过1的最大堆和最小堆, 时间复杂度 0(n.logn)
var MedianFinder = function () {
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
      maxHeap.enqueue(num)
    } else {
      minHeap.enqueue(num)
    }
  } else if (minHeap.getSize() > maxHeap.getSize()) {
    if (minHeap.getFront() >= num) {
      maxHeap.enqueue(num)
    } else {
      let tmp = minHeap.replace(num)
      maxHeap.enqueue(tmp)
    }
  } else {
    if (maxHeap.getFront() <= num) {
      minHeap.enqueue(num)
    } else {
      let tmp = maxHeap.replace(num)
      minHeap.enqueue(tmp)
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
