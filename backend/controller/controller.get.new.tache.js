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
const path = require("path");
const fichierJSON = path.join(__dirname, "todolist.json");  //declarer le fichierjson

module.exports.setPost = (req, res) => {

    // Gestions de l'erreurs tkt Vigoat
    if (!req.body.message) {
        return res.status(400).json({ erreur: "Veuillez fournir un message" });
    }

    try {
        const data = fs.readFileSync(fichierJSON, "utf8");
        // convertir le fichier json
        const todolist = JSON.parse(data);

        const nouvelleTache = {
            id: Date.now(),
            message: req.body.message,
            terminee: false
        };

        todolist.push(nouvelleTache);

        fs.writeFileSync(fichierJSON, JSON.stringify(todolist, null, 2));

        return res.status(201).json({ message: "Succès", tache: nouvelleTache });

    } catch (error) {
        return res.status(500).json({ erreur: "Erreur serveur" });
    }
};