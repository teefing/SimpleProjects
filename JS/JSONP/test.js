function JSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `callback_${Date.now()}`;
    const script = document.createElement('script');

    script.src = `${url}${url.indexOf('?') > -1 ? '&' : '?'}callback=${callbackName}`;
    document.body.appendChild(script);
    window[callbackName] = function (res) {
      delete window[callbackName];
      script.remove();
      resolve(res);
    };
    script.onerror = function (e) {
      delete window[callbackName];
      script.remove();
      reject(e);
    };
  });
}

JSONP('http://localhost:3001?a=1&b=2').then((res) => {
  console.log(res);
});
