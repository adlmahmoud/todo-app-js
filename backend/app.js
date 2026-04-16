const express = require('express');
const app = express();
const port = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/routes", require("./router/routes"));
// lancer le serveur
app.listen(port, () => {
    console.log(`Serveur listening on port ${port}`)
});
