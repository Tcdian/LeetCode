//BST
// 支持 getSize isEmpty add remove contains preorder inorder postorder leverorder
class BST {
  constructor() {
    this.root = null
    this._size = 0
    this._treeNode = function (val) {
      this.val = val
      this.left = this.right = null
    }
  }
  //获取BST中元素个数
  getSize() {
    return this._size
  }
  //判断BST是否为空
  isEmpty() {
    return this._size === 0
  }
  //向BST中添加元素
  add(val) {
    this.root = this._add(this.root, val)
  }
  //从BST中移除元素
  remove(val) {
    this.root = this._remove(this.root, val)
  }
  //判断BST中是否包含元素
  contains(val) {
    return this._contains(this.root, val)
  }
  //前序遍历
  preorder(func = console.log) {
    this._preorder(this.root, func)
  }
  //中序遍历
  inorder(func = console.log) {
    this._inorder(this.root, func)
  }
  //后序遍历
  postorder(func = console.log) {
    this._postorder(this.root, func)
  }
  //层序遍历
  leverorder(func = console.log) {
    this._leverorder(this.root, func)
  }
  _add(root, val) {
    if (root === null) {
      this._size++
      return new this._treeNode(val)
    }
    if (root.val > val) {
      root.left = this._add(root.left, val)
    } else if (root.val < val) {
      root.right = this._add(root.right, val)
    }
    return root
  }
  _minimun(root) {
    if (root.left === null) {
      return root
    }
    return this._minimun(root.left)
  }
  _remove(root, val) {
    if (root === null) {
      return null
    } else if (root.val > val) {
      root.left = this._remove(root.left, val)
    } else if (root.val < val) {
      root.right = this._remove(root.right, val)
    } else {
      if (root.left === null) {
        root = root.right
        this._size--
      } else if (root.right === null) {
        root = root.left
        this._size--
      } else {
        let seccessor = this._minimun(root.right)
        let leftNode = root.left
        let rightNode = this._remove(root.right, seccessor.val)
        root = seccessor
        root.left = leftNode
        root.right = rightNode
      }
    }
    return root
  }
  _contains(root, val) {
    if (root === null)
      return false
    if (root.val === val) {
      return true
    } else if (root.val > val) {
      return this._contains(root.left, val)
    } else {
      return this._contains(root.right, val)
    }
  }
  _preorder(root, func) {
    if (root === null)
      return
    func(root.val)
    this._preorder(root.left, func)
    this._preorder(root.right, func)
  }
  _inorder(root, func) {
    if (root === null)
      return
    this._inorder(root.left, func)
    func(root.val)
    this._inorder(root.right, func)
  }
  _postorder(root, func) {
    if (root === null)
      return
    this._postorder(root.left, func)
    this._postorder(root.right, func)
    func(root.val)
  }
  _leverorder(root, func) {
    if (root === null)
      return
    let queue = [root]
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
