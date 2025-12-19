'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, User, Stethoscope, Shield } from 'lucide-react'
import Link from 'next/link'
import GoogleAuthButton from './google-auth-button'

export default function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTestLogin = (userType: 'patient' | 'professional' | 'admin') => {
    if (userType === 'patient') {
      router.push('/dashboard/patient?demo=true')
    } else if (userType === 'professional') {
      router.push('/dashboard/professional?demo=true')
    } else {
      router.push('/dashboard/admin?demo=true')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Connexion avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      // Récupérer le rôle de l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', authData.user.id)
        .single()

      if (userError) throw userError

      // Redirection selon le rôle
      if (userData.role === 'patient') {
        router.push('/dashboard/patient')
      } else if (userData.role === 'professional') {
        router.push('/dashboard/professional')
      } else if (userData.role === 'admin') {
        router.push('/dashboard/admin')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Connexion</h1>
        <p className="text-gray-600">Accédez à votre compte en toute sécurité</p>
      </div>

      {error && (
        <Alert variant="destructive" className="animate-scale-in">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2 group">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.pt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="h-11 transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2 group">
          <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-11 pr-10 transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:text-blue-700 hover:underline transition-all inline-flex items-center gap-1 hover:gap-2"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-11 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion...
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-gray-500 font-medium">Ou continuer avec</span>
        </div>
      </div>

      <GoogleAuthButton />

      <div className="text-center text-sm space-y-2">
        <p className="text-gray-600">
          Pas encore de compte ?{' '}
          <Link
            href="/register/patient"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
          >
            Créer un compte patient
          </Link>
          {' '}ou{' '}
          <Link
            href="/register/professional"
            className="text-green-600 hover:text-green-700 hover:underline font-medium transition-colors"
          >
            professionnel
          </Link>
        </p>
      </div>

      {/* Section de test des dashboards - Améliorée */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center mb-4 space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">Mode Démo</h3>
          <p className="text-sm text-gray-600">Accédez aux dashboards pour tester l'interface</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Link href="/dashboard/patient?demo=true" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover-lift group"
            >
              <div className="mr-3 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Dashboard Patient</div>
                <div className="text-xs text-gray-500">João Silva - 3 RDV à venir</div>
              </div>
            </Button>
          </Link>

          <Link href="/dashboard/professional?demo=true" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start border-green-200 hover:border-green-400 hover:bg-green-50 transition-all hover-lift group"
            >
              <div className="mr-3 h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Stethoscope className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Dashboard Professionnel</div>
                <div className="text-xs text-gray-500">Dr. Maria Santos - Cardiologue</div>
              </div>
            </Button>
          </Link>

          <Link href="/dashboard/admin?demo=true" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover-lift group"
            >
              <div className="mr-3 h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Dashboard Admin</div>
                <div className="text-xs text-gray-500">Administration - Accès total</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
