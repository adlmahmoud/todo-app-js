const express = require('express');
const router = express.Router();
// ajouter une tache
router.get("/",(req,res)=>{
    res.json({msg:"Tache ajouter"})
});
// modifier
router.post("/",(req,res)=>{
    res.json({message : req.body.msg});
});
// Mettre a jour
router.put("/:id",(req,res)=>{
    res.json({messageId : req.params.id});
})
// suprimer
router.delete("/:id",(req,res)=>{
    res.json({message :"Tache supp" + req.params.id});
})
module.exports=router;
