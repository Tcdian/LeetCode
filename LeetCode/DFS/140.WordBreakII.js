/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

var wordBreak = function (s, wordDict) {

  // 将 wordDict存储到 Map 中, 减少查找时的时间复杂度
  let wordDictMap = new Map()
  for (let i = 0; i < wordDict.length; i++) {
    wordDictMap.set(wordDict[i], 'exist')
  }

  //用来缓存已经计算过的字符串
  let hashMap = new Map()

  function dfs(s) {
    //已经计算过的 s, 直接返回缓存的结果
    if (hashMap.has(s)) {
      return hashMap.get(s)
    }

    let result = wordDictMap.has(s) ? [s] : []
    for (let i = 0; i < s.length; i++) {
      let word = s.slice(i) // 优先处理长字符
      if (wordDictMap.has(word)) {
        let res = dfs(s.slice(0, i))
        for (let j = 0; j < res.length; j++) {
          result.push(`${res[j]} ${word}`)
        }
      }
    }

    hashMap.set(s, result)
    return result
  }
  return dfs(s)
}