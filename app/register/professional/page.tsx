import RegisterProfessionalForm from '@/components/auth/register-pro-form'

export const metadata = {
  title: 'Inscription Professionnel | Health Finder',
  description: 'Créez votre compte professionnel',
}

export default function RegisterProfessionalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <RegisterProfessionalForm />
      </div>
    </div>
  )
}
