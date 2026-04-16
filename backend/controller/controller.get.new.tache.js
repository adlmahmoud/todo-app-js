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
module.exports.setPost = async (req, res) => {
 if (!req.body.message) {
     res.status(400).json({message:"Error Desoler le sang" });
 }
}