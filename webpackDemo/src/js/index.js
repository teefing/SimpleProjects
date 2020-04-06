import 'src/style/index.less';
import 'src/style/index2.less';
import $ from 'jquery';

function add(x, y) {
  return x + y;
}

const a = 1;
add(a, 6);

Promise.resolve().then(() => {
  window.console.log(11);
});

window.console.log($);

/**
  使用动态模块导入可以让指定文件被单独打包成一个chunk
  使用方法: 1. 使用import语法
          2. 需要安装 npm i babel-plugin-dynamic-import-webpack -D
          3. 在babel-loader的options中加入
                  babelrc: false,
                  plugins: [
                    'dynamic-import-webpack',
                  ],
          4. 如果配置了eslint-loader，需要npm i babel-eslint -D，并在.eslintrc中加入parser: "babel-eslint"
        //!   5. 默认的打包模块的名称都为数字，可以配置webpackChunkName来重命名,但是我失败了
 */
import(
  /* webpackChunkName: "print" */
  './print'
)
  .then(({ default: print }) => {
    print();
  })
  .catch(() => {
    window.console.log('load failed');
  });

setTimeout(() => {
  /*
    正常加载： 直接并行加载所有文件
    懒加载： 文件需要使用才加载
    预加载： 会在其他资源加载完毕后，在浏览器空闲时加载
  */
  import(
    /* webpackChunkName: "test", webpackPrefetch: true */
    './test'
  ).then(({ default: test }) => {
    test();
  }).catch(() => {
    window.console.log('load failed');
  });
}, 1000);

// eslint-disable-next-line
console.log(add(1, 1));

// eslint-disable-next-line
console.log(_.add(1, 2, 3));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        window.console.log('sw注册成功');
      }).catch(() => {
        window.console.log('sw注册失败');
      });
  });
}
