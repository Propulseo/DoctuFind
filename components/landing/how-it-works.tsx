'use client';

import { Search, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface HowItWorksProps {
  language: Language;
}

export function HowItWorks({ language }: HowItWorksProps) {
  const t = {
    en: {
      badge: 'Simple Process',
      title: 'Book Your Appointment in',
      titleHighlight: '3 Easy Steps',
      subtitle: 'Our streamlined booking process gets you from search to confirmed appointment in minutes.',
      steps: [
        {
          number: '01',
          title: 'Search',
          description: 'Find the right healthcare professional by specialty, name, or location. Filter by availability, ratings, and more.',
          details: ['Filter by specialty', 'View doctor profiles', 'Check ratings & reviews']
        },
        {
          number: '02',
          title: 'Book',
          description: 'Choose your preferred date and time slot. Book instantly with real-time availability updates.',
          details: ['Real-time availability', 'Instant confirmation', 'Multiple time slots']
        },
        {
          number: '03',
          title: 'Visit',
          description: 'Receive reminders before your appointment. Check in easily and manage your health records.',
          details: ['SMS & Email reminders', 'Digital check-in', 'Access records anytime']
        }
      ],
      learnMore: 'Learn more'
    },
    pt: {
      badge: 'Processo Simples',
      title: 'Marque a Sua Consulta em',
      titleHighlight: '3 Passos Fáceis',
      subtitle: 'O nosso processo simplificado leva-o da pesquisa à consulta confirmada em minutos.',
      steps: [
        {
          number: '01',
          title: 'Pesquisar',
          description: 'Encontre o profissional de saúde certo por especialidade, nome ou localização. Filtre por disponibilidade, avaliações e mais.',
          details: ['Filtrar por especialidade', 'Ver perfis de médicos', 'Consultar avaliações']
        },
        {
          number: '02',
          title: 'Reservar',
          description: 'Escolha a sua data e horário preferidos. Reserve instantaneamente com atualizações de disponibilidade em tempo real.',
          details: ['Disponibilidade em tempo real', 'Confirmação instantânea', 'Múltiplos horários']
        },
        {
          number: '03',
          title: 'Consultar',
          description: 'Receba lembretes antes da sua consulta. Faça check-in facilmente e gerencie os seus registos de saúde.',
          details: ['Lembretes SMS & Email', 'Check-in digital', 'Acesso a registos']
        }
      ],
      learnMore: 'Saber mais'
    }
  }[language];

  const icons = [Search, Calendar, CheckCircle];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
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

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {t.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="relative group">
                {/* Connector line - only on lg screens */}
                {index < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-blue-200 to-blue-100 rounded-full" />
                    <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  </div>
                )}

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full">
                  {/* Step number & icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <span className="text-5xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
