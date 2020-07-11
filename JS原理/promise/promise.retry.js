Promise.retry = function(getData, times, delay) {
  return new Promise((resolve, reject) => {
    function attempt() {
      getData()
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          if (times === 0) {
            reject(err)
          } else {
            times--
            setTimeout(attempt, delay)
          }
        })
    }
    attempt()
  })
}