'use client';

import { Language } from '@/lib/i18n';
import { Shield, Award, Lock, CheckCircle } from 'lucide-react';

interface TrustSectionProps {
  language: Language;
}

export function TrustSection({ language }: TrustSectionProps) {
  const t = {
    en: {
      trustedBy: 'Trusted by leading healthcare institutions',
      certifications: 'Certifications & Security'
    },
    pt: {
      trustedBy: 'Confiança das principais instituições de saúde',
      certifications: 'Certificações e Segurança'
    }
  }[language];

  const partners = [
    { name: 'Hospital da Luz', initials: 'HL' },
    { name: 'CUF Saúde', initials: 'CUF' },
    { name: 'Lusíadas Saúde', initials: 'LS' },
    { name: 'Hospital de São João', initials: 'SJ' },
    { name: 'Ordem dos Médicos', initials: 'OM' },
    { name: 'SNS Portugal', initials: 'SNS' },
  ];

  const certifications = [
    { icon: Shield, label: language === 'en' ? 'GDPR Compliant' : 'Conforme RGPD' },
    { icon: Lock, label: language === 'en' ? 'SSL Encrypted' : 'Encriptação SSL' },
    { icon: Award, label: language === 'en' ? 'ISO 27001' : 'ISO 27001' },
    { icon: CheckCircle, label: language === 'en' ? 'Verified Platform' : 'Plataforma Verificada' },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            {t.trustedBy}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-12">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
                  {partner.initials}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-600 hidden sm:block">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-gray-100">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <Icon className="h-4 w-4 text-green-600" />
                <span>{cert.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
