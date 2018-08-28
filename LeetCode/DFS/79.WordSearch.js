/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

// 遍历 board, 当board[i][j] === word[0]时, 深搜, 看能否找到完整 word
var exist = function (board, word) {

  let directionX = [-1, 0, 1, 0]
  let directionY = [0, 1, 0, -1]
  let visited = true

  function dfs(x, y, wordIndex) {
    if (board[x][y] === visited || board[x][y] !== word[wordIndex]) {
      return false
    }
    if (wordIndex === word.length - 1) {
      return true
    }
    let memoVal = board[x][y]
    board[x][y] = visited
    let result = directionX.some((val, key) => {
      let dX = directionX[key] + x
      let dY = directionY[key] + y
      if (dX < 0 || dX >= board.length || dY < 0 || dY >= board[0].length) {
        return false
      }
      return dfs(dX, dY, wordIndex + 1)
    })
    board[x][y] = memoVal
    return result
  }

  if (board.length === 0 || board[0].length === 0 || board.length * board[0].length < word.length) {
    return false
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === word[0] && dfs(i, j, 0)) {
        return true
      }
    }
  }
  return false
}