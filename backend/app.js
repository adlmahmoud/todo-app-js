/*
Bon dans app.js sert a lancer le express serveur en a utiliser la dependance express.
Ensuite en a installer nodemon, le but c'est que a chaque modeifications dans un fichier pas besoin de relancer le serveur
Apres en a fait appele au routes (j'ai regarder une video pour mieux comprendre)
 */
const express = require('express');
const app = express();
const port = 8080
// Permettre la discussions entre fichier
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Relier les routes avec app.js
app.use("/router", require("./router/routes"));

// relier le frontend avec le serveur
app.use(express.static(path.join(__dirname, '../frontend')));
// lancer le serveur
app.listen(port, () => {
    console.log(`Serveur listening on port ${port}`)
});
