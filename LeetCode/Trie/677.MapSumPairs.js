/**
 * Initialize your data structure here.
 */

var MapSum = function () {
  this._treeNode = function (val = 0) {
    this.val = val
  }
  this.root = new this._treeNode()
}

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  let patrol = this.root
  for (let i = 0; i < key.length; i++) {
    if (!patrol.hasOwnProperty(key[i])) {
      patrol[key[i]] = new this._treeNode()
    }
    patrol = patrol[key[i]]
    if (i === key.length - 1) {
      patrol.val = val
    }
  }
}

/**
 * @param {string} prefix
 * @return {number}
 */

MapSum.prototype.sum = function (prefix) {
  function search(prefix) {
    let patrol = this.root
    for (let i = 0; i < prefix.length; i++) {
      if (patrol.hasOwnProperty(prefix[i])) {
        patrol = patrol[prefix[i]]
      } else {
        break
      }
      if (i === prefix.length - 1) {
        sum(patrol)
      }
    }
  }
  let result = 0

  function sum(patrol) {
    result += patrol.val
    for (let key in patrol) {
      if (key !== 'val') {
        sum(patrol[key])
      }
    }
  }
  search.call(this, prefix)
  return result
}