/**
 * @param {number[][]} M
 * @return {number}
 */

var findCircleNum = function (M) {

  class UnionFind {
    constructor(size = 0) {
      this.rank = new Array(size).fill(1)
      this.set = new Array(size).fill(1).map((it, index) => index)
    }
    _find(p) {
      if (p >= this.set.length || p < 0) {
        throw new Error('out of bound')
      }
      while (this.set[p] !== p) {
        this.set[p] = this.set[this.set[p]]
        p = this.set[p]
      }
      return p
    }
    isConnected(p, q) {
      return this._find(p) === this._find(q)
    }
    union(p, q) {
      let pRoot = this._find(p)
      let qRoot = this._find(q)
      if (this.rank[pRoot] > this.rank[qRoot]) {
        this.set[qRoot] = pRoot
      } else if (this.rank[pRoot] < this.rank[qRoot]) {
        this.set[pRoot] = qRoot
      } else {
        this.set[pRoot] = qRoot
        this.rank[qRoot] += 1
      }
    }
  }

  let len = M.length
  let friendCircles = new UnionFind(len)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (M[i][j] === 1) {
        friendCircles.union(i, j)
      }
    }
  }
  return friendCircles.set.filter((it, index) => it === index).length
}