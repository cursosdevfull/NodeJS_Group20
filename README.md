# Instalación de dependencias

### Dependencias del proyecto
```sh
npm install --save <nombre de la librería>@<versión>
npm i --save <nombre de la librería>@<versión>
npm i <nombre de la librería>@<versión>
```

### Dependencias de desarrollo
```sh
npm install --save-dev <nombre de la librería>@<versión>
npm i --save-dev <nombre de la librería>@<versión>
npm i -D <nombre de la librería>@<versión>
```
### Dependencias peer
```sh
npm install --save-peer <nombre de la librería>@<versión>
npm i --save-peer <nombre de la librería>@<versión>
```
### Dependencias globales
```sh
npm install --global <nombre de la librería>@<versión>
npm i -g <nombre de la librería>@<versión>
```
### Dependencias exactas
```sh
npm i <nombre de la librería>@<versión> --save-exact
```

### Listar dependencias globales
```sh
npm list --global
npm list -g
```
### Listar dependencias
```sh
npm list
```

### Desinstalación de dependencias
```sh
npm uninstall <nombre de la librería>
npm uninstall <nombre de la librería> -g
```
### Instalar todas las dependencias
```sh
npm install
npm i
```

### No instalar las dependencias de desarrollo
```sh
npm install --omit dev
npm i --omit dev
```
### No instalar las dependencias de desarrollo ni las peer
```sh
npm install --omit dev --omit peer
npm i --omit dev --omit peer
```

### Instalación de librerías usando CI
```sh
npm ci
```

### Ejecutor de paquetes
```sh
npx <nombre del paquete>@<version>
```