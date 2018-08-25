class Trie {
  constructor() {
    this._treeNode = function (isEnd) {
      this.isEnd = isEnd
    }
    this.root = new this._treeNode(false)
    this._size = 0
  }

  getSize() {
    return this._size
  }

  insert(word) {
    let patrol = this.root
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

  startWith(prefix) {
    let patrol = this.root
    for (let i = 0; i < prefix.length; i++) {
      if (!patrol.hasOwnProperty(prefix[i])) {
        return false
      }
      patrol = patrol[prefix[i]]
    }
    return true
  }

  search(word) {
    return this._search(word, this.root, 0)
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
