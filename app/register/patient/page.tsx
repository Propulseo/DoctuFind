import RegisterPatientForm from '@/components/auth/register-patient-form'

export const metadata = {
  title: 'Inscription Patient | Health Finder',
  description: 'Créez votre compte patient',
}

export default function RegisterPatientPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <RegisterPatientForm />
      </div>
    </div>
  )
}
