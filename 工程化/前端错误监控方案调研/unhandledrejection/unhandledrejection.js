window.addEventListener('unhandledrejection', function (e) {
  // 阻止进一步上报
  e.preventDefault()
  console.log(e);

  return true
})

Promise.reject('promise error');