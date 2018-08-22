/**
 * Initialize your data structure here.
 */

var WordDictionary = function () {

  this.TreeNode = function (isEnd) {
    this.isEnd = isEnd
  }

  this.root = new this.TreeNode(false)
}

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */

WordDictionary.prototype.addWord = function (word) {

  let patrol = this.root

  for (let i = 0; i < word.length; i++) {
    if (!patrol.hasOwnProperty(word[i])) {
      patrol[word[i]] = new this.TreeNode(false)
    }
    patrol = patrol[word[i]]
    if (i === word.length - 1) {
      patrol.isEnd = true
    }
  }
}

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */

WordDictionary.prototype.search = function (word) {

  function _search(patrol, index) {
    if (index === word.length) {
      return patrol.isEnd
    }
    if (word[index] !== '.') {
      if (patrol.hasOwnProperty(word[index])) {
        return _search(patrol[word[index]], index + 1)
      }
      return false
    } else {
      let keys = Object.keys(patrol)
      return keys.some(key => {
        return key !== 'isEnd' && _search(patrol[key], index + 1)
      })
    }
  }

  return _search(this.root, 0)
}