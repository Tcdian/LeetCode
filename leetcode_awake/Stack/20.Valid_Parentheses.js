## [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

#### Example 1:

```text
Input: "()"
Output: true
```

#### Example 2:

```text
Input: "()[]{}"
Output: true
```

#### Example 3:

```text
Input: "(]"
Output: false
```

#### Example 4:

```text
Input: "([)]"
Output: false
```

#### Example 5:

```text
Input: "{[]}"
Output: true
```

#### Solution ( __Stack__ )

- Javascript

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
// 使用 stack ，当遍历到左括号的时候入栈，出现右括号查看 stack 中的是否匹配。
var isValid = function(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    // Unicode 编码中 '('与')'相差 1， '['与']'、'{'与'}'相差 2
    switch (s[i]) {
      case '(':
        stack.push(s.charCodeAt(i) + 1);
        break;
      case '[':
      case '{':
        stack.push(s.charCodeAt(i) + 2);
        break;
      default:
        if (stack.length === 0 || stack.pop() !== s.charCodeAt(i)) {
          return false;
        }
    }
  }
  return stack.length === 0;
};
```

- Go

```go
func isValid(s string) bool {
    size := len(s);
    stack := make([]byte, size);
    top := 0
    for i := 0 ; i < size; i++ {
      currentByte := s[i]
      switch currentByte {
        case '(':
          stack[top] = currentByte + 1;
          top++;
        case '[', '{':
          stack[top] = currentByte + 2;
          top++;
        case ')', ']', '}':
        if top > 0 && stack[top - 1] == currentByte {
          top--;
        } else {
          return false;
        }
      }
    }
    return top == 0;
}
```
