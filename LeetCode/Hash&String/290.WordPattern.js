/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */

var wordPattern = function (pattern, str) {
  let patternMap = new Map()
  let strMap = new Map()
  let strArr = str.split(' ')
  if (strArr.length !== pattern.length) return false
  for (let i = 0; i < pattern.length; i++) {
    let patternPart = pattern[i]
    let strPart = strArr[i]
    if (patternMap.has(patternPart) || strMap.has(strPart)) {
      if (patternMap.get(patternPart) !== strPart || strMap.get(strPart) !== patternPart) {
        return false
      }
    } else {
      patternMap.set(patternPart, strPart)
      strMap.set(strPart, patternPart)
    }
  }
  return true
}