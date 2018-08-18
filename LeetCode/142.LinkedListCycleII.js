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

 // 快慢指针
var detectCycle = function (head) {
  let slow = head
  let fast = head
  let meetingPlace
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      meetingPlace = fast
      break
    }
  }
  if (meetingPlace === void 0) {
    return null
  }
  let cycleBeginsFind = head
  while (true) {
    if (cycleBeginsFind === meetingPlace) {
      return cycleBeginsFind
    }
    cycleBeginsFind = cycleBeginsFind.next
    meetingPlace = meetingPlace.next
  }
}

// hash
// 依次将节点放入hash中,如果出现重复节点,则说明有环, 代码较简单, 需要 O(n)空间