/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
  class PriorityQueue {
    constructor(compare=(a, b) =>a-b, initialVal=[]) {
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

  if (heightMap.length < 3 || heightMap[0].length < 3) {
    return 0
  }

  let queue = new PriorityQueue((a,b)=>b[0] - a[0])
  let mark = new Array(heightMap.length).fill(0).map(it=>new Array(heightMap[0].length).fill(0))

  for (let i = 1; i < heightMap.length - 1; i++) {
    queue.enqueue([heightMap[i][0], i, 0])
    queue.enqueue([heightMap[i][heightMap[0].length - 1], i, heightMap[0].length - 1])
  }

  for (let j = 1; j < heightMap[0].length - 1; j++) {
    queue.enqueue([heightMap[0][j], 0, j])
    queue.enqueue([heightMap[heightMap.length - 1][j], heightMap.length - 1, j])
  }

  let directionX = [-1, 0, 1, 0]
  let directionY = [0, 1, 0, -1]
  let result = 0

  while (!queue.isEmpty()) {
    let frontElement = queue.dequeue()
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
      queue.enqueue([heightMap[dx][dy], dx, dy])
      mark[dx][dy] = 1
    }
  }
  return result
}