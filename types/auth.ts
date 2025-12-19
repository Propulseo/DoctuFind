import { User } from '@supabase/supabase-js'

export type UserRole = 'patient' | 'professional' | 'admin'

export interface UserData {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string | null
  avatar_url?: string | null
  role: UserRole
  language: string
  created_at: string
  updated_at: string
}

export interface PatientData {
  id: string
  user_id: string
  date_of_birth?: string
  gender?: string
  address?: string
  city?: string
  postal_code?: string
  emergency_contact?: string
  emergency_phone?: string
  medical_notes?: string
  created_at: string
  updated_at: string
}

export interface ProfessionalData {
  id: string
  user_id: string
  specialty: string
  professional_number: string
  bio?: string
  address?: string
  city?: string
  postal_code?: string
  consultation_fee?: number
  verification_status: 'pending' | 'approved' | 'rejected'
  verified_at?: string
  created_at: string
  updated_at: string
}

export interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signOut: () => Promise<void>
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterPatientFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export interface RegisterProfessionalFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialty: string
  professionalNumber: string
  bio: string
  address: string
  city: string
  postalCode: string
  consultationFee: number
  password: string
  confirmPassword: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}
