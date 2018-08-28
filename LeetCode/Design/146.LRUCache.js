/**
 * @param {number} capacity
 */

// 使用双向链表和哈希表存储数据, get 和 put 时间复杂度 O(1)
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.data = new Map()
  this.size = 0
  this.Node = function (key, val) {
    this.val = val
    this.key = key
    this.pre = this.next = null
  }
  this.head = new this.Node('head', 'head')
  this.tail = new this.Node('tail', 'tail')
  this.head.next = this.tail
  this.tail.next = this.head
}

/**
 * @param {number} key
 * @return {number}
 */

LRUCache.prototype.get = function (key) {
  if (!this.data.has(key)) {
    return -1
  }
  let getNode = this.data.get(key)
  getNode.pre.next = getNode.next
  getNode.next.pre = getNode.pre
  let tmp = this.head.next
  this.head.next = getNode
  getNode.next = tmp
  tmp.pre = getNode
  getNode.pre = this.head
  return getNode.val
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */

LRUCache.prototype.put = function (key, value) {
  if (this.data.has(key)) {
    this.data.get(key).val = value
    this.get(key)
    return
  }
  let newNode = new this.Node(key, value)
  this.data.set(key, newNode)
  let tmp = this.head.next
  this.head.next = newNode
  newNode.next = tmp
  tmp.pre = newNode
  newNode.pre = this.head
  if (this.size < this.capacity) {
    this.size++
  } else {
    this.data.delete(this.tail.pre.key)
    this.tail.pre = this.tail.pre.pre
    this.tail.pre.next = this.tail
  }
}