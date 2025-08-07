# Application web de gestion des clients et des produits – Banque Alimentaire des Côtes d'Armor : Rayon22

Rayon22 est une application web conçue pour moderniser et simplifier les échanges entre les bénéficiaires et la Banque Alimentaire des Côtes d'Armor.

Elle offre une interface intuitive et ergonomique permettant :

- Aux bénéficiaires : de créer un compte, transmettre les documents nécessaires à l’étude de leur éligibilité, échanger avec les gestionnaires et effectuer des commandes en ligne.

- Aux administrateurs : de gérer les bases de données des utilisateurs et des produits, de traiter les demandes d’éligibilité, et de répondre aux messages des bénéficiaires.

Cette plateforme vise à fluidifier la gestion administrative tout en améliorant l'expérience utilisateur, dans le respect des normes de confidentialité et d’accessibilité.


## 📂 Table des matières
- [Guide d'installation](#📥-guide-dinstallation)
    - [Cloner le projet](#💻-1-cloner-le-projet-mode-développeur)
    - [Exécutable Electron](#▶️-2-utiliser-lexécutable-electron-mode-simplifié)
- [Guide d'utilisation](#🧑‍💼-guide-dutilisation)
    - [Gestion des utilisateurs](#👥-gestion-des-utilisateurs)
    - [Gestion des produits](#🧾-gestion-des-produits)
- [Guide de programmation](#🧑‍💻-guide-de-programmation)
    - [Technologie utilisées](#⚙️-technologies-utilisées)
    - [Installation du projet](#🚀-installation-du-projet)
    - [Strucutre du projet](#📂-structure-du-projet)
- [Informations complémentaires](#📌-informations-complémentaires)
    - [Équipe](#👥-équipe)
    - [License](#📝-licence)

## 📥 Guide d'installation

Ce projet étant une application web, aucune installation n'est normalement nécessaire pour l'utilisateur final.
Cependant, en l'absence d’un hébergement en ligne à ce stade du développement, deux solutions sont proposées pour tester l'application en local :

### 💻 1. Cloner le projet (mode développeur)

Vous pouvez :

- Cloner le dépôt GitHub ou utiliser le code source zippé fourni

- Installer les dépendances

- Lancer l'application en local

💡 Pour plus de détails, veuillez vous référer au [Guide de programmation](#guide-de-programmation).

### ▶️ 2. Utiliser l’exécutable Electron (mode simplifié)

Un exécutable a été compilé pour permettre un lancement rapide et sans configuration :

- Lancer le fichier : `Rayon22 Setup 1.0.0.exe`

- Une fois l’installation terminée, une fenêtre s’ouvrira automatiquement avec l’application web prête à l’emploi

Cette solution est recommandée pour une démonstration rapide ou un test utilisateur sans connaissance technique particulière.

## 🧑‍💼 Guide d'utilisation

### 👥 Gestion des utilisateurs

**👤 Création de compte**

- L’utilisateur remplit le formulaire d’inscription.

<!-- add the 3 images of the register page -->

- Un email de confirmation sera envoyé à l'adresse mail renseignée pour valider la création du compte

<!-- add the mail page image -->

- Une fois le compte créé, il a accès à une page pour joindre un justificatif (lettre ou bourse).

<!-- add the account page image -->

- La banque alimentaire reçoit la demande, la traite, puis valide ou refuse.

<!-- add the user dashboard image -->

- Si accepté, l’utilisateur reçoit un email de confirmation et peut se connecter pour accéder au catalogue.

### 🧾 Gestion des produits

*À venir... (phase 2)*

## 🧑‍💻 Guide de programmation

### ⚙️ Technologies utilisées

Le projet est serverless, reposant principalement sur un frontend React connecté à des services distants hébergés dans le cloud. Cela permet une architecture légère, facilement déployable et scalable.  

**Composants principaux :**

- **Frontend :** React.js
    Interface utilisateur dynamique et réactive.

- **Base de données :** Supabase (PostgreSQL)
    Stockage des données clients et produits, avec accès sécurisé.

- **Authentification :** JWT & bcrypt via Supabase Auth
    Gestion des sessions utilisateurs et protection des données personnelles.

- **Envoi d’emails :** EmailJS
    Utilisé pour les notifications (validation de compte, rappels, etc.)

### 🚀 Installation du projet

**1. Prérequis**    

Avant de commencer, assurez-vous d’avoir les outils suivants installés sur votre machine :
- [Node.js 22.12+](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)

**2. Cloner le dépôt**  

Clonez le projet via SSH :
```bash
git clone git@github.com:dallatIkes/rayon22.git
```
💡 Vous pouvez également utiliser l’archive .zip fournie si vous ne souhaitez pas utiliser Git.

**3. Installer les dépendances**  

Installez les modules nécessaires au bon fonctionnement de l’application :
```bash
npm install
```

**4. Configuration des variables d’environnement**
Un fichier `.env` vous sera transmis contenant l’ensemble des clés API et identifiants nécessaires au fonctionnement du projet.

⚠️ **Ce fichier est confidentiel :** Ne le partagez jamais publiquement, ne le versionnez pas avec Git (`.env` est ignoré par défaut via `.gitignore`).

### 📂 Structure du projet

```bash
📁 rayon22/
├── 📁 electron/                # Fichiers spécifiques à l'intégration Electron (version exécutable)
├── 📁 node_modules/            # Dépendances installées automatiquement (non modifiable manuellement)
├── 📁 src/                     # Dossier principal contenant tout le code source de l'application
│   ├── AdminApp.jsx            # Point d'entrée pour l'application côté administrateur
│   ├── App.jsx                 # Point d'entrée principal de l'application (bénéficiaire)
│   ├── main.jsx                # Script d'initialisation React avec ReactDOM
│   ├── Root.jsx                # Composant racine englobant la structure des routes ou layouts
│   ├── 📁 assets/              # Ressources statiques (images, logos, icônes, etc.)
│   ├── 📁 common/              # Composants réutilisables (boutons, champs de formulaire, alertes, etc.)
│   ├── 📁 context/             # Contextes React (authentification, état global partagé, etc.)
│   ├── 📁 lib/                 # Fonctions utilitaires, services API, helpers divers
│   ├── 📁 pages/               # Pages principales de l'application (Accueil, Connexion, Profil, etc.)
│   └── 📁 styles/              # Fichiers de style globaux ou modules CSS/Tailwind
├── index.html                  # Fichier HTML principal injecté par Vite (root de l'app web)
├── eslint.config.js            # Configuration ESLint pour le linting du code (qualité, conventions)
├── tailwind.config.js          # Configuration de Tailwind CSS (thèmes, couleurs, breakpoints, etc.)
├── postcss.config.cjs          # Configuration PostCSS (utilisé par Tailwind pour générer les styles)
├── vite.config.js              # Configuration Vite (outil de bundling et serveur de dev)
├── package.json                # Déclaration des dépendances, scripts, et métadonnées du projet
├── package-lock.json           # Verrouillage des versions exactes des dépendances (auto-généré)
└── README.md                   # Documentation du projet (présentation, installation, usage, etc.)

```

## 📌 Informations complémentaires

### 👥 Équipe

Ce projet a été réalisé par trois étudiants de l'[ENSSAT Lannion](https://enssat.fr/) : 
- **BAZILE Gwenaël** - Développeur
- **CHAABI Samy** - Développeur / Chef de projet
- **JOURDIN Clem** - Développeur

### 📝 Licence

L'intégralité des droits patrimoniaux sur l'ensemble du projet est attribuée à la Banque Alimentaire des Côtes d'Armor. Les étudiants conservent leur droit moral sur les travaux réalisés.
