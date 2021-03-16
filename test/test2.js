let requestList = {
  A: true,
  B: true,
  C: false,
  D: true
}

function request(key, res){
  let p = new Promise((resolve, reject) => {
    if(res) {
      // 如果请求成功就将请求从待请求对象中去除
      console.log('resolve', key)
      resolve(key)
      delete requestList[key]
    } 
    else {
      // 请求失败则保留请求在待请求对象中
      console.log('reject', key)
      reject(key)
    } 
  })
  return p
}

function retry(times = 5){
  return Promise.all(Object.keys(requestList).map(key => {
    let res = requestList[key]
    return request(key, res)
  })).then(res => {
    return 'success'
  }).catch(err => {
    if(times >= 1) return retry(times - 1)
    else throw('fail')
  })
}

retry().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})


