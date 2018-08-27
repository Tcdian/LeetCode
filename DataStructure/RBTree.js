// RBTrie
// 支持 getSize isEmpty add contains preorder inorder postorder leverorder
class RBTree {
  constructor(compare = (a, b) => a - b) {
    this.root = null
    this._size = 0
    this._compare = compare
    this._treeNode = function (val) {
      this.val = val
      this._color = RBTree.RED
      this.left = this.right = null
    }
  }
  // 获取RBTrie中元素个数
  getSize() {
    return this._size
  }
  // 判断RBTrie是否为空
  isEmpty() {
    return this._size === 0
  }
  // 向RBTrie中添加元素 添加橙红返回 true, 已存在返回 false
  add(val) {
    let memoSize = this.getSize()
    this.root = this._add(this.root, val)
    this.root._color = RBTree.BLACK
    return memoSize === this.getSize() - 1
  }
  // 判断RBTrie中是否包含元素
  contains(val) {
    return this._contains(this.root, val)
  }
  // 前序遍历
  preorder(func = console.log) {
    this._preorder(this.root, func)
  }
  // 中序遍历
  inorder(func = console.log) {
    this._inorder(this.root, func)
  }
  // 后序遍历
  postorder(func = console.log) {
    this._postorder(this.root, func)
  }
  // 层序遍历
  leverorder(func = console.log) {
    this._leverorder(this.root, func)
  }
  // 静态方法 RED
  static get RED() {
    return true
  }
  // 静态方法 BLACK
  static get BLACK() {
    return false
  }
  //
  //      黑                  黑                  黑                  黑                       红
  //     /                   /    _RRotate       /    _LRotate      /  \     _flipColor      /  \
  //   红        =>        红        =>        红        =>        红   红        =>        黑    黑
  //                        \                 /
  //                         红             红
  //
  _add(node, val) {
    if (node === null) {
      this._size++
        return new this._treeNode(val)
    }
    if (this._compare(node.val, val) > 0) {
      node.left = this._add(node.left, val)
    } else if (this._compare(node.val, val) < 0) {
      node.right = this._add(node.right, val)
    } else {
      node.val = val
    }

    // 根据不同阶段, 执行不同的操作


    return node
  }

  _contains(node, val) {
    if (node === null)
      return false
    if (this._compare(node.val, val) === 0) {
      return true
    } else if (this._compare(node.val, val) > 0) {
      return this._contains(node.left, val)
    } else {
      return this._contains(node.right, val)
    }
  }

  _preorder(node, func) {
    if (node === null)
      return
    func(node.val)
    this._preorder(node.left, func)
    this._preorder(node.right, func)
  }

  _inorder(node, func) {
    if (node === null)
      return
    this._inorder(node.left, func)
    func(node.val)
    this._inorder(node.right, func)
  }

  _postorder(node, func) {
    if (node === null)
      return
    this._postorder(node.left, func)
    this._postorder(node.right, func)
    func(node.val)
  }

  _leverorder(node, func) {
    if (node === null)
      return
    let queue = [node]
    while (queue.length !== 0) {
      let node = queue.shift()
      func(node.val)
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
  }

  _RRotate(nodex) {
    let nodeY = nodeX.right

  }
}
