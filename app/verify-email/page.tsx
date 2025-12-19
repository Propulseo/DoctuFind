import { Suspense } from 'react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function VerifyEmailContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Vérifiez votre email</h1>
          <p className="text-gray-600">
            Nous avons envoyé un lien de vérification à votre adresse email.
            Cliquez sur le lien pour activer votre compte.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
          <p className="font-medium text-blue-900 mb-2">📧 Email non reçu ?</p>
          <ul className="text-blue-700 space-y-1">
            <li>• Vérifiez votre dossier spam</li>
            <li>• Attendez quelques minutes</li>
            <li>• Vérifiez l'adresse email</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Renvoyer l'email
          </Button>
          
          <Link href="/login">
            <Button variant="ghost" className="w-full">
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
