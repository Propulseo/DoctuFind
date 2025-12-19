'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MapPin, CheckCircle, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DoctorsSectionProps {
  language: Language;
}

const doctors = [
  {
    id: 1,
    name: 'Dr. Ana Silva',
    specialty: { en: 'General Practitioner', pt: 'Médica de Família' },
    location: { en: 'Lisbon', pt: 'Lisboa' },
    rating: 4.9,
    reviews: 128,
    initials: 'AS',
    color: 'blue',
    available: { en: 'Today', pt: 'Hoje' },
    times: ['09:00', '10:30', '14:00']
  },
  {
    id: 2,
    name: 'Dr. Miguel Costa',
    specialty: { en: 'Dermatologist', pt: 'Dermatologista' },
    location: { en: 'Porto', pt: 'Porto' },
    rating: 4.8,
    reviews: 94,
    initials: 'MC',
    color: 'purple',
    available: { en: 'Today', pt: 'Hoje' },
    times: ['11:00', '15:30', '17:00']
  },
  {
    id: 3,
    name: 'Dra. Sofia Almeida',
    specialty: { en: 'Pediatrician', pt: 'Pediatra' },
    location: { en: 'Braga', pt: 'Braga' },
    rating: 5.0,
    reviews: 156,
    initials: 'SA',
    color: 'green',
    available: { en: 'Tomorrow', pt: 'Amanhã' },
    times: ['08:30', '10:00', '14:30']
  },
  {
    id: 4,
    name: 'Dr. Pedro Santos',
    specialty: { en: 'Cardiologist', pt: 'Cardiologista' },
    location: { en: 'Lisbon', pt: 'Lisboa' },
    rating: 4.9,
    reviews: 203,
    initials: 'PS',
    color: 'red',
    available: { en: 'Today', pt: 'Hoje' },
    times: ['09:30', '11:00', '16:00']
  },
  {
    id: 5,
    name: 'Dra. Maria Ferreira',
    specialty: { en: 'Psychologist', pt: 'Psicóloga' },
    location: { en: 'Coimbra', pt: 'Coimbra' },
    rating: 4.7,
    reviews: 87,
    initials: 'MF',
    color: 'pink',
    available: { en: 'Today', pt: 'Hoje' },
    times: ['10:00', '14:00', '18:00']
  },
  {
    id: 6,
    name: 'Dr. João Oliveira',
    specialty: { en: 'Dentist', pt: 'Dentista' },
    location: { en: 'Faro', pt: 'Faro' },
    rating: 4.8,
    reviews: 112,
    initials: 'JO',
    color: 'cyan',
    available: { en: 'Tomorrow', pt: 'Amanhã' },
    times: ['09:00', '11:30', '15:00']
  }
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-gradient-to-br from-blue-100 to-blue-200', text: 'text-blue-600' },
  purple: { bg: 'bg-gradient-to-br from-purple-100 to-purple-200', text: 'text-purple-600' },
  green: { bg: 'bg-gradient-to-br from-green-100 to-green-200', text: 'text-green-600' },
  red: { bg: 'bg-gradient-to-br from-red-100 to-red-200', text: 'text-red-600' },
  pink: { bg: 'bg-gradient-to-br from-pink-100 to-pink-200', text: 'text-pink-600' },
  cyan: { bg: 'bg-gradient-to-br from-cyan-100 to-cyan-200', text: 'text-cyan-600' },
};

export function DoctorsSection({ language }: DoctorsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const t = {
    en: {
      badge: 'Top Rated',
      title: 'Meet Our',
      titleHighlight: 'Top Doctors',
      subtitle: 'Highly rated healthcare professionals ready to help you. All doctors are verified and trusted by thousands of patients.',
      viewProfile: 'View Profile',
      bookNow: 'Book Now',
      reviews: 'reviews',
      available: 'Available',
      viewAll: 'View All Doctors'
    },
    pt: {
      badge: 'Mais Bem Avaliados',
      title: 'Conheça os Nossos',
      titleHighlight: 'Melhores Médicos',
      subtitle: 'Profissionais de saúde altamente avaliados prontos para ajudá-lo. Todos os médicos são verificados e confiados por milhares de pacientes.',
      viewProfile: 'Ver Perfil',
      bookNow: 'Marcar Agora',
      reviews: 'avaliações',
      available: 'Disponível',
      viewAll: 'Ver Todos os Médicos'
    }
  }[language];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (doctors.length - visibleCards + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (doctors.length - visibleCards + 1)) % (doctors.length - visibleCards + 1));
  };

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-yellow-500" />
              {t.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                {t.titleHighlight}
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-12 w-12 rounded-full border-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= doctors.length - visibleCards}
              className="h-12 w-12 rounded-full border-2 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Doctors Grid/Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {doctors.map((doctor) => {
              const colors = colorClasses[doctor.color];
              return (
                <Card
                  key={doctor.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Doctor info */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="relative">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center",
                          colors.bg
                        )}>
                          <span className={cn("text-xl font-bold", colors.text)}>
                            {doctor.initials}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {doctor.specialty[language]}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                          <span className="text-sm text-gray-400">({doctor.reviews} {t.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location[language]}, Portugal</span>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600">
                          {t.available} {doctor.available[language]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {doctor.times.map((time, i) => (
                          <span
                            key={i}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                              i === 0
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                            )}
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button variant="outline" className="flex-1 h-10" size="sm">
                        {t.viewProfile}
                      </Button>
                      <Button className="flex-1 h-10 bg-blue-600 hover:bg-blue-700" size="sm">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {t.bookNow}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="h-12 px-8 text-base font-medium bg-blue-600 hover:bg-blue-700">
            {t.viewAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
