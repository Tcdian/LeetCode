/**
 * Initialize your data structure here.
 */

var Trie = function () {
  this.TreeNode = function (isEnd) {
    this.isEnd = isEnd
  }
  this.root = new this.TreeNode(false)
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */

Trie.prototype.insert = function (word) {
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
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */

Trie.prototype.search = function (word) {
  let patrol = this.root
  for (let i = 0; i < word.length; i++) {
    if (!patrol.hasOwnProperty(word[i])) {
      return false
    }
    patrol = patrol[word[i]]
    if (i === word.length - 1) {
      return patrol.isEnd
    }
  }
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */

Trie.prototype.startsWith = function (prefix) {
  let patrol = this.root
  for (let i = 0; i < prefix.length; i++) {
    if (!patrol.hasOwnProperty(prefix[i])) {
      return false
    }
    patrol = patrol[prefix[i]]
  }
  return true
}