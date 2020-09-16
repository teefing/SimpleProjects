import './style/global.less';
import { add } from './math';

console.log('hello world');
async function asyncFunc() {
  return add(2, 3);
}
async function func() {
  const res = await asyncFunc();
  console.log(res);
}

func();
