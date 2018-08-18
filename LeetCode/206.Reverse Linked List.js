/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let oldHead = head
  let newHead = null
  let nextHead
  while (oldHead !== null) {
    nextHead = oldHead.next
    oldHead.next = newHead
    newHead = oldHead
    oldHead = nextHead
  }
  return newHead
};