import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Vérifier que les variables d'environnement Supabase sont définies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      // Si les variables d'environnement ne sont pas définies, permettre l'accès aux routes publiques
      // et aux dashboards en mode démo (avec fake data)
      const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email']
      const dashboardRoutes = ['/dashboard/patient', '/dashboard/professional', '/dashboard/admin', '/dashboard/client']
      
      // Permettre l'accès aux routes publiques
      if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next()
      }
      
      // Permettre l'accès aux dashboards (mode démo avec fake data)
      if (dashboardRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next()
      }
      
      // Pour toutes les autres routes, rediriger vers login
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = await updateSession(request)
    
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Vérifier si on est en mode démo
    const isDemoMode = request.nextUrl.searchParams.get('demo') === 'true'

    // Routes publiques (pas de redirection)
    const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email']
    if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      // Si connecté et sur /login, rediriger vers dashboard
      if (user && request.nextUrl.pathname === '/login') {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (userData?.role === 'patient') {
          return NextResponse.redirect(new URL('/dashboard/patient', request.url))
        } else if (userData?.role === 'professional') {
          return NextResponse.redirect(new URL('/dashboard/professional', request.url))
        } else if (userData?.role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
      }
      return response
    }

    // Protection des routes authentifiées - bypass en mode démo
    if (!user && !isDemoMode) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // En mode démo, autoriser l'accès sans vérification de rôle
    if (isDemoMode) {
      return response
    }

    // Vérifier le rôle pour les routes protégées
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const pathname = request.nextUrl.pathname

    // Protection par rôle
    if (pathname.startsWith('/dashboard/patient') && userData?.role !== 'patient') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/dashboard/professional') && userData?.role !== 'professional') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/dashboard/admin') && userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
  } catch (error) {
    // En cas d'erreur, permettre l'accès aux routes publiques et aux dashboards (mode démo)
    const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email']
    const dashboardRoutes = ['/dashboard/patient', '/dashboard/professional', '/dashboard/admin', '/dashboard/client']
    
    if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next()
    }
    
    // Permettre l'accès aux dashboards même en cas d'erreur (mode démo avec fake data)
    if (dashboardRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next()
    }
    
    // Pour toutes les autres routes, rediriger vers login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
