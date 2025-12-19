'use client';

import { Card } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TestimonialsSectionProps {
  language: Language;
}

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const t = {
    en: {
      badge: 'Testimonials',
      title: 'Trusted by',
      titleHighlight: 'Thousands',
      subtitle: 'See what our patients and healthcare professionals have to say about their experience.',
      patients: 'Patients',
      professionals: 'Healthcare Professionals',
      testimonials: [
        {
          name: 'Maria Silva',
          role: 'Patient',
          location: 'Lisbon',
          content: 'Finding a good doctor used to be so stressful. With Health Finder, I booked my appointment in less than 2 minutes. The reminders are incredibly helpful - I never miss an appointment anymore!',
          avatar: 'MS',
          color: 'blue',
          rating: 5
        },
        {
          name: 'João Costa',
          role: 'Patient',
          location: 'Porto',
          content: 'The platform is intuitive and saves me so much time. I love being able to see real reviews from other patients before booking. No more waiting on hold to book appointments!',
          avatar: 'JC',
          color: 'green',
          rating: 5
        },
        {
          name: 'Ana Rodrigues',
          role: 'Patient',
          location: 'Braga',
          content: 'Having all my medical appointments and records in one place is a game changer. I can easily share my medical history with new doctors. The digital prescriptions feature is amazing!',
          avatar: 'AR',
          color: 'purple',
          rating: 5
        },
        {
          name: 'Dr. Pedro Santos',
          role: 'General Practitioner',
          location: 'Lisbon',
          content: 'Health Finder has transformed my practice. The automated reminders reduced no-shows by 40%. My patients love the easy booking system, and I can focus more on providing care.',
          avatar: 'PS',
          color: 'cyan',
          rating: 5,
          isProfessional: true
        },
        {
          name: 'Dra. Sofia Almeida',
          role: 'Dermatologist',
          location: 'Coimbra',
          content: 'The scheduling system is fantastic and has significantly reduced my administrative work. The patient management tools are top-notch. I highly recommend this platform to all my colleagues.',
          avatar: 'SA',
          color: 'pink',
          rating: 5,
          isProfessional: true
        }
      ]
    },
    pt: {
      badge: 'Testemunhos',
      title: 'Confiança de',
      titleHighlight: 'Milhares',
      subtitle: 'Veja o que os nossos pacientes e profissionais de saúde dizem sobre a sua experiência.',
      patients: 'Pacientes',
      professionals: 'Profissionais de Saúde',
      testimonials: [
        {
          name: 'Maria Silva',
          role: 'Paciente',
          location: 'Lisboa',
          content: 'Encontrar um bom médico costumava ser tão stressante. Com o Health Finder, marquei a minha consulta em menos de 2 minutos. Os lembretes são incrivelmente úteis - nunca mais perdi uma consulta!',
          avatar: 'MS',
          color: 'blue',
          rating: 5
        },
        {
          name: 'João Costa',
          role: 'Paciente',
          location: 'Porto',
          content: 'A plataforma é intuitiva e poupa-me muito tempo. Adoro poder ver avaliações reais de outros pacientes antes de marcar. Acabaram-se as esperas ao telefone para marcar consultas!',
          avatar: 'JC',
          color: 'green',
          rating: 5
        },
        {
          name: 'Ana Rodrigues',
          role: 'Paciente',
          location: 'Braga',
          content: 'Ter todas as minhas consultas e registos médicos num só lugar é uma mudança de vida. Posso facilmente partilhar o meu histórico com novos médicos. As receitas digitais são fantásticas!',
          avatar: 'AR',
          color: 'purple',
          rating: 5
        },
        {
          name: 'Dr. Pedro Santos',
          role: 'Médico de Família',
          location: 'Lisboa',
          content: 'O Health Finder transformou o meu consultório. Os lembretes automáticos reduziram as faltas em 40%. Os meus pacientes adoram o sistema fácil de marcação e posso focar-me mais em cuidar deles.',
          avatar: 'PS',
          color: 'cyan',
          rating: 5,
          isProfessional: true
        },
        {
          name: 'Dra. Sofia Almeida',
          role: 'Dermatologista',
          location: 'Coimbra',
          content: 'O sistema de agendamento é fantástico e reduziu significativamente o meu trabalho administrativo. As ferramentas de gestão de pacientes são excelentes. Recomendo esta plataforma a todos os colegas.',
          avatar: 'SA',
          color: 'pink',
          rating: 5,
          isProfessional: true
        }
      ]
    }
  }[language];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-gradient-to-br from-blue-100 to-blue-200', text: 'text-blue-600' },
    green: { bg: 'bg-gradient-to-br from-green-100 to-green-200', text: 'text-green-600' },
    purple: { bg: 'bg-gradient-to-br from-purple-100 to-purple-200', text: 'text-purple-600' },
    cyan: { bg: 'bg-gradient-to-br from-cyan-100 to-cyan-200', text: 'text-cyan-600' },
    pink: { bg: 'bg-gradient-to-br from-pink-100 to-pink-200', text: 'text-pink-600' },
  };

  const patientTestimonials = t.testimonials.filter(t => !t.isProfessional);
  const professionalTestimonials = t.testimonials.filter(t => t.isProfessional);

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-orange-500" />
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

        {/* Patient Testimonials */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">
            {t.patients}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {patientTestimonials.map((testimonial, index) => {
              const colors = colorClasses[testimonial.color];
              return (
                <Card
                  key={index}
                  className="group bg-white border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <Quote className="h-8 w-8 text-blue-100" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-semibold",
                        colors.bg,
                        colors.text
                      )}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role} - {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Professional Testimonials */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-3xl p-8 lg:p-12">
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-8 text-center">
            {t.professionals}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {professionalTestimonials.map((testimonial, index) => {
              const colors = colorClasses[testimonial.color];
              return (
                <Card
                  key={index}
                  className="group bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 lg:p-8">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg",
                        colors.bg,
                        colors.text
                      )}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role} - {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '4.9/5', label: language === 'en' ? 'Average Rating' : 'Avaliação Média' },
            { value: '150K+', label: language === 'en' ? 'Happy Patients' : 'Pacientes Satisfeitos' },
            { value: '2,500+', label: language === 'en' ? 'Verified Doctors' : 'Médicos Verificados' },
            { value: '98%', label: language === 'en' ? 'Satisfaction Rate' : 'Taxa de Satisfação' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
