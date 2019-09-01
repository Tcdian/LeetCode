## [784. Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/)

给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

#### Examples :

```text
Input: S = "a1b2"
Output: ["a1b2", "a1B2", "A1b2", "A1B2"]

Input: S = "3z4"
Output: ["3z4", "3Z4"]

Input: S = "12345"
Output: ["12345"]
```
#### Note :

```text
1. S 的长度不超过12。
2. S 仅由数字和字母组成。
```

#### Solution ( __Backtracking__ )

- Javascript

```javascript
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
  // 使用 record 记录回溯过程中的 prefix 和 result
  const record = {
    prefix: [],
    result: [],
  };
  backtracking(S, 0, record);
  return record.result;
};

// 回溯，当到达最后一位时，添加到 result 中
function backtracking(S, index, record) {
  if (index >= S.length) {
    record.result.push(record.prefix.join(''));
    return;
  }
  record.prefix.push(S[index]);
  backtracking(S, index + 1, record);
  record.prefix.pop();
  // 如果是大写或小写字母，回溯另外一直 case
  const [anotherCase, isLetter] = check(S, index);
  if (isLetter) {
    record.prefix.push(anotherCase);
    backtracking(S, index + 1, record);
    record.prefix.pop();
  }
}

// 'a': 97, 'z': 122, 'A' : 65, 'Z': 90
function check(S, index) {
  if (S.charCodeAt(index) >= 97 && S.charCodeAt(index) <= 122) {
    return [String.fromCharCode(S.charCodeAt(index) + 65 - 97), true];
  } else if (S.charCodeAt(index) >= 65 && S.charCodeAt(index) <= 90) {
    return [String.fromCharCode(S.charCodeAt(index) + 97 - 65), true];
  }
  return [0, false];
}
```

- Go

```go
type Record struct {
  prefix []byte;
  result []string;
}

func letterCasePermutation(S string) []string {
  // 使用 record 记录回溯过程中的 prefix 和 result
  record := Record{ prefix: []byte{}, result: []string{} };
  backtracking([] byte(S), 0, &record);
  return record.result;
}

// 回溯，当到达最后一位时，添加到 result 中
func backtracking(sByte []byte, index int, record *Record) {
  if index >= len(sByte) {
    record.result = append(record.result, string(record.prefix[:]));
    return;
  }
  record.prefix = append(record.prefix, sByte[index]);
  backtracking(sByte, index + 1, record);
  record.prefix = record.prefix[:len(record.prefix) - 1];
  // 如果是大写或小写字母，回溯另外一直 case
  if anotherCase, isLetter := check(sByte[index]); isLetter {
    record.prefix = append(record.prefix, anotherCase);
    backtracking(sByte, index + 1, record);
    record.prefix = record.prefix[:len(record.prefix) - 1];
  }
}

// 检查是否是大写或小写字母
func check(singleByte byte) (byte, bool) {
  if singleByte >= 'a' && singleByte <= 'z' {
    return singleByte + 'A' - 'a', true;
  } else if singleByte >= 'A' && singleByte <= 'Z' {
    return singleByte + 'a' - 'A', true;
  }
  return 0, false;
}
```
