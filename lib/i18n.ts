export type Language = 'en' | 'pt';

export const translations = {
  en: {
    hero: {
      title: 'Book Your Medical Appointment',
      subtitle: 'Find and schedule with top healthcare professionals in Portugal',
      cta: 'Find a Practitioner',
      searchPlaceholder: {
        specialty: 'Specialty or practitioner',
        location: 'City or location',
        date: 'Select date'
      }
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Book your appointment in 3 simple steps',
      steps: [
        {
          title: 'Search',
          description: 'Find the right healthcare professional by specialty and location'
        },
        {
          title: 'Book',
          description: 'Choose your preferred time slot and book instantly'
        },
        {
          title: 'Consult',
          description: 'Attend your appointment and manage your health records'
        }
      ]
    },
    specialties: {
      title: 'Popular Specialties',
      subtitle: 'Find the right specialist for your needs',
      list: [
        'General Practitioner',
        'Dentist',
        'Dermatologist',
        'Psychologist',
        'Physiotherapist',
        'Pediatrician',
        'Gynecologist',
        'Ophthalmologist'
      ]
    },
    professionals: {
      title: 'Are You a Healthcare Professional?',
      subtitle: 'Join thousands of practitioners who trust our platform',
      benefits: [
        'Manage your schedule effortlessly',
        'Reduce no-shows by up to 40%',
        'Grow your patient base',
        'Digital patient records'
      ],
      cta: 'Join as a Professional'
    },
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Trusted by patients and professionals across Portugal',
      patients: [
        {
          name: 'Maria Silva',
          role: 'Patient',
          content: 'Booking appointments has never been easier. I can see available slots in real-time and book instantly.',
          rating: 5
        },
        {
          name: 'João Costa',
          role: 'Patient',
          content: 'The platform is intuitive and saves me so much time. No more waiting on hold to book appointments!',
          rating: 5
        },
        {
          name: 'Ana Rodrigues',
          role: 'Patient',
          content: 'I love having all my medical appointments in one place. The reminders are really helpful too.',
          rating: 5
        }
      ],
      professionals: [
        {
          name: 'Dr. Pedro Santos',
          role: 'General Practitioner',
          content: 'This platform has transformed my practice. Better organization and happier patients.',
          rating: 5
        },
        {
          name: 'Dr. Sofia Almeida',
          role: 'Dermatologist',
          content: 'The scheduling system is fantastic. It reduced my administrative work significantly.',
          rating: 5
        }
      ]
    },
    stats: {
      patients: '10,000+ Patients',
      professionals: '500+ Practitioners',
      appointments: '50,000+ Appointments',
      cities: '20+ Cities'
    },
    footer: {
      about: 'About',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      forPatients: 'For Patients',
      forProfessionals: 'For Professionals',
      language: 'Language'
    }
  },
  pt: {
    hero: {
      title: 'Marque a Sua Consulta Médica',
      subtitle: 'Encontre e agende com os melhores profissionais de saúde em Portugal',
      cta: 'Encontrar Profissional',
      searchPlaceholder: {
        specialty: 'Especialidade ou profissional',
        location: 'Cidade ou localização',
        date: 'Selecionar data'
      }
    },
    howItWorks: {
      title: 'Como Funciona',
      subtitle: 'Marque a sua consulta em 3 passos simples',
      steps: [
        {
          title: 'Pesquisar',
          description: 'Encontre o profissional de saúde certo por especialidade e localização'
        },
        {
          title: 'Reservar',
          description: 'Escolha o seu horário preferido e reserve instantaneamente'
        },
        {
          title: 'Consultar',
          description: 'Compareça à sua consulta e gerencie os seus registos de saúde'
        }
      ]
    },
    specialties: {
      title: 'Especialidades Populares',
      subtitle: 'Encontre o especialista certo para as suas necessidades',
      list: [
        'Médico de Família',
        'Dentista',
        'Dermatologista',
        'Psicólogo',
        'Fisioterapeuta',
        'Pediatra',
        'Ginecologista',
        'Oftalmologista'
      ]
    },
    professionals: {
      title: 'É Profissional de Saúde?',
      subtitle: 'Junte-se a milhares de profissionais que confiam na nossa plataforma',
      benefits: [
        'Gerencie a sua agenda sem esforço',
        'Reduza faltas em até 40%',
        'Aumente a sua base de pacientes',
        'Registos digitais de pacientes'
      ],
      cta: 'Juntar-se como Profissional'
    },
    testimonials: {
      title: 'O Que Dizem os Nossos Utilizadores',
      subtitle: 'Confiança de pacientes e profissionais em todo Portugal',
      patients: [
        {
          name: 'Maria Silva',
          role: 'Paciente',
          content: 'Marcar consultas nunca foi tão fácil. Posso ver horários disponíveis em tempo real e reservar instantaneamente.',
          rating: 5
        },
        {
          name: 'João Costa',
          role: 'Paciente',
          content: 'A plataforma é intuitiva e poupa-me muito tempo. Acabaram-se as esperas ao telefone para marcar consultas!',
          rating: 5
        },
        {
          name: 'Ana Rodrigues',
          role: 'Paciente',
          content: 'Adoro ter todas as minhas consultas médicas num só lugar. Os lembretes são muito úteis também.',
          rating: 5
        }
      ],
      professionals: [
        {
          name: 'Dr. Pedro Santos',
          role: 'Médico de Família',
          content: 'Esta plataforma transformou o meu consultório. Melhor organização e pacientes mais satisfeitos.',
          rating: 5
        },
        {
          name: 'Dra. Sofia Almeida',
          role: 'Dermatologista',
          content: 'O sistema de agendamento é fantástico. Reduziu significativamente o meu trabalho administrativo.',
          rating: 5
        }
      ]
    },
    stats: {
      patients: '10.000+ Pacientes',
      professionals: '500+ Profissionais',
      appointments: '50.000+ Consultas',
      cities: '20+ Cidades'
    },
    footer: {
      about: 'Sobre Nós',
      contact: 'Contacto',
      terms: 'Termos de Serviço',
      privacy: 'Política de Privacidade',
      forPatients: 'Para Pacientes',
      forProfessionals: 'Para Profissionais',
      language: 'Idioma'
    }
  }
};

export function getTranslations(lang: Language = 'en') {
  return translations[lang];
}
