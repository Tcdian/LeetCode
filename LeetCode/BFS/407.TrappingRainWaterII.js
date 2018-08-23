/**
 * @param {number[][]} heightMap
 * @return {number}
 */

// 从四周往里面搜索, 然后更新边界的高度.
// 将四周的点放入优先队列, 按高度从小到大去遍历, 然后更新边界, 将新的边界放入优先队列
var trapRainWater = function (heightMap) {
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
  if (heightMap.length < 3 || heightMap[0].length < 3) {
    return 0
  }
  let queue = new PriorityQueue((a, b) => b[0] - a[0])
  let mark = new Array(heightMap.length).fill(0).map(it => new Array(heightMap[0].length).fill(0))
  for (let i = 1; i < heightMap.length - 1; i++) {
    queue.entryQueue([heightMap[i][0], i, 0])
    queue.entryQueue([heightMap[i][heightMap[0].length - 1], i, heightMap[0].length - 1])
  }
  for (let j = 1; j < heightMap[0].length - 1; j++) {
    queue.entryQueue([heightMap[0][j], 0, j])
    queue.entryQueue([heightMap[heightMap.length - 1][j], heightMap.length - 1, j])
  }

  let directionX = [-1, 0, 1, 0]
  let directionY = [0, 1, 0, -1]
  let result = 0

  while (!queue.isEmpty()) {
    let frontElement = queue.outQueue()
    let x = frontElement[1]
    let y = frontElement[2]
    let height = frontElement[0]
    for (let i = 0; i < 4; i++) {
      let dx = directionX[i] + x
      let dy = directionY[i] + y
      if (dx < 1 || dx >= heightMap.length - 1 || dy < 1 || dy >= heightMap[0].length - 1 || mark[dx][dy] === 1) {
        continue
      }
      if (height > heightMap[dx][dy]) {
        result += height - heightMap[dx][dy]
        heightMap[dx][dy] = height
      }
      queue.entryQueue([heightMap[dx][dy], dx, dy])
      mark[dx][dy] = 1
    }
  }
  return result
}