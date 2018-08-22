/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */

// 注意四种状态的转移
var maxProfit = function (prices, fee) {
  let res = [0]
  let buy = [-prices[0]]
  let hold = [-Infinity]
  let sell = [-Infinity]
  for (var i = 1; i < prices.length; i++) {
    res[i] = Math.max(res[i - 1], sell[i - 1])
    buy[i] = Math.max(res[i - 1], sell[i - 1]) - prices[i]
    hold[i] = Math.max(hold[i - 1], buy[i - 1])
    sell[i] = Math.max(hold[i - 1], buy[i - 1]) + prices[i] - fee
  }
  return Math.max(res[i - 1], buy[i - 1], hold[i - 1], sell[i - 1]) || 0
}