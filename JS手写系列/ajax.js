const addUrl = (_url, param) => {
  let url = _url;
  if (param && Object.keys(param).length) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    Object.keys(param).forEach((key) => {
      url += `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`;
    });
  }
  return url;
};

function ajax({
  url = '',
  method = 'GET',
  data = {},
  header = {},
  async = false,
  timeout = 5 * 1000,
  onSuccess,
  onError,
  onTimeout,
}) {
  const requestURL = method === 'GET' ? addUrl(url, data) : url;
  const sendData = method === 'GET' ? null : data;

  const xhr = new XMLHttpRequest();
  xhr.open(method, requestURL, async);

  if (header && Object.keys(header).length) {
    Object.keys(header).forEach((key) => {
      xhr.setRequestHeader(key, header[key]);
    });
  }

  xhr.onload = () => {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        onSuccess(xhr.responseText);
      } else {
        onError(xhr.status + xhr.statusText);
      }
    } catch (err) {
      onError(err);
    }
  };
  xhr.timeout = timeout;
  xhr.ontimeout = onTimeout
    || function () {
      console.error('request timeout');
    };

  xhr.send(sendData);
}
