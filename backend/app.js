const express = require('express');
const app = express();
const port = 8080

app.get('/', (req, res) => {res.send('Welcome to my app suuuu lets go!')})
app.listen(port, () => {console.log(`Serveur listening on port ${port}`)});