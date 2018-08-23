/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  wordList.push(beginWord)
  let graph = creatGraph(wordList)
  return bfs(beginWord, endWord, graph)

  // 判断两个单词是否只相差一个字符,
  function canConnect(word1, word2) {
    let diffCount = 0
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++
      }
    }
    return diffCount === 1
  }

  // 把相差一个字符的单词相连, 构成图
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

  // 宽度优先搜索, 在搜索的同时用 count 记录下经过了多少步, 用来确定是不是最小步数
  // 同时记录一个前驱index, 结束后用来追溯路径.
  function bfs(beginWord, endWord, graph) {
    let result = []
    let queue = [
      [beginWord, 1, -1]
    ]
    let visited = new Map()
    let count = 1
    visited.set(beginWord, count)
    let frontIndex = 0
    while (frontIndex !== queue.length) {
      let currentFront = queue[frontIndex]
      let currentWord = currentFront[0]
      count = currentFront[1]
      if (currentWord === endWord) {
        result.push(traceBack(queue, currentFront))
      }
      let nextWords = graph.get(currentWord)
      for (let i = 0; i < nextWords.length; i++) {
        // 如果节点没有访问过, 或者和之前记录的最小count数相同,则放入队列中, 用来搜索不同的最小路径
        if (!visited.has(nextWords[i]) || visited.get(nextWords[i]) === count + 1) {
          visited.set(nextWords[i], count + 1)
          // 记录count 和 frontIndex, frontIndex用来记录路径, count记录当前走了多少步数
          queue.push([nextWords[i], count + 1, frontIndex])
        }
      }
      frontIndex++
    }
    return result
  }

  // 向前追溯, 看看经过了那些单词
  function traceBack(source, current) {
    let path = []
    while (current[2] !== -1) {
      path.push(current[0])
      current = source[current[2]]
    }
    path.push(current[0])
    return path.reverse()
  }
}