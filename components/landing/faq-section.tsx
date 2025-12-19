'use client';

import { Language } from '@/lib/i18n';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FAQSectionProps {
  language: Language;
}

export function FAQSection({ language }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Find answers to common questions about our platform. Can\'t find what you\'re looking for? Contact our support team.',
      contact: 'Contact Support',
      faqs: [
        {
          question: 'Is Health Finder free for patients?',
          answer: 'Yes! Health Finder is completely free for patients. You can search for doctors, book appointments, receive reminders, and access your medical records at no cost. Healthcare professionals pay a subscription fee to use our platform.'
        },
        {
          question: 'How do I book an appointment?',
          answer: 'Booking an appointment is simple: 1) Search for a doctor by specialty or name, 2) Choose an available time slot, 3) Confirm your booking. You\'ll receive an instant confirmation and reminders before your appointment.'
        },
        {
          question: 'Can I cancel or reschedule my appointment?',
          answer: 'Yes, you can cancel or reschedule your appointment directly from your dashboard or through the confirmation email. Please note that cancellation policies may vary by healthcare provider - typically 24 hours notice is required.'
        },
        {
          question: 'Are the doctors on the platform verified?',
          answer: 'Absolutely. All healthcare professionals on Health Finder are verified and registered with the Portuguese Medical Association (Ordem dos Médicos) or relevant professional bodies. We verify credentials before any doctor can accept appointments.'
        },
        {
          question: 'How do appointment reminders work?',
          answer: 'You\'ll receive automatic reminders via email and SMS 24 hours before your appointment. You can customize your reminder preferences in your account settings.'
        },
        {
          question: 'Is my medical data secure?',
          answer: 'Yes, your privacy and security are our top priority. We are fully GDPR compliant and use industry-standard encryption. Your medical data is stored securely and only accessible to you and your healthcare providers.'
        },
        {
          question: 'Can I access Health Finder on mobile?',
          answer: 'Yes! Health Finder is fully optimized for mobile devices. You can access all features through your mobile browser. We\'re also working on dedicated iOS and Android apps coming soon.'
        }
      ]
    },
    pt: {
      badge: 'FAQ',
      title: 'Perguntas',
      titleHighlight: 'Frequentes',
      subtitle: 'Encontre respostas para as questões mais comuns sobre a nossa plataforma. Não encontra o que procura? Contacte a nossa equipa de suporte.',
      contact: 'Contactar Suporte',
      faqs: [
        {
          question: 'O Health Finder é gratuito para pacientes?',
          answer: 'Sim! O Health Finder é completamente gratuito para pacientes. Pode pesquisar médicos, marcar consultas, receber lembretes e aceder aos seus registos médicos sem qualquer custo. Os profissionais de saúde pagam uma subscrição para usar a nossa plataforma.'
        },
        {
          question: 'Como marco uma consulta?',
          answer: 'Marcar uma consulta é simples: 1) Pesquise um médico por especialidade ou nome, 2) Escolha um horário disponível, 3) Confirme a sua marcação. Receberá uma confirmação instantânea e lembretes antes da sua consulta.'
        },
        {
          question: 'Posso cancelar ou remarcar a minha consulta?',
          answer: 'Sim, pode cancelar ou remarcar a sua consulta diretamente no seu painel ou através do email de confirmação. Note que as políticas de cancelamento podem variar por profissional - normalmente é necessário aviso prévio de 24 horas.'
        },
        {
          question: 'Os médicos na plataforma são verificados?',
          answer: 'Absolutamente. Todos os profissionais de saúde no Health Finder são verificados e registados na Ordem dos Médicos ou órgãos profissionais relevantes. Verificamos as credenciais antes de qualquer médico poder aceitar consultas.'
        },
        {
          question: 'Como funcionam os lembretes de consulta?',
          answer: 'Receberá lembretes automáticos por email e SMS 24 horas antes da sua consulta. Pode personalizar as suas preferências de lembrete nas configurações da sua conta.'
        },
        {
          question: 'Os meus dados médicos estão seguros?',
          answer: 'Sim, a sua privacidade e segurança são a nossa principal prioridade. Estamos em total conformidade com o RGPD e usamos encriptação padrão da indústria. Os seus dados médicos são armazenados de forma segura e acessíveis apenas por si e pelos seus profissionais de saúde.'
        },
        {
          question: 'Posso aceder ao Health Finder no telemóvel?',
          answer: 'Sim! O Health Finder está totalmente otimizado para dispositivos móveis. Pode aceder a todas as funcionalidades através do browser do seu telemóvel. Também estamos a trabalhar em apps dedicadas para iOS e Android em breve.'
        }
      ]
    }
  }[language];

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="h-4 w-4" />
              {t.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                {t.titleHighlight}
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {t.faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                  openIndex === index ? "border-blue-200 shadow-lg" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-blue-600"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {language === 'en' ? 'Still have questions?' : 'Ainda tem dúvidas?'}
            </p>
            <Button variant="outline" size="lg" className="h-12 px-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
