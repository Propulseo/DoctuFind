import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export const metadata = {
  title: 'Mot de passe oublié | Health Finder',
  description: 'Réinitialisez votre mot de passe',
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
