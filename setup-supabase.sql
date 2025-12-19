-- Script de configuration Supabase pour Health Finder
-- Projet : DOCTOLIB Portugais (yblqdjhnnyfjxjluhslm)
-- Exécuter ce script dans l'éditeur SQL de Supabase
-- 
-- ✅ Projet ACTIVE_HEALTHY - Prêt à recevoir les migrations

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS patients (
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
CREATE TABLE IF NOT EXISTS professionals (
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

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow insert for new users" ON users;
DROP POLICY IF EXISTS "Patients can view own data" ON patients;
DROP POLICY IF EXISTS "Patients can update own data" ON patients;
DROP POLICY IF EXISTS "Allow insert for new patients" ON patients;
DROP POLICY IF EXISTS "Professionals can view own data" ON professionals;
DROP POLICY IF EXISTS "Professionals can update own data" ON professionals;
DROP POLICY IF EXISTS "Allow insert for new professionals" ON professionals;

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

-- Créer un utilisateur admin par défaut (optionnel)
-- Remplacer 'admin@healthfinder.pt' par l'email de votre choix
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (
--   gen_random_uuid(),
--   'admin@healthfinder.pt',
--   crypt('admin123', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW()
-- );

-- INSERT INTO users (id, email, first_name, last_name, role)
-- SELECT id, email, 'Admin', 'System', 'admin'
-- FROM auth.users
-- WHERE email = 'admin@healthfinder.pt';
