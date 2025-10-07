# Dockerfile pour le projet Rayon22

# On utilise une image officielle de Node.js comme image de base
FROM node:22

# définition du répertoire de l'application
WORKDIR /app

# Copie des fichiers de l'application (package.json et package-lock.json)
COPY package*.json ./

# Installation des dépendances (avec legacy-peer-deps pour éviter les conflits de dépendances)
RUN npm install --legacy-peer-deps

# Copie du reste des fichiers de l'application
COPY . .

# Construction de l'application
RUN npm run build

# Exposition du port sur lequel l'application va tourner
ENV PORT=8080
EXPOSE 8080

# Démarrage de l'application
CMD ["npm", "start"]