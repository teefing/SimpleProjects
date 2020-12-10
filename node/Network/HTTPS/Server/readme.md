```
$ openssl genrsa -out server.key 1024 生成服务端的私钥
$ openssl req -new -key server.key -out server.csr 生成服务端的证书签名请求文件，可以理解为公钥
$ openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt 在CA端，使用CA的证书和私钥对服务端的公钥进行签名得到服务端的证书
```
