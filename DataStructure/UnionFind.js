class UnionFind {
  constructor(size = 0){
    this._size = size
    this.rank = new Array(size).fill(1)
    this.parent = new Array(size).fill(1).map((it, index) => index)
  }
  getSize() {
    return this._size
  }
  _find(p) {
    if (p >= this.getSize() || p < 0) {
      throw new Error('out of bound')
    }
    while(this.parent[p] !== p) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }
  union(p, q) {
    let pRoot = this._find(p)
    let qRoot = this._find(q)
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot
    } else {
      this.parent[pRoot] = qRoot
      this.rank[qRoot]++
    }
  }
  isConnected(p, q) {
    let pRoot = this._find(p)
    let qRoot = this._find(q)
    return pRoot === qRoot
  }
}