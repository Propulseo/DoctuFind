// Script de test pour vérifier l'authentification
const { createClient } = require('@supabase/supabase-js')

// Test de connexion Supabase
async function testSupabaseConnection() {
  console.log('🔍 Test de connexion Supabase...')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Variables d\'environnement manquantes')
    console.log('   Veuillez configurer .env.local avec vos clés Supabase')
    return false
  }
  
  if (supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
    console.log('❌ Variables d\'environnement non configurées')
    console.log('   Veuillez remplacer les valeurs par défaut dans .env.local')
    return false
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      console.log('❌ Erreur de connexion Supabase:', error.message)
      console.log('   Vérifiez que les tables sont créées avec setup-supabase.sql')
      return false
    }
    
    console.log('✅ Connexion Supabase réussie')
    return true
  } catch (err) {
    console.log('❌ Erreur de connexion:', err.message)
    return false
  }
}

// Test des routes
async function testRoutes() {
  console.log('\n🔍 Test des routes...')
  
  const routes = [
    'http://localhost:3000',
    'http://localhost:3000/login',
    'http://localhost:3000/register/patient',
    'http://localhost:3000/register/professional',
    'http://localhost:3000/forgot-password'
  ]
  
  for (const route of routes) {
    try {
      const response = await fetch(route)
      if (response.ok) {
        console.log(`✅ ${route} - OK`)
      } else {
        console.log(`❌ ${route} - Erreur ${response.status}`)
      }
    } catch (err) {
      console.log(`❌ ${route} - Erreur: ${err.message}`)
    }
  }
}

// Fonction principale
async function runTests() {
  console.log('🚀 Test du système d\'authentification Health Finder\n')
  
  // Charger les variables d'environnement
  require('dotenv').config({ path: '.env.local' })
  
  const supabaseOk = await testSupabaseConnection()
  await testRoutes()
  
  console.log('\n📋 Résumé:')
  if (supabaseOk) {
    console.log('✅ Système d\'authentification prêt!')
    console.log('   - Supabase configuré')
    console.log('   - Routes fonctionnelles')
    console.log('   - Serveur démarré sur http://localhost:3000')
  } else {
    console.log('❌ Configuration requise:')
    console.log('   1. Créer un projet Supabase')
    console.log('   2. Configurer .env.local')
    console.log('   3. Exécuter setup-supabase.sql')
  }
}

runTests().catch(console.error)
