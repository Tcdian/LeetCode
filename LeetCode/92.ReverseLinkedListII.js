/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

var reverseBetween = function (head, m, n) {
  let guard = new ListNode(0)
  guard.next = head
  let count = 0
  let preEnd = guard
  let reverseStart = head
  let reverseHead = null
  while (count < n) {
    count++
    if (count < m) {
      head = head.next
      reverseStart = head
      preEnd = preEnd.next
    } else {
      let tmp = head.next
      head.next = reverseHead
      reverseHead = head
      head = tmp
    }
  }
  preEnd.next = reverseHead
  reverseStart.next = head
  return guard.next
}