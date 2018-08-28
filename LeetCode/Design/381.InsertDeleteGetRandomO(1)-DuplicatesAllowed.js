/**
 * Initialize your data structure here.
 */

// hash 中记录元素在数组中的索引, 数组记录在 hash 中是第几个元素
var RandomizedCollection = function () {
  this._index = 0
  this.data = new Map()
  this.orderArr = []
}

/**
 * Inserts a value to the collection. Returns true if the collection did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */

RandomizedCollection.prototype.insert = function (val) {
  if (!this.data.has(val)) {
    this.data.set(val, [])
  }
  this.data.get(val).push(this._index)
  let indexesLen = this.data.get(val).length
  this.orderArr[this._index++] = {
    val,
    No: indexesLen - 1
  }
  return indexesLen === 1
}

/**
 * Removes a value from the collection. Returns true if the collection contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function (val) {
  if (!this.data.has(val)) {
    return false
  }
  let deleteIndexes = this.data.get(val)
  let deleteIndex = deleteIndexes.pop()
  if (deleteIndexes.length === 0) {
    this.data.delete(val)
  }
  if (deleteIndex !== --this._index) {
    this.orderArr[deleteIndex] = this.orderArr[this._index]
    let lastElement = this.orderArr[this.orderArr.length - 1]
    this.data.get(lastElement.val)[lastElement.No] = deleteIndex
  }
  this.orderArr.pop()
  return true
}

/**
 * Get a random element from the collection.
 * @return {number}
 */

RandomizedCollection.prototype.getRandom = function () {
  return this.orderArr[Math.floor(Math.random() * this._index)].val
}