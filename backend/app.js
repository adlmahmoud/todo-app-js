const express = require('express');
const app = express();
const port = 8080

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({msg:"Todo App Test"})
});
// lancer le serveur
app.listen(port, () => {
    console.log(`Serveur listening on port ${port}`)
});
