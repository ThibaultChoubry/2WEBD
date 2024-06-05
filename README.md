# SupMuseum - ReadMe

## Introduction

SupMuseum est une application web qui présente des œuvres d'art en vedette de l'API de la collection du Metropolitan Museum of Art. L'application permet aux utilisateurs d'effectuer des recherches rapides et avancées pour découvrir diverses œuvres d'art et consulter des informations détaillées sur chaque pièce.

## Installation

### Prérequis

- Assurez-vous d'avoir Node.js et npm (Node Package Manager) installés sur votre machine. Vous pouvez télécharger et installer Node.js depuis https://nodejs.org/, ce qui inclut npm.

### Étapes

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/ThibaultChoubry/2WEBD
   cd 2WEBD
   ```

2. **Installer les dépendances** :
   Naviguez dans le répertoire du projet et installez les paquets npm nécessaires :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   Démarrez le serveur de développement pour exécuter l'application en local :
   ```bash
   npm run dev
   ```

   L'application sera accessible par défaut à l'adresse `http://localhost:5173`.

## Structure du projet

- `src/` : Contient le code source de l'application.
  - `pages/` : Contient les composants des pages pour les différentes routes.
  - `App.tsx` : Le composant principal de l'application.
  - `index.tsx` : Point d'entrée de l'application React.
  - `home.css` : Styles pour la page d'accueil.

## Utilisation

### Recherche rapide

- Tapez une requête de recherche dans la barre de recherche.
- Des suggestions apparaîtront sous la barre de recherche au fur et à mesure que vous tapez.
- Cliquez sur une suggestion pour remplir automatiquement la barre de recherche et exécuter la recherche.
- Soumettez le formulaire de recherche pour afficher les résultats.

### Recherche avancée

- Cliquez sur le bouton "Recherche avancée" pour naviguer vers la page de recherche avancée.
- Remplissez les critères de recherche souhaités et soumettez le formulaire pour afficher les résultats.

### Visualisation des œuvres

- La page d'accueil affiche des œuvres d'art en vedette.
- Cliquez sur le bouton "Détails" de n'importe quelle œuvre pour voir plus de détails sur cette pièce.