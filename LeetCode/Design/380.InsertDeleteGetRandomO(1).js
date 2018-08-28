/**
 * Initialize your data structure here.
 */

var RandomizedSet = function () {
  this._index = 0
  this.data = new Map()
  this.orderArr = []
}

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */

RandomizedSet.prototype.insert = function (val) {
  if (this.data.has(val)) {
    return false
  }
  this.data.set(val, this._index)
  this.orderArr[this._index++] = val
  return true
}

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */

RandomizedSet.prototype.remove = function (val) {
  if (!this.data.has(val)) {
    return false
  }
  let deleteIndex = this.data.get(val)
  this.data.delete(val)
  if (deleteIndex !== --this._index) {
    let swapVal = this.orderArr[this._index]
    this.orderArr[deleteIndex] = swapVal
    this.data.set(swapVal, deleteIndex)
  }
  return true
}

/**
 * Get a random element from the set.
 * @return {number}
 */

RandomizedSet.prototype.getRandom = function () {
  return this.orderArr[Math.floor(Math.random() * this._index)]
}