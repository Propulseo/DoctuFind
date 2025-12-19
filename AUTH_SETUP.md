# 🔐 Configuration Authentification Supabase - Health Finder

## ✅ Système d'authentification complet implémenté

### 🎯 Fonctionnalités implémentées

- ✅ **Inscription/Connexion Email + Mot de passe**
- ✅ **Connexion Google OAuth**
- ✅ **Différenciation Patient vs Professionnel** lors de l'inscription
- ✅ **Redirection automatique** vers le bon dashboard selon le rôle
- ✅ **Protection des routes** par rôle via middleware
- ✅ **Gestion du profil utilisateur** avec tables dédiées
- ✅ **Réinitialisation du mot de passe** avec email
- ✅ **Vérification email** obligatoire
- ✅ **UI moderne** avec composants Shadcn
- ✅ **TypeScript strict** pour la sécurité
- ✅ **Hooks réutilisables** useAuth et useUser

## 🚀 Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Récupérer l'URL et la clé anonyme

### 2. Variables d'environnement configurées

✅ Le fichier `.env.local` doit être créé avec les informations du projet **DOCTOLIB Portugais** :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://yblqdjhnnyfjxjluhslm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHFkamhubnlmanhqbHVoc2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTAxOTMsImV4cCI6MjA3NTE2NjE5M30.ZstCy5xdpufBzosR0MFtWqiWPDcok9SiGLB-XRSXM98
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Créer les tables dans Supabase

Exécuter ces requêtes SQL dans l'éditeur SQL de Supabase :

```sql
-- Table des utilisateurs
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('patient', 'professional', 'admin')) NOT NULL DEFAULT 'patient',
  language TEXT DEFAULT 'pt',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des patients
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des professionnels
CREATE TABLE professionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  specialty TEXT NOT NULL,
  professional_number TEXT NOT NULL,
  bio TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  consultation_fee DECIMAL(10,2),
  verification_status TEXT CHECK (verification_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les utilisateurs
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Politiques RLS pour les patients
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE USING (auth.uid() = user_id);

-- Politiques RLS pour les professionnels
CREATE POLICY "Professionals can view own data" ON professionals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Professionals can update own data" ON professionals
  FOR UPDATE USING (auth.uid() = user_id);

-- Politique pour permettre l'insertion de nouveaux utilisateurs
CREATE POLICY "Allow insert for new users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert for new patients" ON patients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert for new professionals" ON professionals
  FOR INSERT WITH CHECK (true);
```

### 4. Configurer Google OAuth

1. **Aller dans Supabase Dashboard** → Authentication → Providers
2. **Activer Google Provider**
3. **Configurer Google Cloud Console** :
   - Aller sur [Google Cloud Console](https://console.cloud.google.com)
   - Créer un projet OAuth 2.0
   - Authorized redirect URIs: `https://your-project.supabase.co/auth/v1/callback`
   - Copier Client ID et Client Secret dans Supabase

### 5. Configurer les URLs de redirection

Dans Supabase Dashboard → Authentication → URL Configuration :

```
Site URL: https://your-domain.com
Redirect URLs:
  - https://your-domain.com/api/auth/callback
  - http://localhost:3000/api/auth/callback (développement)
```

## 📁 Structure des fichiers créés

```
/lib
  /supabase
    client.ts              → Client Supabase côté client
    server.ts              → Client Supabase côté serveur
    middleware.ts          → Middleware pour cookies

/types
  supabase.ts              → Types TypeScript générés
  auth.ts                  → Types personnalisés pour l'auth

/hooks
  use-auth.ts              → Hook pour l'état d'authentification
  use-user.ts              → Hook pour les données utilisateur

/components/auth
  login-form.tsx           → Formulaire de connexion
  register-patient-form.tsx → Formulaire inscription patient
  register-pro-form.tsx    → Formulaire inscription professionnel
  google-auth-button.tsx   → Bouton OAuth Google
  forgot-password-form.tsx → Formulaire reset MDP
  sign-out-button.tsx      → Bouton de déconnexion

/app
  /login
    page.tsx               → Page de connexion
  /register
    /patient/page.tsx      → Page inscription patient
    /professional/page.tsx → Page inscription professionnel
  /forgot-password
    page.tsx               → Page mot de passe oublié
  /reset-password
    page.tsx               → Page réinitialisation MDP
  /verify-email
    page.tsx               → Page vérification email
  /api/auth
    /callback/route.ts     → Callback OAuth Google
    /sign-out/route.ts     → API déconnexion

middleware.ts              → Middleware Next.js pour protection routes
```

## 🧪 Tests à effectuer

### Checklist de test

- [ ] **Inscription patient email/mdp** → Profil créé → Email vérification
- [ ] **Inscription pro email/mdp** → Profil créé → Status "pending"
- [ ] **Connexion email/mdp** → Redirigé vers bon dashboard selon rôle
- [ ] **Connexion Google** → Profil créé si nouveau → Redirigé dashboard
- [ ] **Mot de passe oublié** → Email reçu → Lien fonctionne
- [ ] **Réinitialisation MDP** → Nouveau MDP fonctionne
- [ ] **Protection routes** → /dashboard/patient accessible que par patients
- [ ] **Protection routes** → /dashboard/professional accessible que par pros
- [ ] **Protection routes** → /dashboard/admin accessible que par admins
- [ ] **Déconnexion** → Session supprimée → Redirigé login
- [ ] **Email déjà utilisé** → Erreur affichée
- [ ] **MDP trop court** → Erreur affichée
- [ ] **MDP non identiques** → Erreur affichée

## 🚀 Commandes pour démarrer

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🎨 Personnalisation

### Modifier les couleurs des rôles

Dans les composants d'inscription :
- **Patient** : `text-blue-600`, `bg-blue-600`
- **Professionnel** : `text-green-600`, `bg-green-600`

### Ajouter de nouvelles spécialités

Modifier le tableau `specialties` dans `register-pro-form.tsx`

### Ajouter de nouvelles villes

Modifier le tableau `portugueseCities` dans `register-pro-form.tsx`

## 🔧 Dépannage

### Erreur "Invalid API key"
- Vérifier les variables d'environnement
- Redémarrer le serveur après modification du .env

### Erreur "User not found"
- Vérifier que les tables sont créées
- Vérifier les politiques RLS

### Google OAuth ne fonctionne pas
- Vérifier la configuration dans Google Cloud Console
- Vérifier les URLs de redirection dans Supabase

## 📞 Support

En cas de problème, vérifier :
1. Les logs de la console navigateur
2. Les logs Supabase Dashboard → Logs
3. Les variables d'environnement
4. La configuration des tables et politiques RLS
