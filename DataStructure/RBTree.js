// RBTrie
// 支持 getSize isEmpty add contains preorder inorder postorder leverorder

class TreeNode {
  constructor(val) {
    this.val = val
    this._color = RBTree.RED
    this.left = this.right = null
  }
}

class RBTree {
  constructor(compare = (a, b) => a - b) {
    this._root = null
    this._size = 0
    this._compare = compare
    this._treeNode = TreeNode
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
    this._root = this._add(this._root, val)
    this._root._color = RBTree.BLACK
    return memoSize === this.getSize() - 1
  }
  // 判断RBTrie中是否包含元素
  contains(val) {
    return this._contains(this._root, val)
  }
  // 前序遍历
  preorder(func = console.log) {
    this._preorder(this._root, func)
  }
  // 中序遍历
  inorder(func = console.log) {
    this._inorder(this._root, func)
  }
  // 后序遍历
  postorder(func = console.log) {
    this._postorder(this._root, func)
  }
  // 层序遍历
  leverorder(func = console.log) {
    this._leverorder(this._root, func)
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
    if(this._isRed(node.right) && !this._isRed(node.left)) {
      node = this._RRotate(node)
    }
    if(this._isRed(node.left) && this._isRed(node.left.left)) {
      node = this._LRotate(node)
    }
    if(this._isRed(node.left) && this._isRed(node.right)) {
      this._flipColor(node)
    }

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

  //                  X                          Y
  //                /   \                      /  \
  //               Y     T1       LRotate    T3    X
  //             /   \             =>            /   \
  //           T3     T2                        T2   T1

  _LRotate(nodeX) {
    let nodeY = nodeX.left
    nodeX.left = nodeY.right
    nodeY.right = nodeX

    nodeY._color = nodeX._color
    nodeX._color = RBTree.RED

    return nodeY
  }

  //                  X                       Y
  //                /   \     RRotate       /   \
  //               T1    Y      =>         X    T3
  //                   /  \              /  \
  //                  T2   T3           T1   T2

  _RRotate(nodeX) {
    let nodeY = nodeX.right
    nodeX.right = nodeY.left
    nodeY.left = nodeX

    nodeY._color = nodeX._color
    nodeX._color = RBTree.RED

    return nodeY
  }

  _flipColor(node) {
    node._color = RBTree.RED
    node.left._color = RBTree.BLACK
    node.right._color = RBTree.BLACK
  }

  _isRed(node) {
    if(node === null) {
      return false
    }
    return node._color
  }
}
