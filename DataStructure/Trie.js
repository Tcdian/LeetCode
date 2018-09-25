// Trie
class TreeNode {
  constructor(isEnd) {
    this.isEnd = isEnd
  }
}

class Trie {
  constructor() {
    this._treeNode = TreeNode
    this._root = new this._treeNode(false)
    this._size = 0
  }
  // 获取 Trie 中元素个数
  getSize() {
    return this._size
  }
  // 向 Trie 中插入 word, 成功返回 true, 已存在返回 false
  insert(word) {
    let memoSize = this.getSize()
    this._insert(word)
    return this.getSize() === memoSize + 1
  }
  // 删除 Trie 中 word, 成功返回 true, 不存在返回 false
  delete(word) {
    let memoSize = this.getSize()
    this._delete(word, this._root)
    return this.getSize() === memoSize - 1
  }
  // 判断 Trie 中 是非存在以提供的 prefix 为前缀的 word
  startWith(prefix) {
    let patrol = this._root
    for (let i = 0; i < prefix.length; i++) {
      if (!patrol.hasOwnProperty(prefix[i])) {
        return false
      }
      patrol = patrol[prefix[i]]
    }
    return true
  }
  // 查询 Trie 中是否包含提供的 word, 支持 . 作为占位符
  search(word) {
    return this._search(word, this._root, 0)
  }

  _insert(word) {
    let patrol = this._root
    for (let i = 0; i < word.length; i++) {
      if (!patrol.hasOwnProperty(word[i])) {
        patrol[word[i]] = new this._treeNode(false)
      }
      patrol = patrol[word[i]]
      if (i === word.length - 1 && patrol.isEnd === false) {
        patrol.isEnd = true
        this._size++
      }
    }
  }

  _delete(word, patrol, index = 0) {
    if (index === word.length) {
      if (patrol.isEnd === true) {
        patrol.isEnd = false
        this._size--
      }
    }

    if (patrol.hasOwnProperty(word[index])) {
      if (this._delete(word, patrol[word[index]], index + 1)) {
        delete patrol[word[index]]
      }
    }

    let keys = Object.keys(patrol)
    return keys.length === 1 && patrol[keys[0]] === false
  }

  _search(word, patrol, index) {
    if (index === word.length) {
      return patrol.isEnd
    }
    if (word[index] !== '.') {
      if (patrol.hasOwnProperty(word[index])) {
        return this._search(word, patrol[word[index]], index + 1)
      }
      return false
    } else {
      let keys = Object.keys(patrol)
      return keys.some(key => {
        return key !== 'isEnd' && this._search(word, patrol[key], index + 1)
      })
    }
  }
}
