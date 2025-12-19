'use client';

import { useState } from 'react';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustSection } from '@/components/landing/trust-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { SpecialtiesSection } from '@/components/landing/specialties-section';
import { DoctorsSection } from '@/components/landing/doctors-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FAQSection } from '@/components/landing/faq-section';
import { ProfessionalsSection } from '@/components/landing/professionals-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { Language } from '@/lib/i18n';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        <HeroSection language={language} />
        <TrustSection language={language} />
        <FeaturesSection language={language} />
        <HowItWorks language={language} />
        <SpecialtiesSection language={language} />
        <DoctorsSection language={language} />
        <TestimonialsSection language={language} />
        <FAQSection language={language} />
        <ProfessionalsSection language={language} />
        <CTASection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
