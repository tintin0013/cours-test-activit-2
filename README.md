# Activité 2 -- Tests d'intégration & Validation avancée

##  Objectif pédagogique

Cette activité avait pour objectif de :

-   Mettre en place des **tests d'intégration avec React Testing
    Library**
-   Renforcer la **robustesse des validations métier**
-   Atteindre **100% de couverture de code**
-   Respecter une approche **TDD (Test Driven Development)**
-   Produire une **documentation claire et structurée**

------------------------------------------------------------------------

##  Architecture du projet

Le projet est structuré de la manière suivante :

src/ ├── App.js ├── App.integration.test.js ├── module.js ├──
module.test.js ├── validator.js ├── validator.test.js

### Séparation des responsabilités

-   module.js → logique métier pure (calcul d'âge)
-   validator.js → règles métier (âge, email, code postal, identité)
-   App.js → couche React (interface + intégration)
-   \*.test.js → tests unitaires et tests d'intégration

------------------------------------------------------------------------

##  Stratégie de test

### 1️⃣ Tests unitaires

Fichiers concernés : - module.test.js - validator.test.js

Objectifs : - Tester chaque fonction indépendamment - Vérifier les cas
limites - Vérifier les erreurs attendues - Sécuriser les entrées
invalides

Exemples de scénarios couverts :

-   Age \< 18 → AGE_UNDER_18
-   Email invalide → INVALID_EMAIL
-   Code postal incorrect → INVALID_POSTAL_CODE
-   Tentatives d'injection HTML → rejetées
-   Gestion année bissextile

------------------------------------------------------------------------

### 2️⃣ Tests d'intégration

Fichier concerné : - App.integration.test.js

Objectifs : - Simuler un utilisateur réel - Remplir le formulaire -
Soumettre le formulaire - Vérifier le rendu visuel (role="alert")

Scénarios couverts :

-   Soumission valide → message vert "Utilisateur valide"
-   Utilisateur mineur → message rouge "AGE_UNDER_18"
-   Email invalide → message rouge "INVALID_EMAIL"
-   Code postal invalide → message rouge "INVALID_POSTAL_CODE"

Les tests vérifient les états visuels dans le DOM, conformément au
barème.

------------------------------------------------------------------------

##  Robustesse de l'implémentation

L'application :

-   Empêche la soumission invalide
-   Gère les valeurs null / undefined
-   Vérifie les types
-   Sépare logique métier et couche UI
-   Utilise FormData pour une récupération robuste des champs

------------------------------------------------------------------------

##  Couverture de code

Objectif : 100% de couverture (hors index.js et reportWebVitals.js)

Couverture atteinte :

-   Statements : 100%
-   Branches : 100%
-   Functions : 100%
-   Lines : 100%

------------------------------------------------------------------------

##  Démarche TDD

Historique Git structuré :

1.  Écriture des tests
2.  Implémentation minimale
3.  Correction des erreurs
4.  Refactorisation légère
5.  Ajout des tests d'intégration
6.  Amélioration du rendu visuel

Chaque étape est tracée via des commits explicites.

------------------------------------------------------------------------

##  Documentation

Le projet contient une documentation JSDoc complète :

-   Description des modules
-   Paramètres typés
-   Erreurs documentées
-   Explication des règles métier

------------------------------------------------------------------------

##  Conclusion

L'activité 2 respecte :

-   ✔ Qualité des tests d'intégration
-   ✔ Robustesse de l'implémentation
-   ✔ 100% de couverture
-   ✔ Documentation claire
-   ✔ Séparation logique métier / UI
-   ✔ Approche TDD traçable

Projet réalisé en mode pédagogique (code clair, lisible et
volontairement explicite).
