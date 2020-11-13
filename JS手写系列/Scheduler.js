class Scheduler {
  constructor(maxNum) {
    // 最大任务数
    this.maxNum = maxNum
    // 待执行任务列表
    this.taskList = []
    // 当前正在执行的任务数
    this.count = 0
    
  }

  async add (promiseCreator) {
    // 如果当前正在执行的任务数大于最大可同时执行的任务数，就将当前的任务推入待执行任务列表
    if (this.count >= this.maxNum) {
      this.taskList.push(promiseCreator)
      return
    }

    // 在执行任务时，增加正在执行的任务数
    this.count++
    // 执行任务
    await promiseCreator()
    // 任务执行结束，减去正在执行的任务数
    this.count--

    // 执行结束后如果还有未执行的任务
    if (this.taskList.length) {
      // 取出一个任务执行
      let cur = this.taskList.shift()
      // 注意这里需要递归调用add方法，否则如果存在大量的待执行任务，只会执行代码运行的一瞬间排队的前n个任务（n取决于最大任务数）
      this.add(cur)
    }
  }
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

const scheduler = new Scheduler(2)
const addTask = (time, value) => {
  scheduler.add(() => {
    return timeout(time).then(() => {
      console.log(value)
    })
  })
}

addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")

//此处输出2 -> 3 ->1 -> 4
//一开始1、2两个任务进入队列
//500ms时，2完成，输出2，任务3进入队列
//800ms时，3完成，输出3，任务4进入队列
//1000ms时，1完成，输出1
//1200ms时，4完成，输出4