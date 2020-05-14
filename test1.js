url = 'https://yun.duiba.com.cn/kjy/media/file/20200416/6f9fc4aa4949b15cf320aa2158d18264.pdf';
shareImg = '//yun.duiba.com.cn/kjy/image/20200416/1587034086320.jpg';
title = '标题';
desc = '';
function encodeTwice(data) {
  return encodeURIComponent(encodeURIComponent(data));
}

finalUrl = `https://kjj.m.duiba.com.cn/pages/file-preview/index?url=${url}&shareImg=${shareImg}&title=${encodeTwice(title)}&desc=${desc}`;
console.log(finalUrl);

console.log(encodeURIComponent('https://kjj.m.duiba.com.cn/pages/file-preview/index?url=https://yun.duiba.com.cn/kjy/media/file/20200416/6f9fc4aa4949b15cf320aa2158d18264.pdf&shareImg=//yun.duiba.com.cn/kjy/image/20200416/1587034086320.jpg&title=标题&desc=描述'));

https://kjj.m.duibatest.com.cn/pages/file-preview/index?url=https%3A%2F%2Fyun.duiba.com.cn%2Fkjy%2Fmedia%2Ffile%2F20200416%2F6f9fc4aa4949b15cf320aa2158d18264.pdf&shareImg=%2F%2Fyun.duiba.com.cn%2Fkjy%2Fimage%2F20200416%2F1587034086320.jpg&title=%E6%A0%87%E9%A2%98&desc=%E6%8F%8F%E8%BF%B0