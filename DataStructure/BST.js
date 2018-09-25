// BST
// 支持 getSize isEmpty add remove contains preorder inorder postorder leverorder

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = this.right = null
  }
}

class BST {
  constructor(compare = (a, b) => a - b) {
    this._root = null
    this._size = 0
    this._compare = compare
    this._treeNode = TreeNode
  }
  // 获取BST中元素个数
  getSize() {
    return this._size
  }
  // 判断BST是否为空
  isEmpty() {
    return this._size === 0
  }
  // 向BST中添加元素 添加橙红返回 true, 已存在返回 false
  add(val) {
    let memoSize = this.getSize()
    this._root = this._add(this._root, val)
    return memoSize === this.getSize() - 1
  }
  // 从BST中移除元素. 移除成功返回 true, 失败返回 false
  remove(val) {
    let memoSize = this.getSize()
    this._root = this._remove(this._root, val)
    return memoSize === this.getSize() + 1
  }
  // 判断BST中是否包含元素
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
}
