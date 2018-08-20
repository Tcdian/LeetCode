/**
 * @param {number} n
 * @return {string[][]}
 */

var solveNQueens = function (n) {
  let result = []
  let item = new Array(n).fill(0).map(it => new Array(n).fill(0))

  // 标记函数, 放置一个皇后到 (x, y)位置后, 将不可放置的位置标记为 '.'
  function mark(x, y) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === x && j === y) {
          item[i][j] = 'Q'
        } else if (i === x || j === y || Math.abs(i - x) === Math.abs(j - y)) {
          item[i][j] = '.'
        }
      }
    }
  }

  // 遍历每行, 每行需要有一个位置放置皇后
  function queue(x = 0) {
    if (x >= n) {
      result.push(item.map(it => it.join('')))
      return result
    }
    for (let y = 0; y < n; y++) {
      if (item[x][y] === 0) {
        let tmp = item.map(it => it.slice())
        mark(x, y)
        queue(x + 1)
        item = tmp
      }
    }
    return result
  }

  return queue()
}