/*
Bon dans app.js sert a lancer le express serveur en a utiliser la dependance express.
Ensuite en a installer nodemon, le but c'est que a chaque modeifications dans un fichier pas besoin de relancer le serveur
Apres en a fait appele au routes (j'ai regarder une video pour mieux comprendre)
 */
const express = require('express');
const app = express();
const port = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Relier les routes avec app.js
app.use("/router", require("./router/routes"));
// lancer le serveur
app.listen(port, () => {
    console.log(`Serveur listening on port ${port}`)
});
