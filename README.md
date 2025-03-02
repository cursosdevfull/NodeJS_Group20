# NodeJS con https

### Generar los certificados
```sh
openssl genrsa -out certificates/curso-nodejs20.pem 2048
openssl req -new -x509 -key certificates/curso-nodejs20.pem -out certificates/curso-nodejs20-public.pem -days 365

```