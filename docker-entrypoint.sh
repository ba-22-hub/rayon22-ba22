#!/bin/sh

# Script d'entrypoint pour injecter les variables d'environnement au runtime

echo "🔧 Injection des variables d'environnement au runtime..."

# Vérifier que les variables obligatoires sont définies
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ ERREUR: VITE_SUPABASE_URL est requis"
    exit 1
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ ERREUR: VITE_SUPABASE_ANON_KEY est requis"
    exit 1
fi

if [ -z "$VITE_STRIPE_PUBLIC_KEY" ]; then
    echo "❌ ERREUR: VITE_STRIPE_PUBLIC_KEY est requis"
    exit 1
fi

# Créer un fichier de configuration JavaScript qui sera chargé par l'application
cat > /usr/share/nginx/html/runtime-config.js << EOF
// Configuration injectée au runtime
window.RUNTIME_CONFIG = {
  VITE_SUPABASE_URL: '${VITE_SUPABASE_URL}',
  VITE_SUPABASE_ANON_KEY: '${VITE_SUPABASE_ANON_KEY}',
  VITE_SUPABASE_SERVICE_ROLE_KEY: '${VITE_SUPABASE_SERVICE_ROLE_KEY:-}',
  VITE_STRIPE_PUBLIC_KEY: '${VITE_STRIPE_PUBLIC_KEY}'
};
console.log('✅ Configuration runtime chargée');
EOF

# Injecter le script de configuration dans index.html s'il n'y est pas déjà
if ! grep -q "runtime-config.js" /usr/share/nginx/html/index.html; then
    echo "📝 Injection du script de configuration dans index.html..."
    
    # Injecter le script avant la fermeture de </head>
    sed -i 's|</head>|  <script src="/runtime-config.js"></script>\n</head>|' /usr/share/nginx/html/index.html
    
    echo "✅ Script de configuration injecté dans index.html"
else
    echo "✅ Script de configuration déjà présent dans index.html"
fi

echo "🚀 Configuration terminée, démarrage de nginx..."

# Exécuter la commande passée en paramètre (nginx)
exec "$@"