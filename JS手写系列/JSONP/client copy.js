const BASE_SERVER_ADDRESS = 'http://localhost:3001';

function JSONP(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = `jsonp_callback_${Date.now()}`;
    window[callbackName] = function (res) {
      resolve(res);
      script.remove();
      delete window[callbackName];
    };

    const param = new URL(url).searchParams;
    param.append('callback', callbackName);

    script.src = `${BASE_SERVER_ADDRESS}?${param.toString()}`;
    document.body.append(script);

    script.onerror = function (e) {
      reject(e);
      script.remove();
      delete window[callbackName];
    };
  });
}

async function init() {
  const res = await JSONP(`${BASE_SERVER_ADDRESS}?name=tengfei&age=23`);
  console.log(res);
}
init();

document.querySelector('#btn').addEventListener('click', () => {
  init();
});
