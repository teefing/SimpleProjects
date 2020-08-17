const BASE_SERVER_ADDRESS = 'http://localhost:3001';

function JSONP(url) {
  return new Promise((resolve, reject) => {
    let script;
    const callbackFuncName = `jsonp_callback_${Date.now()}`;
    window[callbackFuncName] = (res) => {
      resolve(res);
      script.remove();
      delete window[callbackFuncName];
    };
    script = document.createElement('script');
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    params.append('callback', callbackFuncName);
    script.src = `${BASE_SERVER_ADDRESS}?${params.toString()}`;
    script.id = callbackFuncName;
    document.body.append(script);
    script.onerror = function (e) {
      reject(e);
      script.remove();
      delete window[callbackFuncName];
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
