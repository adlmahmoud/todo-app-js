const API_URL = "http://localhost:8080/router";

const listElement = document.getElementById("todo-list");
const inputElement = document.getElementById("tache-input");
const btnElement = document.getElementById("add-btn");
const errorElement = document.getElementById("error-message");

// Fonction utilitaire pour afficher les erreurs (Etape 6 du TP)
function showError(message) {
    errorElement.textContent = "Erreur fatale : " + message;
    errorElement.classList.remove("hidden");
    setTimeout(() => errorElement.classList.add("hidden"), 5000);
}

async function fetchTaches() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const taches = await response.json();
        listElement.innerHTML = "";

        if (Array.isArray(taches)) {
            taches.forEach(tache => {
                const li = document.createElement("li");
                li.id = `tache-${tache.id}`; // IMPORTANT: Il faut un ID pour le PUT/DELETE

                const spanText = document.createElement("span");
                spanText.textContent = tache.message;

                const actionDiv = document.createElement("div");

                // Bouton Modifier (PUT)
                const editBtn = document.createElement("button");
                editBtn.textContent = "EDIT";
                editBtn.className = "btn-edit";
                editBtn.onclick = () => modifierTache(tache.id, tache.message);

                // Bouton Supprimer (DELETE)
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "BAM!";
                deleteBtn.className = "btn-delete";
                deleteBtn.onclick = (e) => animerEtSupprimer(tache.id, li);

                actionDiv.appendChild(editBtn);
                actionDiv.appendChild(deleteBtn);

                li.appendChild(spanText);
                li.appendChild(actionDiv);
                listElement.appendChild(li);
            });
        }
    } catch (error) {
        showError("Impossible de charger les missions.");
        console.error(error);
    }
}

async function ajouterTache() {
    const message = inputElement.value.trim();
    if (!message) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        if (response.status === 201) {
            inputElement.value = "";
            fetchTaches(); // On rafraîchit la liste
        } else {
            showError("Le serveur a rejeté la mission.");
        }
    } catch (error) {
        showError("Le serveur ne répond pas.");
    }
}

// L'animation JS de l'univers Invincible
function animerEtSupprimer(id, elementLi) {
    // 1. On secoue violemment l'élément
    elementLi.classList.add("shake");

    // 2. On crée le texte d'impact
    const impact = document.createElement("div");
    impact.textContent = "SPLAASH!";
    impact.className = "impact-text";
    elementLi.appendChild(impact);

    // 3. On anime le texte avec l'API Web Animations native de JS
    impact.animate([
        { transform: 'translate(-50%, -50%) scale(0)' },
        { transform: 'translate(-50%, -50%) scale(1.5)' }
    ], {
        duration: 200,
        fill: 'forwards'
    });

    // 4. Après l'animation, on lance la vraie suppression backend
    setTimeout(() => {
        supprimerTache(id);
    }, 400); // On attend la fin du "shake"
}

// Fonction DELETE pour valider le TP
async function supprimerTache(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchTaches();
        } else {
            showError("Impossible d'éliminer la cible.");
        }
    } catch (error) {
        console.error(error);
    }
}

// Fonction PUT pour valider le TP
async function modifierTache(id, ancienMessage) {
    const nouveauMessage = prompt("Modifier la mission :", ancienMessage);
    if (!nouveauMessage || nouveauMessage === ancienMessage) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: nouveauMessage })
        });
        if (response.ok) {
            fetchTaches();
        } else {
            showError("Mise à jour échouée.");
        }
    } catch (error) {
        console.error(error);
    }
}

btnElement.addEventListener("click", ajouterTache);
// Permettre de valider avec la touche Entrée
inputElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        ajouterTache();
    }
});

fetchTaches();