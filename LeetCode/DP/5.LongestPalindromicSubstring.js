/**
 * @param {string} s
 * @return {string}
 */

// dp记录以 j 开头到 i 结尾的字符串是否为回文字符串
var longestPalindrome = function(s) {
    let dp = []
    let max = 0
    let result = ""
    for(let i = 0; i < s.length; i++) {
        dp[i] = []
        for(let j = 0; j <= i; j++) {
            let flag = false
            if (i === j) {
                dp[i][j] = flag = true
            } else if (i === j + 1) {
                if (s[i] === s[j]) {
                    dp[i][j] = flag = true
                } else {
                    dp[i][j] = false
                }
            } else {
                if (s[i] === s[j] && dp[i - 1][j + 1]) {
                    dp[i][j] = flag = true
                } else {
                    dp[i][j] = false
                }
            }
            if (flag && max < i - j + 1) {
                max = i - j + 1
                result = s.slice(j, i + 1)
            }
        }
    }
    return result
}