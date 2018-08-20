/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) {
    return null
  }
  let patrolA = headA
  let patrolB = headB
  while (patrolA !== null || patrolB !== null) {
    if (patrolA === patrolB) {
      return patrolA
    }
    if (patrolA === null) {
      patrolA = headB
      continue
    }
    if (patrolB === null) {
      patrolB = headA
      continue
    }
    patrolA = patrolA.next
    patrolB = patrolB.next
  }
  return null
}