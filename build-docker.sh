#!/bin/bash

# Script de build Docker avec variables d'environnement
# Usage: ./build-docker.sh

echo "🔨 Construction de l'image Docker avec les variables d'environnement..."

# Charger les variables depuis le fichier .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ Fichier .env non trouvé !"
    exit 1
fi

# Construire l'image Docker avec les arguments de build
docker build \
  --build-arg VITE_SUPABASE_URL="$VITE_SUPABASE_URL" \
  --build-arg VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY" \
  --build-arg VITE_SUPABASE_SERVICE_ROLE_KEY="$VITE_SUPABASE_SERVICE_ROLE_KEY" \
  --build-arg VITE_STRIPE_PUBLIC_KEY="$VITE_STRIPE_PUBLIC_KEY" \
  -t rayon22-app .

if [ $? -eq 0 ]; then
    echo "✅ Image construite avec succès !"
    echo "🚀 Lancez l'application avec: docker run -p 8080:80 rayon22-app"
else
    echo "❌ Erreur lors de la construction de l'image"
    exit 1
fi