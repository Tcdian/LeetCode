/**
 * @param {string[]} strs
 * @return {string[][]}
 */

var groupAnagrams = function (strs) {
  let hashMap = new Map()
  strs.forEach(str => {
    let sortStr = str.split('').sort().join('')
    if (hashMap.has(sortStr)) {
      hashMap.get(sortStr).push(str)
    } else {
      hashMap.set(sortStr, [str])
    }
  })
  return Array.from(hashMap.values())
}