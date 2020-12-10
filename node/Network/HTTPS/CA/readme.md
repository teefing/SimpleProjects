```
$ openssl genrsa -out ca.key 1024 生成CA的私钥
$ openssl req -new -key ca.key -out ca.csr 生成CA的证书签名请求文件，可以理解为公钥
$ openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt CA自己给自己签名，生成证书
```
