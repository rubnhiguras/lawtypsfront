# LawTyps Soluciones jurídicas

El nombre de la aplicaciónes provisional. Para más información, en la herramienta hay más detalle.

Despliegue actual: https://latest-dev.du3wj771srgbj.amplifyapp.com/

Entorno web diseñado e implementado con React TS.

Para ejecutar la herramienta en un entorno en local, es necesario instalar node.js y react ts mediante comandos.

La base de datos provisional es Firebase cuya conexión se puede detectar en /services/Firenase/FirebaseService.ts y es la siguiente:

```js
const firebaseConfig = {
    apiKey: "AIzaSyChxUoqZZtdZTpN5F8Fg9yO8l_2K2vdmL0",
    authDomain: "lawt-a9eab.firebaseapp.com",
    projectId: "lawt-a9eab",
    storageBucket: "lawt-a9eab.appspot.com",
    messagingSenderId: "259318949322",
    appId: "1:259318949322:web:7b202337df585bc3f51b33"
};
```

Dicha información de conexión será sustituida por variables de entorno según dónde se vaya a desplegar.

 
