# 🚀 Guide de démarrage rapide - Health Finder Auth

## ✅ Système d'authentification prêt !

Votre système d'authentification complet est implémenté et prêt à être utilisé.

## 🔧 Configuration finale (5 minutes)

### 1. Projet Supabase configuré
✅ **Projet connecté : DOCTOLIB Portugais**
- ID : `yblqdjhnnyfjxjluhslm`
- Région : eu-west-3
- URL : `https://yblqdjhnnyfjxjluhslm.supabase.co`
- Statut : ✅ **ACTIVE_HEALTHY** (prêt à l'emploi)

### 2. Variables d'environnement à configurer

**Créez manuellement le fichier `.env.local`** à la racine du projet avec :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://yblqdjhnnyfjxjluhslm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHFkamhubnlmanhqbHVoc2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTAxOTMsImV4cCI6MjA3NTE2NjE5M30.ZstCy5xdpufBzosR0MFtWqiWPDcok9SiGLB-XRSXM98
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**📋 Astuce** : Copiez le fichier `.env.example` vers `.env.local` pour avoir la configuration complète.

### 3. Tables existantes

✅ **Les tables sont déjà créées !** Le projet contient :
- `users` (41 utilisateurs)
- `patients` (30 patients)
- `professionals` (10 professionnels)
- `appointments`, `services`, `documents`, `messages`, etc.

Aucune migration nécessaire. Vous pouvez directement démarrer l'application !

### 4. Configurer Google OAuth (optionnel)
1. Dans Supabase Dashboard → Authentication → Providers
2. Activez Google
3. Suivez les instructions pour Google Cloud Console

## 🎯 Test du système

### Démarrer l'application
```bash
npm run dev
```

### Tester les fonctionnalités
1. **Inscription Patient** : http://localhost:3000/register/patient
2. **Inscription Professionnel** : http://localhost:3000/register/professional
3. **Connexion** : http://localhost:3000/login
4. **Mot de passe oublié** : http://localhost:3000/forgot-password

## 📱 Pages disponibles

- `/` - Page d'accueil
- `/login` - Connexion
- `/register/patient` - Inscription patient
- `/register/professional` - Inscription professionnel
- `/forgot-password` - Mot de passe oublié
- `/reset-password` - Réinitialisation MDP
- `/verify-email` - Vérification email
- `/dashboard/patient` - Dashboard patient (protégé)
- `/dashboard/professional` - Dashboard professionnel (protégé)
- `/dashboard/admin` - Dashboard admin (protégé)

## 🔐 Fonctionnalités implémentées

✅ **Authentification complète**
- Email + mot de passe
- Google OAuth
- Réinitialisation MDP
- Vérification email

✅ **3 types d'utilisateurs**
- Patients (inscription simple)
- Professionnels (avec spécialité, numéro pro, etc.)
- Admins (accès complet)

✅ **Sécurité**
- Protection des routes par rôle
- Middleware Next.js
- Row Level Security (RLS)
- Validation TypeScript

✅ **UI moderne**
- Composants Shadcn
- Design responsive
- Messages d'erreur clairs
- Loading states

## 🛠️ Commandes utiles

```bash
# Démarrer le serveur
npm run dev

# Vérifier les types
npm run typecheck

# Tester la connexion
node test-auth.js

# Build de production
npm run build
```

## 🎨 Personnalisation

### Modifier les couleurs
- **Patients** : `blue-600` dans les composants
- **Professionnels** : `green-600` dans les composants

### Ajouter des spécialités
Modifiez le tableau `specialties` dans `components/auth/register-pro-form.tsx`

### Ajouter des villes
Modifiez le tableau `portugueseCities` dans `components/auth/register-pro-form.tsx`

## 🚨 Dépannage

### Erreur "Invalid API key"
- Vérifiez `.env.local`
- Redémarrez le serveur

### Erreur "User not found"
- Vérifiez que les tables sont créées
- Vérifiez les politiques RLS

### Google OAuth ne fonctionne pas
- Vérifiez la configuration Google Cloud Console
- Vérifiez les URLs de redirection

## 📞 Support

En cas de problème :
1. Vérifiez les logs de la console
2. Vérifiez les logs Supabase Dashboard
3. Vérifiez la configuration des tables

---

**🎉 Votre système d'authentification est prêt !**

Il suffit maintenant de configurer Supabase et vous pourrez tester toutes les fonctionnalités.
