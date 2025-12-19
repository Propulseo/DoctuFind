import ResetPasswordForm from '@/components/auth/reset-password-form'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Réinitialisation du mot de passe | Health Finder',
  description: 'Réinitialisez votre mot de passe',
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
