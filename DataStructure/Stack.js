// Stack 使用数组实现
// 支持 push pop peek getSize isEmpty 方法

class ArrayStack {
  constructor() {
    this.data = []
  }
  push(val) {
    this.data.push(val)
  }
  pop() {
    return this.data.pop()
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }
    return this.data[this.getSize() - 1]
  }
  getSize() {
    return this.data.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
}