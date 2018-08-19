/**
 * Definition for singly-linked list with a random pointer.
 * function RandomListNode(label) {
 *     this.label = label;
 *     this.next = this.random = null;
 * }
 */

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */

// 首先遍历需要复制的节点, 然后通过label值 创建出对应的节点, 将创建好的节点通过 key(原节点): val(新节点)的形式存储在 Map中,
// 再次遍历需要复制的节点, 根据原节点的 next, random 指向, 根据Map中存储的key:val, 给对应的新节点 next random 赋值
var copyRandomList = function (head) {
  let hashMap = new Map()
  let patrol = head
  while (patrol !== null) {
    hashMap.set(patrol, new RandomListNode(patrol.label))
    patrol = patrol.next
  }

  patrol = head
  while (patrol !== null) {
    let currentNode = hashMap.get(patrol)
    currentNode.next = hashMap.get(patrol.next) || null
    currentNode.random = hashMap.get(patrol.random) || null
    patrol = patrol.next
  }
  return hashMap.get(head) || null
}