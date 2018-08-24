// Stack 使用数组实现
// 支持 push pop peek getSize isEmpty 方法

class Stack {
  constructor() {
    this.stack = []
  }
  push(val) {
    this.stack.push(val)
  }
  pop() {
    return this.stack.pop()
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }
    return this.stack[this.getSize() - 1]
  }
  getSize() {
    return this.stack.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
}