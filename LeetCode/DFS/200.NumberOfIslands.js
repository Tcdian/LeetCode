/**
 * @param {character[][]} grid
 * @return {number}
 */

// 解法一: DFS
var numIslands = function (grid) {

  if (grid.length === 0 || grid[0] === 0)
    return 0
  let mark = new Array(grid.length).fill(0).map(it => new Array(grid[0].length).fill(0))
  let result = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1" && mark[i][j] === 0) {
        result++
        dfs(i, j)
      }
    }
  }

  function dfs(x, y) {
    let directionX = [-1, 0, 1, 0]
    let directionY = [0, 1, 0, -1]
    mark[x][y] = 1
    for (let i = 0; i < 4; i++) {
      let dx = x + directionX[i]
      let dy = y + directionY[i]
      if (dx < 0 || dx >= grid.length || dy < 0 || dy >= grid[0].length) {
        continue
      }
      if (grid[dx][dy] === '1' && mark[dx][dy] === 0) {
        dfs(dx, dy)
      }
    }
  }
  return result
}

// 解法二: BFS
var numIslands = function (grid) {

  if (grid.length === 0 || grid[0] === 0)
    return 0
  let mark = new Array(grid.length).fill(0).map(it => new Array(grid[0].length).fill(0))
  let result = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1" && mark[i][j] === 0) {
        result++
        bfs(i, j)
      }
    }
  }

  function bfs(i, j) {
    mark[i][j] = 1
    let directionX = [-1, 0, 1, 0]
    let directionY = [0, 1, 0, -1]
    let queue = [
      [i, j]
    ]
    while (queue.length !== 0) {
      let position = queue.shift()
      let x = position[0]
      let y = position[1]
      for (let i = 0; i < 4; i++) {
        let dx = x + directionX[i]
        let dy = y + directionY[i]
        if (dx < 0 || dx >= grid.length || dy < 0 || dy >= grid[0].length) {
          continue
        }
        if (grid[dx][dy] === '1' && mark[dx][dy] === 0) {
          mark[dx][dy] = 1
          queue.push([dx, dy])
        }
      }
    }
  }

  return result
}