// On pointe vers l'URL exacte que nous avons configurée dans ton backend
const API_URL = "http://localhost:8080/router";

// On récupère nos éléments HTML
const listElement = document.getElementById("todo-list");
const inputElement = document.getElementById("tache-input");
const btnElement = document.getElementById("add-btn");

// 1. LIRE LES DONNÉES (Méthode GET)
async function fetchTaches() {
    try {
        // fetch lance par défaut une requête GET
        const response = await fetch(API_URL);
        const taches = await response.json();

        // On vide la liste actuelle avant de la re-remplir
        listElement.innerHTML = "";

        // Si ton backend renvoie bien un tableau, on boucle dessus
        if (Array.isArray(taches)) {
            taches.forEach(tache => {
                const li = document.createElement("li");
                li.textContent = tache.message;
                listElement.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    }
}

// 2. ENVOYER DES DONNÉES (Méthode POST)
async function ajouterTache() {
    const message = inputElement.value;

    // On ne fait rien si le champ est vide
    if (!message) return;

    try {
        // Pour un POST, on doit spécifier la méthode, les headers (pour dire qu'on envoie du JSON), et le body
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message }) // On transforme notre objet JS en texte JSON
        });

        if (response.status === 201) {
            inputElement.value = ""; // On vide le champ
            fetchTaches(); // On rafraîchit la liste pour voir la nouvelle tâche
        } else {
            console.error("Erreur serveur : Le backend n'a pas renvoyé le statut 201");
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
    }
}

// 3. ÉCOUTER LE CLIC SUR LE BOUTON
btnElement.addEventListener("click", ajouterTache);

// 4. CHARGER LA LISTE AU DÉMARRAGE
fetchTaches();