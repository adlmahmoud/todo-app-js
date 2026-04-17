/*
Le bute de ./router/routes.js c'est de creer des routes pour le serveur
creer un get pour recuperer les donnees l'api localhost:8080 dans postman
creer un post pour pouvoir modifier,creer les donner
creer un put pour mettre ajour les donnees
creer un delete pour supprimer les donnees
 */
const express = require('express');
const {setPost} = require("../controller/controller.get.new.tache");
const router = express.Router();

router.get("/",(req,res)=>{
    res.json({msg:"Tache ajouter"})
});

// ajouter une tache
router.post("/",setPost);
// Mettre à jour
router.put("/:id",(req,res)=>{
    res.json({messageId : req.params.id});
})
// supprimer
router.delete("/:id",(req,res)=>{
    res.json({message :"Tache supp" + req.params.id});
})
module.exports=router;
