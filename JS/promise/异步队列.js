// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
// class Scheduler {
//   running = 0
//   pending = []
//   add(promiseCreator) {
//     if (this.running < 2)
//    this.runing += 1
//  promiseCreator().then(() => this.running -= 1; if (this.pending.length > 0) this.add(this.pending.shift()))
//   } else {
//     this.pending.push(promiseCreator)
//    }
// }

class Scheduler {
  running = 0;

  pending = [];

  add(promiseCreator) {
    if (this.running >= 2) {
      return new Promise((resolve) => {
        this.pending.push(() => {
          this.execute(promiseCreator, resolve);
        });
      });
    }
    return new Promise((resolve) => {
      this.execute(promiseCreator, resolve);
    });
  }

  execute(promiseCreator, resolve) {
    this.running += 1;
    promiseCreator().then(() => {
      resolve();
      this.running -= 1;
      if (this.pending.length) {
        this.pending.shift()();
      }
    });
  }
}

const timeout = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(10000, '1');
addTask(5000, '2');
addTask(3000, '3');
addTask(4000, '4');
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
