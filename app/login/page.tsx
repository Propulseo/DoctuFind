import LoginForm from '@/components/auth/login-form'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Connexion | Health Finder',
  description: 'Connectez-vous à votre compte',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <LoginForm />
      </div>
    </div>
  )
}