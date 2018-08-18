# LeetCode
LeetCode 经典题目汇总 (javascript实现)

- 1.206. Reverse Linked List
```
var reverseList = function(head) {
  let oldHead = head
  let newHead = null
  let nextHead
  while(oldHead !== null) {
      nextHead = oldHead.next
      oldHead.next = newHead
      newHead = oldHead
      oldHead = nextHead
  }
    return newHead
};
```