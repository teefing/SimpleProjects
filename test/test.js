let str = 'https://www.abchina.com/abcpay%7c15742221896203989558%261111%26new*http%3a%2f%2factivity.m.duibatest.com.cn%2fchw%2fabc%2ftranfer%3forderId%3d1161154323650220528'
let res = str.match(/^.*abcpay%7c(\d*)%26\d*%26new\*(http.*)$/)
console.log(res);