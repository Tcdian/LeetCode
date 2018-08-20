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

// 方法一: 就地逆置法
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
}

// 方法二: 头插法
var reverseList = function (head) {
  let newHead = new ListNode(0)
  while (head !== null) {
    let tmp = newHead.next
    newHead.next = head
    head = head.next
    newHead.next.next = tmp
  }
  return newHead.next
}