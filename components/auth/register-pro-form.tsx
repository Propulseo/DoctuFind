'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import GoogleAuthButton from './google-auth-button'

const specialties = [
  'Médecine générale',
  'Cardiologie',
  'Dermatologie',
  'Gynécologie',
  'Pédiatrie',
  'Psychiatrie',
  'Ophtalmologie',
  'Orthopédie',
  'Neurologie',
  'Urologie',
  'Endocrinologie',
  'Gastro-entérologie',
  'Pneumologie',
  'Rhumatologie',
  'Chirurgie générale',
  'Chirurgie plastique',
  'Dentisterie',
  'Physiothérapie',
  'Psychologie',
  'Autre'
]

const portugueseCities = [
  'Lisboa',
  'Porto',
  'Braga',
  'Coimbra',
  'Aveiro',
  'Faro',
  'Setúbal',
  'Viseu',
  'Leiria',
  'Évora',
  'Funchal',
  'Ponta Delgada',
  'Vila Nova de Gaia',
  'Matosinhos',
  'Gondomar',
  'Guimarães',
  'Sintra',
  'Cascais',
  'Almada',
  'Amadora'
]

export default function RegisterProfessionalForm() {
  const router = useRouter()
  const supabase = createClient()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    professionalNumber: '',
    bio: '',
    address: '',
    city: '',
    postalCode: '',
    consultationFee: '',
    password: '',
    confirmPassword: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      setLoading(false)
      return
    }

    if (!formData.specialty || !formData.professionalNumber) {
      setError('Veuillez remplir tous les champs obligatoires')
      setLoading(false)
      return
    }

    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: 'professional',
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (authError) throw authError

      if (!authData.user) throw new Error('Erreur lors de la création du compte')

      // 2. Créer l'entrée dans la table users
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          role: 'professional',
          language: 'pt',
        })

      if (userError) throw userError

      // 3. Créer le profil professionnel
      const { error: professionalError } = await supabase
        .from('professionals')
        .insert({
          user_id: authData.user.id,
          specialty: formData.specialty,
          professional_number: formData.professionalNumber,
          bio: formData.bio,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          consultation_fee: formData.consultationFee ? parseFloat(formData.consultationFee) : null,
          verification_status: 'pending',
        })

      if (professionalError) throw professionalError

      // Redirection vers page de vérification email
      router.push('/verify-email?email=' + encodeURIComponent(formData.email))
      
    } catch (err: any) {
      console.error('Erreur inscription:', err)
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-green-600">Inscription Professionnel</h1>
        <p className="text-gray-600">Créez votre compte professionnel pour recevoir des patients</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+351"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialty">Spécialité *</Label>
            <Select
              value={formData.specialty}
              onValueChange={(value) => handleSelectChange('specialty', value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre spécialité" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="professionalNumber">Numéro professionnel *</Label>
            <Input
              id="professionalNumber"
              name="professionalNumber"
              placeholder="Ex: 12345"
              value={formData.professionalNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio professionnelle</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Décrivez votre expérience et votre approche..."
            value={formData.bio}
            onChange={handleChange}
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              name="address"
              placeholder="Rue, numéro"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleSelectChange('city', value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre ville" />
              </SelectTrigger>
              <SelectContent>
                {portugueseCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder="0000-000"
              value={formData.postalCode}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="consultationFee">Tarif de consultation (€)</Label>
          <Input
            id="consultationFee"
            name="consultationFee"
            type="number"
            placeholder="50"
            value={formData.consultationFee}
            onChange={handleChange}
            disabled={loading}
            min="0"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Minimum 8 caractères</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création du compte...
            </>
          ) : (
            'Créer mon compte professionnel'
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Ou</span>
        </div>
      </div>

      <GoogleAuthButton />

      <div className="text-center text-sm space-y-2">
        <p>
          <span className="text-gray-600">Déjà un compte ? </span>
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
        <p>
          <span className="text-gray-600">Vous êtes un patient ? </span>
          <Link href="/register/patient" className="text-blue-600 hover:underline font-medium">
            S'inscrire ici
          </Link>
        </p>
      </div>
    </div>
  )
}
