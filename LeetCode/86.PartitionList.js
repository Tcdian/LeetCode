/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */

var partition = function (head, x) {
  let lessHead = new ListNode(0)
  let moreHead = new ListNode(0)
  let patrol = head
  let lessPatrol = lessHead
  let morePatrol = moreHead
  while (patrol !== null) {
    if (patrol.val < x) {
      lessPatrol.next = patrol
      lessPatrol = lessPatrol.next
    } else {
      morePatrol.next = patrol
      morePatrol = morePatrol.next
    }
    patrol = patrol.next
  }
  lessPatrol.next = moreHead.next
  morePatrol.next = null
  return lessHead.next
}