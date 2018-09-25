// SegmentTree
class SegmentTree {
  constructor(arr, merge = (a, b) => a + b) {
    this._data = arr.slice()
    this._tree = new Array(arr.length * 4)
    this._merge = merge
    if (arr.length !== 0) {
      this._buildSegmentTree(0, 0, arr.length - 1)
    }
  }
  // 获取总的元素个数
  getSize() {
    return this._data.length
  }
  // 获取指定index处元素
  get(index) {
    return this._data[index]
  }
  // 区间查询
  query(queryL, queryR) {
    if (queryL < 0 || queryR >= this._data.length || queryL > queryR) {
      throw new Error('index is illegal')
    }
    return this._query(0, 0, this._data.length - 1, queryL, queryR)
  }
  // 更新数据
  update(updateIndex, updateVal) {
    if (updateIndex < 0 || updateIndex >= this._data.length) {
      throw new Error('updateIndex is illegal')
    }
    this._data[updateIndex] = updateVal
    this._update(0, 0, this._data.length - 1, updateIndex, updateVal)
  }

  _leftChild(index) {
    return index * 2 + 1
  }

  _rightChild(index) {
    return index * 2 + 2
  }

  _buildSegmentTree(treeIndex, left, right) {
    if (left === right) {
      this._tree[treeIndex] = this._data[left]
      return
    }

    let leftTreeIndex = this._leftChild(treeIndex)
    let rightTreeIndex = this._rightChild(treeIndex)
    let mid = Math.floor((left + right) / 2)

    this._buildSegmentTree(leftTreeIndex, left, mid)
    this._buildSegmentTree(rightTreeIndex, mid + 1, right)

    this._tree[treeIndex] = this._merge(this._tree[leftTreeIndex], this._tree[rightTreeIndex])
  }

  _query(treeIndex, left, right, queryL, queryR) {
    if (left === queryL && right === queryR) {
      return this._tree[treeIndex]
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
    return this._merge(leftResult, rightResult)
  }

  _update(treeIndex, left, right, updateIndex, updateVal) {
    if (left === right) {
      this._tree[treeIndex] = updateVal
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

    this._tree[treeIndex] = this._merge(this._tree[leftTreeIndex], this._tree[rightTreeIndex])
  }
}