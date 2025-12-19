'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, CheckCircle } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface CTASectionProps {
  language: Language;
}

export function CTASection({ language }: CTASectionProps) {
  const t = {
    en: {
      title: 'Ready to Take Control of Your Health?',
      subtitle: 'Join over 150,000 patients who trust Health Finder for their healthcare needs. Sign up now and book your first appointment in minutes.',
      cta: 'Get Started Free',
      ctaSecondary: 'Learn More',
      features: [
        'Free for patients',
        'Book in 2 minutes',
        'Verified doctors only',
        '24/7 availability'
      ],
      appComing: 'Mobile apps coming soon'
    },
    pt: {
      title: 'Pronto para Controlar a Sua Saúde?',
      subtitle: 'Junte-se a mais de 150.000 pacientes que confiam no Health Finder para os seus cuidados de saúde. Registe-se agora e marque a sua primeira consulta em minutos.',
      cta: 'Começar Grátis',
      ctaSecondary: 'Saber Mais',
      features: [
        'Grátis para pacientes',
        'Marque em 2 minutos',
        'Apenas médicos verificados',
        'Disponível 24/7'
      ],
      appComing: 'Apps móveis em breve'
    }
  }[language];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {t.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10"
            >
              {t.ctaSecondary}
            </Button>
          </div>

          {/* App badges */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-blue-200 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              {t.appComing}
            </p>
            <div className="flex gap-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 border border-white/10">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/60">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 border border-white/10">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/60">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
