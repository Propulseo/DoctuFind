'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Shield, Award, Lock } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = {
    en: {
      tagline: 'Making healthcare accessible for everyone in Portugal.',
      newsletter: {
        title: 'Stay Updated',
        subtitle: 'Get the latest health tips and platform updates.',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      },
      forPatients: 'For Patients',
      forProfessionals: 'For Professionals',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      links: {
        findDoctor: 'Find a Doctor',
        bookAppointment: 'Book Appointment',
        specialties: 'Specialties',
        howItWorks: 'How It Works',
        joinPlatform: 'Join Platform',
        managePractice: 'Manage Practice',
        pricing: 'Pricing',
        resources: 'Resources',
        about: 'About Us',
        careers: 'Careers',
        press: 'Press',
        blog: 'Blog',
        helpCenter: 'Help Center',
        contact: 'Contact Us',
        faq: 'FAQ',
        status: 'System Status',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        gdpr: 'GDPR'
      },
      contact: {
        address: 'Lisbon, Portugal',
        phone: '+351 000 000 000',
        email: 'support@healthfinder.pt'
      },
      certifications: 'Certifications',
      copyright: 'All rights reserved.',
      madeWith: 'Made with care in Portugal'
    },
    pt: {
      tagline: 'Tornando os cuidados de saúde acessíveis para todos em Portugal.',
      newsletter: {
        title: 'Mantenha-se Atualizado',
        subtitle: 'Receba as últimas dicas de saúde e atualizações.',
        placeholder: 'Introduza o seu email',
        button: 'Subscrever'
      },
      forPatients: 'Para Pacientes',
      forProfessionals: 'Para Profissionais',
      company: 'Empresa',
      support: 'Apoio',
      legal: 'Legal',
      links: {
        findDoctor: 'Encontrar Médico',
        bookAppointment: 'Marcar Consulta',
        specialties: 'Especialidades',
        howItWorks: 'Como Funciona',
        joinPlatform: 'Juntar-se à Plataforma',
        managePractice: 'Gerir Consultório',
        pricing: 'Preços',
        resources: 'Recursos',
        about: 'Sobre Nós',
        careers: 'Carreiras',
        press: 'Imprensa',
        blog: 'Blog',
        helpCenter: 'Centro de Ajuda',
        contact: 'Contacte-nos',
        faq: 'FAQ',
        status: 'Estado do Sistema',
        terms: 'Termos de Serviço',
        privacy: 'Política de Privacidade',
        cookies: 'Política de Cookies',
        gdpr: 'RGPD'
      },
      contact: {
        address: 'Lisboa, Portugal',
        phone: '+351 000 000 000',
        email: 'suporte@healthfinder.pt'
      },
      certifications: 'Certificações',
      copyright: 'Todos os direitos reservados.',
      madeWith: 'Feito com carinho em Portugal'
    }
  }[language];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">{t.newsletter.title}</h3>
              <p className="text-gray-400">{t.newsletter.subtitle}</p>
            </div>
            <div className="flex gap-2 w-full max-w-md">
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 h-12"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-6">
                <Send className="h-4 w-4 mr-2" />
                {t.newsletter.button}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Health Finder</span>
                <span className="block text-xs text-gray-500">Portugal</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {t.tagline}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{t.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{t.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{t.contact.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.forPatients}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.findDoctor}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.bookAppointment}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.specialties}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.howItWorks}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.forProfessionals}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.joinPlatform}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.managePractice}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.pricing}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.resources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.company}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.about}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.careers}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.press}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.support}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.helpCenter}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.contact}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.faq}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-white transition-colors">
                  {t.links.status}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500">
              <span>&copy; {new Date().getFullYear()} Health Finder. {t.copyright}</span>
              <span className="hidden sm:inline">|</span>
              <span>{t.madeWith}</span>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield className="h-4 w-4 text-green-500" />
                <span>GDPR</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Lock className="h-4 w-4 text-green-500" />
                <span>SSL</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Award className="h-4 w-4 text-green-500" />
                <span>ISO 27001</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                {t.links.terms}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                {t.links.privacy}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                {t.links.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
