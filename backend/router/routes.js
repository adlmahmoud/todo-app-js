/*
Le bute de ./router/routes.js c'est de creer des routes pour le serveur
creer un get pour recuperer les donnees l'api localhost:8080 dans postman
creer un post pour pouvoir modifier,creer les donner
creer un put pour mettre ajour les donnees
creer un delete pour supprimer les donnees
Bon j'avais un prblm niveau router et controller donc j'ai demander a un ami qui est chaud en js donc voila :)
Parcontre c'est une masterclasse de coder sans IA
 */
const express = require("express");
const fs = require("fs");                          // Pour lire/écrire des fichiers
const path = require("path");                      // Pour construire des chemins
const { setPost } = require("../controller/controller.get.new.tache");

const router = express.Router();
const fichierJSON = path.join(__dirname, "../controller/todolist.json");

// Récupérer toutes les tâches
router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(fichierJSON, "utf8");
        const todolist = JSON.parse(data);
        res.status(200).json(todolist);
    } catch (error) {
        res.status(500).json({ erreur: "Impossible de lire les tâches" });
    }
});

// Ajouter une tâche
router.post("/", setPost);

//Mettre à jour une tâche (par son id)
router.put("/:id", (req, res) => {
    try {
        const data = fs.readFileSync(fichierJSON, "utf8");
        const todolist = JSON.parse(data);

        // On cherche la tâche avec l'id dans l'URL
        const index = todolist.findIndex(t => t.id === parseInt(req.params.id));

        if (index === -1) {
            return res.status(404).json({ erreur: "Tâche introuvable" });
        }

        // met à jour le message
        todolist[index].message = req.body.message || todolist[index].message;
        todolist[index].terminee = req.body.terminee ?? todolist[index].terminee;

        fs.writeFileSync(fichierJSON, JSON.stringify(todolist, null, 2));
        res.status(200).json({ message: "Tâche mise à jour", tache: todolist[index] });
    } catch (error) {
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

// Supprimer une tâche
router.delete("/:id", (req, res) => {
    try {
        const data = fs.readFileSync(fichierJSON, "utf8");
        let todolist = JSON.parse(data);

        todolist = todolist.filter(t => t.id !== parseInt(req.params.id));

        fs.writeFileSync(fichierJSON, JSON.stringify(todolist, null, 2));
        res.status(200).json({ message: "Tâche supprimée" });
    } catch (error) {
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

module.exports = router;