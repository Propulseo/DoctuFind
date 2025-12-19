'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ChevronDown, Shield, Clock, CheckCircle2, Star, Zap, Users, CalendarCheck } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  language: Language;
}

const popularSpecialties = {
  en: ['General Practitioner', 'Dentist', 'Dermatologist', 'Psychologist', 'Gynecologist', 'Pediatrician'],
  pt: ['Médico de Família', 'Dentista', 'Dermatologista', 'Psicólogo', 'Ginecologista', 'Pediatra']
};

const popularCities = {
  en: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Funchal'],
  pt: ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Funchal']
};

export function HeroSection({ language }: HeroSectionProps) {
  const [specialtyFocused, setSpecialtyFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [specialtyValue, setSpecialtyValue] = useState('');
  const [locationValue, setLocationValue] = useState('');

  const t = {
    en: {
      badge: 'The #1 healthcare platform in Portugal',
      title: 'Book Your Medical',
      titleHighlight: 'Appointment',
      titleEnd: 'in Minutes',
      subtitle: 'Find top-rated healthcare professionals near you and book appointments instantly. Free for patients, always.',
      specialty: 'Specialty, doctor name...',
      location: 'City or postal code',
      cta: 'Search',
      popularSearches: 'Popular:',
      stats: {
        doctors: 'Verified Doctors',
        patients: 'Happy Patients',
        appointments: 'Appointments/Month',
        rating: 'Average Rating'
      },
      trustBadges: {
        secure: 'GDPR Compliant',
        fast: 'Instant Booking',
        verified: 'Verified Doctors'
      },
      availableToday: 'Available Today',
      bookNow: 'Book Now'
    },
    pt: {
      badge: 'A plataforma de saúde #1 em Portugal',
      title: 'Marque a Sua',
      titleHighlight: 'Consulta',
      titleEnd: 'em Minutos',
      subtitle: 'Encontre os melhores profissionais de saúde perto de si e marque consultas instantaneamente. Gratuito para pacientes, sempre.',
      specialty: 'Especialidade, nome do médico...',
      location: 'Cidade ou código postal',
      cta: 'Pesquisar',
      popularSearches: 'Popular:',
      stats: {
        doctors: 'Médicos Verificados',
        patients: 'Pacientes Satisfeitos',
        appointments: 'Consultas/Mês',
        rating: 'Avaliação Média'
      },
      trustBadges: {
        secure: 'Conforme RGPD',
        fast: 'Marcação Instantânea',
        verified: 'Médicos Verificados'
      },
      availableToday: 'Disponível Hoje',
      bookNow: 'Marcar Agora'
    }
  }[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-blue-50 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-50 rounded-full opacity-40 blur-3xl"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                <Zap className="h-4 w-4" />
                {t.badge}
              </div>

              {/* Title */}
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  {t.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                    {t.titleHighlight}
                  </span>{' '}
                  {t.titleEnd}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed pt-4">
                  {t.subtitle}
                </p>
              </div>

              {/* Search Box */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 sm:p-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Specialty Input */}
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder={t.specialty}
                        value={specialtyValue}
                        onChange={(e) => setSpecialtyValue(e.target.value)}
                        onFocus={() => setSpecialtyFocused(true)}
                        onBlur={() => setTimeout(() => setSpecialtyFocused(false), 200)}
                        className="pl-12 h-14 text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl"
                      />
                      {/* Dropdown */}
                      {specialtyFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t.popularSearches}</p>
                          {popularSpecialties[language].map((specialty, i) => (
                            <button
                              key={i}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                              onClick={() => setSpecialtyValue(specialty)}
                            >
                              <Search className="h-4 w-4 text-gray-400" />
                              {specialty}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Location Input */}
                    <div className="relative flex-1">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder={t.location}
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        onFocus={() => setLocationFocused(true)}
                        onBlur={() => setTimeout(() => setLocationFocused(false), 200)}
                        className="pl-12 h-14 text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl"
                      />
                      {/* Dropdown */}
                      {locationFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t.popularSearches}</p>
                          {popularCities[language].map((city, i) => (
                            <button
                              key={i}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                              onClick={() => setLocationValue(city)}
                            >
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {city}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Search Button */}
                    <Button className="h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all">
                      <Search className="h-5 w-5 mr-2" />
                      {t.cta}
                    </Button>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="p-1 bg-green-100 rounded-full">
                      <Shield className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    {t.trustBadges.secure}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Clock className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    {t.trustBadges.fast}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="p-1 bg-purple-100 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    {t.trustBadges.verified}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">2,500+</div>
                  <div className="text-sm text-gray-500 mt-1">{t.stats.doctors}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">150K+</div>
                  <div className="text-sm text-gray-500 mt-1">{t.stats.patients}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-500 mt-1">{t.stats.appointments}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">4.9</span>
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{t.stats.rating}</div>
                </div>
              </div>
            </div>

            {/* Right content - Doctor cards */}
            <div className="relative hidden lg:block">
              <div className="relative h-[580px]">
                {/* Main doctor card */}
                <div className="absolute top-0 right-0 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-in-right">
                  <div className="h-3 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-2xl font-bold text-blue-600">AS</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">Dr. Ana Silva</h3>
                        <p className="text-sm text-gray-500">{language === 'en' ? 'General Practitioner' : 'Médica de Família'}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">(128)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{language === 'en' ? 'Lisbon, Portugal' : 'Lisboa, Portugal'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          {t.availableToday}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {['09:00', '10:30', '14:00'].map((time, i) => (
                        <button
                          key={i}
                          className={cn(
                            "py-2.5 rounded-lg text-sm font-medium transition-all",
                            i === 0
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <Button className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
                      <CalendarCheck className="h-4 w-4 mr-2" />
                      {t.bookNow}
                    </Button>
                  </div>
                </div>

                {/* Second doctor card */}
                <div className="absolute top-[280px] left-0 w-[300px] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-600">MC</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dr. Miguel Costa</h3>
                      <p className="text-sm text-gray-500">{language === 'en' ? 'Dermatologist' : 'Dermatologista'}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">11:00</span>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">15:30</span>
                  </div>
                </div>

                {/* Notification card */}
                <div className="absolute bottom-12 right-8 bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {language === 'en' ? 'Appointment confirmed!' : 'Consulta confirmada!'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'en' ? 'Tomorrow at 10:30' : 'Amanhã às 10:30'}
                    </p>
                  </div>
                </div>

                {/* Users online badge */}
                <div className="absolute top-32 left-8 bg-white rounded-full shadow-lg border border-gray-100 px-4 py-2 flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex -space-x-2">
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500'].map((color, i) => (
                      <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium", color)}>
                        {['J', 'M', 'A'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">+234</span>
                    <span className="text-gray-500 ml-1">{language === 'en' ? 'online' : 'online'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
