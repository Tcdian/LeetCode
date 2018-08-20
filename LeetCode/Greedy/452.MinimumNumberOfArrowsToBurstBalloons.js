/**
 * @param {number[][]} points
 * @return {number}
 */

// 将 points 按 points[0] 按从小到大排序, 再保证可以射击到前面气球的情况下, 尽可能多的射击到更多的气球, 当无法射击到更多气球时, 增加新的弓箭手
// 左端点因为已经排好序, 后面的一定比前面的大, 因此后面每次的 points[i][0]即为左端点, 不需要去记录
var findMinArrowShots = function (points) {
  if (points.length === 0) return 0
  points.sort((a, b) => a[0] - b[0])
  let result = 1
  let rightBoundary = points[0][1]
  for (let i = 1; i < points.length; i++) {
    if (rightBoundary >= points[i][0]) {
      rightBoundary = Math.min(rightBoundary, points[i][1])
    } else {
      result++
      rightBoundary = points[i][1]
    }
  }
  return result
}