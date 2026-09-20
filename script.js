// Clé pour le LocalStorage
const STORAGE_KEY = 'tp_jokes_data';

// Éléments du DOM
const jokeForm = document.getElementById('joke-form');
const radioAny = document.getElementById('cat-any');
const radioCustom = document.getElementById('cat-custom');
const customCheckboxes = document.querySelectorAll('.custom-cat');
const jokesTableBody = document.getElementById('jokes-tbody');
const clearAllBtn = document.getElementById('clear-all');

// Données initialisées depuis le LocalStorage
let jokesList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Active ou désactive les cases selon l'option Any ou Custom
function toggleCustomCheckboxes() {
  const isCustom = radioCustom.checked;
  customCheckboxes.forEach((cb) => {
    cb.disabled = !isCustom;
  });
}

radioAny.addEventListener('change', toggleCustomCheckboxes);
radioCustom.addEventListener('change', toggleCustomCheckboxes);

// Récupère la chaîne de catégories pour l'URL JokeAPI
function getSelectedCategories() {
  if (radioAny.checked) {
    return 'Any';
  }

  const checkedBoxes = Array.from(customCheckboxes).filter((cb) => cb.checked);

  if (checkedBoxes.length === 0) {
    alert('Veuillez cocher au moins une catégorie dans le mode Custom.');
    return null;
  }

  // Renvoie par exemple "Programming,Misc"
  return checkedBoxes.map((cb) => cb.value).join(',');
}

// Met à jour le stockage et réaffiche le tableau HTML
function updateTable() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokesList));
  jokesTableBody.innerHTML = '';

  jokesList.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><span class="badge bg-secondary">${item.category}</span></td>
      <td>${item.text}</td>
      <td>
        <button class="btn btn-sm btn-danger btn-delete" data-index="${index}">
          Supprimer
        </button>
      </td>
    `;
    jokesTableBody.appendChild(row);
  });
}

async function fetchJoke(categoryParam) {
  const flags = 'nsfw,religious,political,racist,sexist,explicit';
  const url = `https://v2.jokeapi.dev/joke/${categoryParam}?lang=fr&blacklistFlags=${flags}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Si l'API renvoie une erreur (ex: aucune blague FR trouvée dans cette catégorie)
    if (data.error) {
      alert(`L'API JokeAPI ne contient actuellement aucune blague en français pour la sélection : "${categoryParam}" avec les filtres de sécurité activés.`);
      return;
    }

    // Gestion du format single ou twopart
    let jokeText = '';
    if (data.type === 'single') {
      jokeText = data.joke;
    } else {
      jokeText = `<strong>${data.setup}</strong><br>${data.delivery}`;
    }

    // Ajout au tableau
    jokesList.unshift({
      category: data.category,
      text: jokeText
    });

    console.table(jokesList);
    updateTable();

  } catch (error) {
    console.error('Erreur réseau ou technique :', error);
  }
}

// Suppression individuelle
function deleteJoke(index) {
  jokesList.splice(index, 1);
  updateTable();
}

// Suppression totale
clearAllBtn.addEventListener('click', () => {
  if (jokesList.length > 0 && confirm('Vider l’intégralité du tableau ?')) {
    jokesList = [];
    updateTable();
  }
});

// Écouteur de soumission du formulaire
jokeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const categories = getSelectedCategories();
  if (categories) {
    fetchJoke(categories);
  }
});

// Chargement initial
updateTable();