/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

// 将只相差一个字母的单词连接成图, 宽搜图, 找出最小值
var ladderLength = function (beginWord, endWord, wordList) {
  wordList.push(beginWord)
  let graph = creatGraph(wordList)
  return bfs(beginWord, endWord, graph)

  function canConnect(word1, word2) {
    let diffCount = 0
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++
      }
    }
    return diffCount === 1
  }

  function creatGraph(wordList) {
    let graph = new Map()
    for (let i = 0; i < wordList.length; i++) {
      let val = []
      for (let j = 0; j < wordList.length; j++) {
        if (canConnect(wordList[i], wordList[j])) {
          val.push(wordList[j])
        }
      }
      graph.set(wordList[i], val)
    }
    return graph
  }

  function bfs(beginWord, endWord, graph) {
    let queue = [[beginWord, 1]]
    let visited = new Set()
    visited.add(beginWord)
    while (queue.length !== 0) {
      let tmpFront = queue.shift()
      let tmpWord = tmpFront[0]
      let count = tmpFront[1]
      if (tmpWord === endWord) {
        return count
      }
      let connectWords = graph.get(tmpWord)
      for (let i = 0; i < connectWords.length; i++) {
        if (!visited.has(connectWords[i])) {
          visited.add(connectWords[i])
          queue.push([connectWords[i], count + 1])
        }
      }
    }
    return 0
  }
}