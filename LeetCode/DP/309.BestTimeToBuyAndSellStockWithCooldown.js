/**
 * @param {number[]} prices
 * @return {number}
 */

// 三种状态相互转移
var maxProfit = function (prices) {
  let res = [0]
  let hold = [-prices[0]]
  let sell = [-Infinity]
  for (var i = 1; i < prices.length; i++) {
    res[i] = Math.max(res[i - 1], sell[i - 1])
    hold[i] = Math.max(hold[i - 1], res[i - 1] - prices[i])
    sell[i] = hold[i - 1] + prices[i]
  }
  return Math.max(res[i - 1], hold[i - 1], sell[i - 1]) || 0
}