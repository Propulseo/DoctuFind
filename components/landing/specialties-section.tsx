'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  Smile,
  Sparkles,
  Brain,
  Activity,
  Baby,
  Heart,
  Eye,
  Bone,
  Syringe,
  Ear,
  ArrowRight,
  Users
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SpecialtiesSectionProps {
  language: Language;
}

export function SpecialtiesSection({ language }: SpecialtiesSectionProps) {
  const t = {
    en: {
      badge: 'Specialties',
      title: 'Find the Right',
      titleHighlight: 'Specialist',
      subtitle: 'Browse our most popular medical specialties and find the perfect healthcare professional for your needs.',
      viewAll: 'View All Specialties',
      doctors: 'doctors',
      available: 'available today',
      specialties: [
        { name: 'General Practitioner', icon: Stethoscope, doctors: 450, color: 'blue' },
        { name: 'Dentist', icon: Smile, doctors: 380, color: 'cyan' },
        { name: 'Dermatologist', icon: Sparkles, doctors: 220, color: 'pink' },
        { name: 'Psychologist', icon: Brain, doctors: 310, color: 'purple' },
        { name: 'Physiotherapist', icon: Activity, doctors: 280, color: 'green' },
        { name: 'Pediatrician', icon: Baby, doctors: 190, color: 'orange' },
        { name: 'Cardiologist', icon: Heart, doctors: 150, color: 'red' },
        { name: 'Ophthalmologist', icon: Eye, doctors: 170, color: 'indigo' },
        { name: 'Orthopedist', icon: Bone, doctors: 140, color: 'amber' },
        { name: 'ENT Specialist', icon: Ear, doctors: 120, color: 'teal' },
        { name: 'Allergist', icon: Syringe, doctors: 90, color: 'rose' },
        { name: 'Gynecologist', icon: Users, doctors: 200, color: 'fuchsia' }
      ]
    },
    pt: {
      badge: 'Especialidades',
      title: 'Encontre o',
      titleHighlight: 'Especialista Certo',
      subtitle: 'Navegue pelas nossas especialidades médicas mais populares e encontre o profissional de saúde perfeito.',
      viewAll: 'Ver Todas as Especialidades',
      doctors: 'médicos',
      available: 'disponíveis hoje',
      specialties: [
        { name: 'Médico de Família', icon: Stethoscope, doctors: 450, color: 'blue' },
        { name: 'Dentista', icon: Smile, doctors: 380, color: 'cyan' },
        { name: 'Dermatologista', icon: Sparkles, doctors: 220, color: 'pink' },
        { name: 'Psicólogo', icon: Brain, doctors: 310, color: 'purple' },
        { name: 'Fisioterapeuta', icon: Activity, doctors: 280, color: 'green' },
        { name: 'Pediatra', icon: Baby, doctors: 190, color: 'orange' },
        { name: 'Cardiologista', icon: Heart, doctors: 150, color: 'red' },
        { name: 'Oftalmologista', icon: Eye, doctors: 170, color: 'indigo' },
        { name: 'Ortopedista', icon: Bone, doctors: 140, color: 'amber' },
        { name: 'Otorrinolaringologista', icon: Ear, doctors: 120, color: 'teal' },
        { name: 'Alergologista', icon: Syringe, doctors: 90, color: 'rose' },
        { name: 'Ginecologista', icon: Users, doctors: 200, color: 'fuchsia' }
      ]
    }
  }[language];

  const colorClasses: Record<string, { bg: string; icon: string; hover: string; badge: string }> = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', hover: 'hover:bg-blue-100', badge: 'bg-blue-100 text-blue-700' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', hover: 'hover:bg-cyan-100', badge: 'bg-cyan-100 text-cyan-700' },
    pink: { bg: 'bg-pink-50', icon: 'text-pink-600', hover: 'hover:bg-pink-100', badge: 'bg-pink-100 text-pink-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:bg-purple-100', badge: 'bg-purple-100 text-purple-700' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', hover: 'hover:bg-green-100', badge: 'bg-green-100 text-green-700' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', hover: 'hover:bg-orange-100', badge: 'bg-orange-100 text-orange-700' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', hover: 'hover:bg-red-100', badge: 'bg-red-100 text-red-700' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', hover: 'hover:bg-indigo-100', badge: 'bg-indigo-100 text-indigo-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', hover: 'hover:bg-amber-100', badge: 'bg-amber-100 text-amber-700' },
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'hover:bg-teal-100', badge: 'bg-teal-100 text-teal-700' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', hover: 'hover:bg-rose-100', badge: 'bg-rose-100 text-rose-700' },
    fuchsia: { bg: 'bg-fuchsia-50', icon: 'text-fuchsia-600', hover: 'hover:bg-fuchsia-100', badge: 'bg-fuchsia-100 text-fuchsia-700' },
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {t.specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            const colors = colorClasses[specialty.color];
            return (
              <Card
                key={index}
                className={cn(
                  "group cursor-pointer border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 overflow-hidden"
                )}
              >
                <div className="p-5">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                    colors.bg,
                    colors.hover
                  )}>
                    <Icon className={cn("h-6 w-6", colors.icon)} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm leading-tight">
                    {specialty.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      colors.badge
                    )}>
                      {specialty.doctors}+
                    </span>
                    <span className="text-xs text-gray-500">{t.doctors}</span>
                  </div>
                </div>
                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium border-2 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all">
            {t.viewAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
