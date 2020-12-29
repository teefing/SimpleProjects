const { Observable } = require("rxjs");

function map(project) {
  return new Observable((observer) => {
    // this指向上游的Observable对象
    const sub = this.subscribe({
      next: (value) => {
        try {
          // 处理上游的数据，
          const processedValue = project(value);
          // 并通过observer.next方法向下游发送数据
          observer.next(processedValue);
        } catch (err) {
          observer.error(err);
        }
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });
    return {
      // 下游退订时，就能在这里对上游也进行退订
      unsubscribe: () => {
        sub.unsubscribe();
      },
    };
  });
}

const source$ = new Observable((observer) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
})

// 使用this + call的方式不合符函数式变成的思想
map.call(source$, x => x*2).subscribe(console.log)