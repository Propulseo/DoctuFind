'use client';

import { Language } from '@/lib/i18n';
import { Clock, CreditCard, Shield, Smartphone, Calendar, MessageSquare, Bell, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesSectionProps {
  language: Language;
}

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = {
    en: {
      badge: 'Why Choose Us',
      title: 'Healthcare Made',
      titleHighlight: 'Simple',
      subtitle: 'We provide everything you need to manage your health appointments efficiently and securely.',
      features: [
        {
          icon: Clock,
          title: 'Book in 2 Minutes',
          description: 'Find available appointments and book instantly without phone calls or waiting.',
          color: 'blue'
        },
        {
          icon: Calendar,
          title: '24/7 Availability',
          description: 'Book appointments anytime, anywhere. Our platform is always available.',
          color: 'green'
        },
        {
          icon: Bell,
          title: 'Smart Reminders',
          description: 'Never miss an appointment with automatic SMS and email reminders.',
          color: 'purple'
        },
        {
          icon: Shield,
          title: 'Verified Doctors',
          description: 'All healthcare professionals are verified and registered with medical boards.',
          color: 'orange'
        },
        {
          icon: CreditCard,
          title: 'Free for Patients',
          description: 'Our service is completely free for patients. No hidden fees, ever.',
          color: 'pink'
        },
        {
          icon: FileText,
          title: 'Digital Records',
          description: 'Access your medical history and prescriptions securely online.',
          color: 'cyan'
        },
        {
          icon: MessageSquare,
          title: 'Direct Messaging',
          description: 'Communicate directly with your healthcare providers through our platform.',
          color: 'indigo'
        },
        {
          icon: Smartphone,
          title: 'Mobile Friendly',
          description: 'Manage your appointments on the go with our mobile-optimized platform.',
          color: 'teal'
        }
      ]
    },
    pt: {
      badge: 'Porquê Escolher-nos',
      title: 'Saúde Feita de Forma',
      titleHighlight: 'Simples',
      subtitle: 'Fornecemos tudo o que precisa para gerir as suas consultas de saúde de forma eficiente e segura.',
      features: [
        {
          icon: Clock,
          title: 'Marque em 2 Minutos',
          description: 'Encontre consultas disponíveis e marque instantaneamente sem telefonemas.',
          color: 'blue'
        },
        {
          icon: Calendar,
          title: 'Disponível 24/7',
          description: 'Marque consultas a qualquer hora, em qualquer lugar. Sempre disponível.',
          color: 'green'
        },
        {
          icon: Bell,
          title: 'Lembretes Inteligentes',
          description: 'Nunca perca uma consulta com lembretes automáticos por SMS e email.',
          color: 'purple'
        },
        {
          icon: Shield,
          title: 'Médicos Verificados',
          description: 'Todos os profissionais são verificados e registados na Ordem dos Médicos.',
          color: 'orange'
        },
        {
          icon: CreditCard,
          title: 'Grátis para Pacientes',
          description: 'O nosso serviço é totalmente gratuito para pacientes. Sem taxas ocultas.',
          color: 'pink'
        },
        {
          icon: FileText,
          title: 'Registos Digitais',
          description: 'Aceda ao seu histórico médico e prescrições de forma segura online.',
          color: 'cyan'
        },
        {
          icon: MessageSquare,
          title: 'Mensagens Diretas',
          description: 'Comunique diretamente com os seus profissionais de saúde pela plataforma.',
          color: 'indigo'
        },
        {
          icon: Smartphone,
          title: 'Otimizado para Mobile',
          description: 'Gerencie as suas consultas em movimento com a nossa plataforma mobile.',
          color: 'teal'
        }
      ]
    }
  }[language];

  const colorClasses = {
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
    green: { bg: 'bg-green-100', icon: 'text-green-600', hover: 'group-hover:bg-green-600' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'group-hover:bg-purple-600' },
    orange: { bg: 'bg-orange-100', icon: 'text-orange-600', hover: 'group-hover:bg-orange-600' },
    pink: { bg: 'bg-pink-100', icon: 'text-pink-600', hover: 'group-hover:bg-pink-600' },
    cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600', hover: 'group-hover:bg-cyan-600' },
    indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', hover: 'group-hover:bg-indigo-600' },
    teal: { bg: 'bg-teal-100', icon: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
  };

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
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

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
                  colors.bg,
                  colors.hover
                )}>
                  <Icon className={cn(
                    "h-7 w-7 transition-colors duration-300 group-hover:text-white",
                    colors.icon
                  )} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
