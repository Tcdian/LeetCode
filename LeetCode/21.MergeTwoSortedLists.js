/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function (l1, l2) {
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