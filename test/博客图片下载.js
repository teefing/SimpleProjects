const fs = require("fs");
const path = require("path");
const request = require('request')
const file = fs.readFileSync(path.resolve(__dirname, "./浏览器渲染原理.md")).toString('utf-8');

const paths = []
file.replace(/!\[.*\]\((.+)\)/g, function(substring, p1) {
  paths.push(p1)
})

paths.forEach((url) => {
  const filename = url.replace('https://mmbiz.qpic.cn/mmbiz_png/', '').replace('/640?wx_fmt=png', '')
  request(url).pipe(fs.createWriteStream(path.join(__dirname, './img', `./wx_${filename}.png`))).on('close', function(err){
    console.log(`文件[wx_${filename}.png]下载完毕`);
  })
})