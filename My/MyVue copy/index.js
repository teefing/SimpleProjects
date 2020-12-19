let target = null;
class Dep {
  constructor() {
    // 存计算方法的地方，可以理解为副作用函数列表
    this.subs = [];
  }

  // 添加依赖
  depend() {
    if (target && !this.subs.includes(target)) {
      this.subs.push(target);
    }
  }
  // 之后在数据修改后调用
  notify() {
    this.subs.forEach((sub) => sub());
  }
}

let dep = new Dep();

let data = { price: 10, quantity: 2 };
let total = 0;

function watch(func) {
  target = func;
  // 存计算方法 依赖收集
  dep.depend();
  // 先执行一遍计算方法获得total
  target();
  // 将target设置为null，供其它响应式数据使用
  target = null;
}

// 这是计算方法，也可以理解为price的副作用函数之一
watch(() => {
  total = data.price * data.quantity;
});

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  Object.defineProperty(data, key, {
    get() {
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      // price被修改，产生副作用，执行一遍副作用列表内的函数
      dep.notify();
    },
  });
});

console.log(total); // 20
// 修改price
data.price = 20;

// 得到price修改副作用生效后的新的total
console.log(total); // 40

setTimeout(() => {
  data.price = 30;
  console.log(total); // 60
}, 1000);
