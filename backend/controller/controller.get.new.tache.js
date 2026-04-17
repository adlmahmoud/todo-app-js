/*
Donc se que je me suis dit logiquement l'utilisateurs vas rentrer une donnees donc il faut l'enregistrer je me suis dit
dans le fichier todolist.json apres je doit l'apeller pour pouvoir l'afficher dans je doit le mettre dans la route post
vue que c'est l'as bas que en modifie les donnees de l'api.
Se que je doit poser comme questions pour Vigoat:
1- Esque mes routes n'ont pas de prblm si oui, pk?
2- comment faire pour tout enregistrer dans le fichier json logiquement il faut des models.
3- Esque je doit utiliser la dependance "fs" pour lire dans le fichier json.
4- comment faire pour le reste tout simplement.
4-(pour moi) n'oublie pas d'expliquer se que tu as fait.
 */
// Utiliser la dependance fs
const fs = require("fs");
const path = "./todolist.json";

// La fonctions setPost pour ajouter du contenue dans todolist.json
module.exports.setPost = (req, res) => {
    // gerer l'erreur
    if (!req.body.message) {
        return res.status(400).json({ message: "Veuillez fournir un message" });
    }
    // try catch pour gerer les erreurs tkt Vito j'essaye de gerer les erreures
    try {
        // Lire le fichier todolist.json avec la fonctions readFileSync qui est deja async
        const data = fs.readFileSync(path, "utf8");
        // Traduire le fichier json pour ajouter les donnees facilement
        const todolist = JSON.parse(data);
        // declarer le models si j'ai bien compris j'ai utiliser une doc
        const nouvelleTache = {
            id: Date.now(),
            message: req.body.message,
            terminee: false
        };
        // Push le model dans le fichier json
        todolist.push(nouvelleTache);
        // Ecrire a la fin du fichier json se que l'utilisateur a rajouter
        fs.writeFileSync(path, JSON.stringify(todolist, null, 2));
        // retourner le 200 OK
        return res.status(201).json({ message: "Succès", tache: nouvelleTache });
      // catch l'erreur
    } catch (error) {
        return res.status(500).json({ erreur: "Erreur serveur" });
    }
};