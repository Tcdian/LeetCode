// SegmentTree
class SegmentTree {
  constructor(arr, merge = (a, b) => a + b) {
    this.data = arr.slice()
    this.tree = new Array(arr.length * 4)
    this.merge = merge
    if (arr.length !== 0) {
      this._buildSegmentTree(0, 0, arr.length - 1)
    }
  }
  // 获取总的元素个数
  getSize() {
    return this.data.length
  }
  // 获取指定index处元素
  get(index) {
    return this.data[index]
  }
  // 区间查询
  query(queryL, queryR) {
    if (queryL < 0 || queryR >= this.data.length || queryL > queryR) {
      throw new Error('index is illegal')
    }
    return this._query(0, 0, this.data.length - 1, queryL, queryR)
  }
  // 更新数据
  update(updateIndex, updateVal) {
    if (updateIndex < 0 || updateIndex >= this.data.length) {
      throw new Error('updateIndex is illegal')
    }
    this.data[updateIndex] = updateVal
    this._update(0, 0, this.data.length - 1, updateIndex, updateVal)
  }

  _leftChild(index) {
    return index * 2 + 1
  }

  _rightChild(index) {
    return index * 2 + 2
  }

  _buildSegmentTree(treeIndex, left, right) {
    if (left === right) {
      this.tree[treeIndex] = this.data[left]
      return
    }

    let leftTreeIndex = this._leftChild(treeIndex)
    let rightTreeIndex = this._rightChild(treeIndex)
    let mid = Math.floor((left + right) / 2)

    this._buildSegmentTree(leftTreeIndex, left, mid)
    this._buildSegmentTree(rightTreeIndex, mid + 1, right)

    this.tree[treeIndex] = this.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex])
  }

  _query(treeIndex, left, right, queryL, queryR) {
    if (left === queryL && right === queryR) {
      return this.tree[treeIndex]
    }

    let leftTreeIndex = this._leftChild(treeIndex)
    let rightTreeIndex = this._rightChild(treeIndex)
    let mid = Math.floor((left + right) / 2)

    if (queryR <= mid) {
      return this._query(leftTreeIndex, left, mid, queryL, queryR)
    } else if (queryL > mid) {
      return this._query(rightTreeIndex, mid + 1, right, queryL, queryR)
    }

    let leftResult = this._query(leftTreeIndex, left, mid, queryL, mid)
    let rightResult = this._query(rightTreeIndex, mid + 1, right, mid + 1, queryR)
    return this.merge(leftResult, rightResult)
  }

  _update(treeIndex, left, right, updateIndex, updateVal) {
    if (left === right) {
      this.tree[treeIndex] = updateVal
      return
    }

    let leftTreeIndex = this._leftChild(treeIndex)
    let rightTreeIndex = this._rightChild(treeIndex)
    let mid = Math.floor((left + right) / 2)

    if (updateIndex <= mid) {
      this._update(leftTreeIndex, left, mid, updateIndex, updateVal)
    } else if (updateIndex > mid) {
      this._update(rightTreeIndex, mid + 1, right, updateIndex, updateVal)
    }

    this.tree[treeIndex] = this.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex])
  }
}