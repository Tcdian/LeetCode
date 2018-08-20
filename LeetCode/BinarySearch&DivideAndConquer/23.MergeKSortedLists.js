/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

var mergeKLists = function (lists) {

  let len = lists.length
  if (len === 0) {
    return null
  }
  if (len === 1) {
    return lists[0]
  }

  let separator = Math.floor(len / 2)
  let leftPart = mergeKLists(lists.slice(0, separator))
  let rightPart = mergeKLists(lists.slice(separator))
  return mergeTwoLists(leftPart, rightPart)

  // 合并两个有序链表
  function mergeTwoLists(l1, l2) {
    if (l1 === null || l2 === null) {
      return l1 || l2
    }
    let guard = new ListNode(0)
    let newHead = guard
    while (l1 !== null && l2 !== null) {
      if (l1.val <= l2.val) {
        newHead.next = l1
        newHead = newHead.next
        l1 = l1.next
      } else {
        newHead.next = l2
        newHead = newHead.next
        l2 = l2.next
      }
    }
    newHead.next = l1 || l2
    return guard.next
  }
}