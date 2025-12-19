import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    // Échanger le code contre une session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Vérifier si l'utilisateur existe dans la table users
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      // Si premier login Google, créer le profil
      if (!userData) {
        // Créer l'utilisateur (par défaut en tant que patient)
        await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email!,
          first_name: data.user.user_metadata.full_name?.split(' ')[0] || '',
          last_name: data.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
          avatar_url: data.user.user_metadata.avatar_url,
          role: 'patient',
          language: 'pt',
        })

        // Créer le profil patient
        await supabase.from('patients').insert({
          user_id: data.user.id,
        })

        return NextResponse.redirect(new URL('/dashboard/patient', requestUrl.origin))
      }

      // Rediriger selon le rôle existant
      if (userData.role === 'patient') {
        return NextResponse.redirect(new URL('/dashboard/patient', requestUrl.origin))
      } else if (userData.role === 'professional') {
        return NextResponse.redirect(new URL('/dashboard/professional', requestUrl.origin))
      } else if (userData.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', requestUrl.origin))
      }
    }
  }

  // En cas d'erreur, rediriger vers login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
