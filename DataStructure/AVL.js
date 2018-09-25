// AVL
// 支持 getSize isEmpty add remove contains preorder inorder postorder leverorder isBalanced isBST

class TreeNode {
  constructor(val) {
    this.val = val
    this._height = 1
    this.left = this.right = null
  }
}

class AVL {
  constructor(compare = (a, b) => a - b) {
    this._root = null
    this._size = 0
    this._compare = compare
    this._treeNode = TreeNode
  }
  // 获取AVL中元素个数
  getSize() {
    return this._size
  }
  // 判断AVL是否为空
  isEmpty() {
    return this._size === 0
  }
  // 向AVL中添加元素 添加橙红返回 true, 已存在返回 false
  add(val) {
    let memoSize = this.getSize()
    this._root = this._add(this._root, val)
    return memoSize === this.getSize() - 1
  }
  // 从AVL中移除元素. 移除成功返回 true, 失败返回 false
  remove(val) {
    let memoSize = this.getSize()
    this._root = this._remove(this._root, val)
    return memoSize === this.getSize() + 1
  }
  // 判断AVL中是否包含元素
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
  // 判断 AVL 树是不是平衡树
  isBalanced() {
    return this._isBalanced(this._root)
  }
  // 判断 AVL 树是不是BST
  isBST() {
    let inorderArr = []
    this.inorder(it => inorderArr.push(it))
    for(let i = 1; i < inorderArr.length; i++) {
      if (this._compare(inorderArr[i], inorderArr[i - 1]) < 0) {
        return false
      }
    }
    return true
  }

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
    // 更新 height
    node._height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))

    // 计算平衡因子
    let balanceFactor = this._getBalanceFactor(node)

    // LLRotate
    if (balanceFactor > 1 && this._getBalanceFactor(node.left) > 0) {
      return this._LRotate(node)
    }
    // RRRotate
    if (balanceFactor < -1 && this._getBalanceFactor(node.right) < 0) {
      return this._RRotate(node)
    }
    // LRRotate
    //            X                                   X
    //          /   \                               /   \                       Y
    //        Z      T1        对 Z Y T2           Y     T1      LRotate     /     \
    //      /   \             执行RRotate        /   \             =>       Z       X
    //     T3    Y                =>           Z     T2                   /  \    /  \
    //         /   \                         /   \                      T3   T4 T2   T1
    //       T4     T2                     T3     T4

    if (balanceFactor > 1 && this._getBalanceFactor(node.left) < 0) {
      node.left = this._RRotate(node.left)
      return this._LRotate(node)
    }
    // RLRotate
    //          X                                      X
    //        /   \                                  /   \                      Y
    //       T1    Z           对 Z Y T2            T1    Y      RRotate      /    \
    //           /   \        执行LRotate                /  \       =>       X      Z
    //          Y     T4         =>                    T2   Z              /  \   /  \
    //        /   \                                       /   \          T1   T2 T3  T4
    //      T2     T3                                    T3    T4

    if (balanceFactor < -1 && this._getBalanceFactor(node.right) > 0) {
      node.right = this._LRotate(node.right)
      return this._RRotate(node)
    }
    return node
  }

  _minimun(node) {
    if (node.left === null) {
      return node
    }
    return this._minimun(node.left)
  }

  _remove(node, val) {
    if (node === null) {
      return null
    } else if (this._compare(node.val, val) > 0) {
      node.left = this._remove(node.left, val)
    } else if (this._compare(node.val, val) < 0) {
      node.right = this._remove(node.right, val)
    } else {
      if (node.left === null) {
        node = node.right
        this._size--
      } else if (node.right === null) {
        node = node.left
        this._size--
      } else {
        let seccessor = this._minimun(node.right)
        let leftNode = node.left
        let rightNode = this._remove(node.right, seccessor.val)
        node = seccessor
        node.left = leftNode
        node.right = rightNode
      }
    }
    // 当 node 为 null 时, 直接返回
    if (node === null) {
      return node
    }
    // 更新 height
    node._height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))

    // 计算平衡因子
    let balanceFactor = this._getBalanceFactor(node)

    // LLRotate
    if (balanceFactor > 1 && this._getBalanceFactor(node.left) > 0) {
      return this._LRotate(node)
    }
    // RRRotate
    if (balanceFactor < -1 && this._getBalanceFactor(node.right) < 0) {
      return this._RRotate(node)
    }
    // LRRotate
    if (balanceFactor > 1 && this._getBalanceFactor(node.left) < 0) {
      node.left = this._RRotate(node.left)
      return this._LRotate(node)
    }
    // RLRotate
    if (balanceFactor < -1 && this._getBalanceFactor(node.right) > 0) {
      node.right = this._LRotate(node.right)
      return this._RRotate(node)
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

  _getHeight(node) {
    return node === null ? 0 : node._height
  }

  _getBalanceFactor(node) {
    return node === null ? 0 : this._getHeight(node.left) - this._getHeight(node.right)
  }

  _isBalanced(root) {
    if (root === null) {
      return true
    }
    if (Math.abs(this._getBalanceFactor(root)) > 1) {
      return false
    }
    return this._isBalanced(root.left) && this._isBalanced(root.right)
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

    nodeX._height = 1 + Math.max(this._getHeight(nodeX.left), this._getHeight(nodeX.right))
    nodeY._height = 1 + Math.max(this._getHeight(nodeY.left), this._getHeight(nodeY.right))

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

    nodeX._height = 1 + Math.max(this._getHeight(nodeX.left), this._getHeight(nodeX.right))
    nodeY._height = 1 + Math.max(this._getHeight(nodeY.left), this._getHeight(nodeY.right))

    return nodeY
  }
}
