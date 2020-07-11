const http = require("http");
const formidable = require('formidable')

function show(res) {
  const html = `<form method="post" action="/" enctype="multipart/form-data">
  <p><input type="text" name="name"></p>
  <p><input type="file" name="file"></p>
  <p><input type="submit" value="Upload"></p>
  </form>`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function isFormData (req) {
  const type = req.headers['content-type'] || ''
  return 0 === type.indexOf('multipart/form-data')
}
function upload (req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400
    res.end('Bad Request: expecting multipart/form-data')
    return
  }

  const form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    console.log(fields)
    console.log(files);
    res.end('upload complete!')
  })

  form.on('progress', function (bytesReceived, bytesExpected) {
    const percent = Math.floor(bytesReceived / bytesExpected * 100)
    console.log(percent);
  })
}

function badRequest (res) {
  res.statusCode = 400
  res.setHeader('Content-Type', 'text/plain')
  res.end('Bad Request')
}

const server = http.createServer(function (req, res) {
  switch (req.method) {
    case "GET":
      show(res, res);
      break;
    case "POST":
      upload(req, res);
      break;
    default:
      badRequest(res);
  }
});

server.listen(3000);
