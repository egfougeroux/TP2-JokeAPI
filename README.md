# TP - 02 : Formulaire pour requêter une API distante (JokeAPI)

**Nom :** Emma-Gabrielle FOUGEROUX <br>
**Classe :** BTS SIO SLAM2

---

## Présentation du projet
Ce projet a été réalisé dans le cadre du module **Bloc 2 (BTS SIO SLAM 2)**.  
Il s'agit d'une application web dynamique permettant d'interroger l'API distante **JokeAPI** via des requêtes HTTP asynchrones, et de présenter les données sous la forme d'un tableau interactif disposant de fonctions d'édition et de sauvegarde locale.

## Choix techniques
* **Framework CSS** : Bootstrap 5 (intégré par CDN) pour une mise en page claire et responsive.
* **JavaScript** :
  * API `fetch` avec `async/await` pour la consommation asynchrone des données HTTP.
  * Manipulation du DOM pour l'injection dynamique des lignes `<tr>`.
  * `console.table()` pour tracer l'état du tableau dans la console.
* **Filtres de sécurité appliqués** :
  * Langue : Français (`lang=fr`).
  * Drapeaux exclus : `nsfw,religious,political,racist,sexist,explicit`.
* **Bonus réalisés** :
  * Sélection de la catégorie via des boutons radio et des cases à cocher personnalisées (Programming, Misc, Dark, Pun, Spooky, Christmas).
  * Persistance des données et synchronisation via l'API `localStorage`.
---
### Lien vers le dépôt GitHub :

[https://github.com/egfougeroux/TP2-JokeAPI](https://github.com/egfougeroux/TP2-JokeAPI.git)

