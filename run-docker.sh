#!/bin/bash

# Charger les variables depuis .env
export $(grep -v '^#' .env | xargs)

# Lancer le conteneur avec les variables
docker run -p 8080:80 \
  -e VITE_SUPABASE_URL="$VITE_SUPABASE_URL" \
  -e VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY" \
  -e VITE_SUPABASE_SERVICE_ROLE_KEY="$VITE_SUPABASE_SERVICE_ROLE_KEY" \
  -e VITE_STRIPE_PUBLIC_KEY="$VITE_STRIPE_PUBLIC_KEY" \
  rayon22-app