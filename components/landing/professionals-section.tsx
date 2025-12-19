'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, TrendingUp, Users, FileText, Shield, Clock, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface ProfessionalsSectionProps {
  language: Language;
}

export function ProfessionalsSection({ language }: ProfessionalsSectionProps) {
  const t = {
    en: {
      badge: 'For Healthcare Professionals',
      title: 'Grow Your Practice with',
      titleHighlight: 'Health Finder',
      subtitle: 'Join thousands of healthcare professionals who trust our platform to manage their practice and reach more patients.',
      cta: 'Join as a Professional',
      ctaSecondary: 'Learn More',
      stats: [
        { value: '40%', label: 'Reduction in no-shows' },
        { value: '2x', label: 'More patient bookings' },
        { value: '5hrs', label: 'Saved per week' },
        { value: '2,500+', label: 'Active professionals' }
      ],
      benefits: [
        {
          icon: Calendar,
          title: 'Smart Scheduling',
          description: 'Automated appointment management with real-time availability and conflict prevention.',
          color: 'blue'
        },
        {
          icon: TrendingUp,
          title: 'Reduce No-Shows',
          description: 'Automatic SMS and email reminders reduce patient no-shows by up to 40%.',
          color: 'green'
        },
        {
          icon: Users,
          title: 'Reach More Patients',
          description: 'Get discovered by thousands of patients actively searching for healthcare.',
          color: 'purple'
        },
        {
          icon: FileText,
          title: 'Digital Records',
          description: 'Secure, organized patient records accessible from anywhere, anytime.',
          color: 'orange'
        },
        {
          icon: Shield,
          title: 'GDPR Compliant',
          description: 'Full compliance with data protection regulations. Your data is secure.',
          color: 'cyan'
        },
        {
          icon: Clock,
          title: 'Save Time',
          description: 'Reduce administrative work by 50%. Focus on what matters - your patients.',
          color: 'pink'
        }
      ],
      included: [
        'Online booking system',
        'Patient management',
        'Automated reminders',
        'Analytics dashboard',
        'Secure messaging',
        '24/7 Support'
      ]
    },
    pt: {
      badge: 'Para Profissionais de Saúde',
      title: 'Faça Crescer o Seu Consultório com o',
      titleHighlight: 'Health Finder',
      subtitle: 'Junte-se a milhares de profissionais de saúde que confiam na nossa plataforma para gerir o seu consultório e alcançar mais pacientes.',
      cta: 'Juntar-se como Profissional',
      ctaSecondary: 'Saber Mais',
      stats: [
        { value: '40%', label: 'Redução de faltas' },
        { value: '2x', label: 'Mais marcações' },
        { value: '5hrs', label: 'Poupadas por semana' },
        { value: '2,500+', label: 'Profissionais ativos' }
      ],
      benefits: [
        {
          icon: Calendar,
          title: 'Agenda Inteligente',
          description: 'Gestão automática de consultas com disponibilidade em tempo real e prevenção de conflitos.',
          color: 'blue'
        },
        {
          icon: TrendingUp,
          title: 'Reduza Faltas',
          description: 'Lembretes automáticos por SMS e email reduzem as faltas dos pacientes em até 40%.',
          color: 'green'
        },
        {
          icon: Users,
          title: 'Alcance Mais Pacientes',
          description: 'Seja descoberto por milhares de pacientes à procura de cuidados de saúde.',
          color: 'purple'
        },
        {
          icon: FileText,
          title: 'Registos Digitais',
          description: 'Registos de pacientes seguros e organizados, acessíveis de qualquer lugar.',
          color: 'orange'
        },
        {
          icon: Shield,
          title: 'Conforme RGPD',
          description: 'Total conformidade com regulamentos de proteção de dados. Os seus dados estão seguros.',
          color: 'cyan'
        },
        {
          icon: Clock,
          title: 'Poupe Tempo',
          description: 'Reduza o trabalho administrativo em 50%. Foque-se no que importa - os seus pacientes.',
          color: 'pink'
        }
      ],
      included: [
        'Sistema de marcação online',
        'Gestão de pacientes',
        'Lembretes automáticos',
        'Painel de análises',
        'Mensagens seguras',
        'Suporte 24/7'
      ]
    }
  }[language];

  const colorClasses: Record<string, { bg: string; icon: string }> = {
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
    green: { bg: 'bg-green-100', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
    cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600' },
    pink: { bg: 'bg-pink-100', icon: 'text-pink-600' },
  };

  return (
    <section id="professionals" className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/30">
            <Zap className="h-4 w-4" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = colorClasses[benefit.color];
            return (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    colors.bg
                  )}>
                    <Icon className={cn("h-6 w-6", colors.icon)} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {language === 'en' ? 'Ready to grow your practice?' : 'Pronto para fazer crescer o seu consultório?'}
              </h3>
              <p className="text-blue-100 mb-6">
                {language === 'en'
                  ? 'Join Health Finder today and start reaching more patients. Set up takes less than 10 minutes.'
                  : 'Junte-se ao Health Finder hoje e comece a alcançar mais pacientes. A configuração demora menos de 10 minutos.'
                }
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 h-12 px-6 font-semibold">
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-6">
                  {t.ctaSecondary}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {t.included.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
