# Dockerfile pour l'application Rayon22
# Application React avec Vite, Stripe, Supabase et autres dépendances

# ========================================
# ÉTAPE 1: BUILD (Construction de l'application)
# ========================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances en utilisant --legacy-peer-deps pour résoudre les conflits
# Cette option est nécessaire car vous avez des conflits entre React 19 et certaines dépendances
RUN npm install --legacy-peer-deps

# Copier tout le code source de l'application
COPY . .

# Construire l'application pour la production
# Cela va créer le dossier 'dist' avec les fichiers optimisés
RUN npm run build

# ========================================
# ÉTAPE 2: PRODUCTION (Serveur web léger)
# ========================================
FROM nginx:alpine AS production

# Copier les fichiers construits depuis l'étape de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Créer la configuration Nginx pour les applications React SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Configuration pour les applications React SPA (Single Page Application) \
    # Toutes les routes sont redirigées vers index.html \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache des assets statiques (CSS, JS, images) \
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Configuration de sécurité \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    # Gestion des erreurs \
    error_page 404 /index.html; \
}' > /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour l'accès web
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
