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

// 解法一 时间 O(n) 空间 O(n)
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

// 解法二 时间 O(n) 空间 O(n)
// 将新建的节点插入到当前节点的next
// 遍历新链表, 连接random指针
// 将链表拆分为两个链表
var copyRandomList = function(head) {
    let patrol = head
    while (patrol !== null) {
        let newNode = new RandomListNode(patrol.label)
        let patrolNext = patrol.next
        patrol.next = newNode
        newNode.next = patrolNext
        patrol = patrolNext
    }

    patrol = head
    while (patrol !== null) {
        if (patrol.random !== null) {
            patrol.next.random = patrol.random.next
        }
        patrol = patrol.next.next
    }

    patrol = head
    let newHead = new RandomListNode(0)
    let newPatrol = newHead
    while (patrol !== null) {
        newPatrol.next = patrol.next
        newPatrol = newPatrol.next
        patrol.next = patrol.next.next
        patrol = patrol.next
    }
    return newHead.next
}