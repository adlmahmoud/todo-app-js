const express = require('express');
const {setPost} = require("../controller/controller.get.new.tache");
const router = express.Router();
// ajouter une tache
router.get("/",(req,res)=>{
    res.json({msg:"Tache ajouter"})
});

router.post("/",setPost);
// Mettre a jour
router.put("/:id",(req,res)=>{
    res.json({messageId : req.params.id});
})
// suprimer
router.delete("/:id",(req,res)=>{
    res.json({message :"Tache supp" + req.params.id});
})
module.exports=router;
