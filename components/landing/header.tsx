'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown, Search, Calendar, User, Building2, Shield, Heart, Clock, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    en: {
      forPatients: 'For Patients',
      forProfessionals: 'For Professionals',
      login: 'Log In',
      signup: 'Sign Up',
      findDoctor: 'Find a Doctor',
      bookAppointment: 'Book Appointment',
      myAppointments: 'My Appointments',
      healthRecords: 'Health Records',
      howItWorks: 'How It Works',
      joinPlatform: 'Join Our Platform',
      managePractice: 'Manage Your Practice',
      patientManagement: 'Patient Management',
      onlineBooking: 'Online Booking',
      digitalRecords: 'Digital Records',
      patientsDesc: 'Find doctors, book appointments, and manage your health',
      professionalsDesc: 'Grow your practice with our digital tools',
      about: 'About Us',
      contact: 'Contact',
      help: 'Help Center'
    },
    pt: {
      forPatients: 'Para Pacientes',
      forProfessionals: 'Para Profissionais',
      login: 'Entrar',
      signup: 'Registar',
      findDoctor: 'Encontrar Médico',
      bookAppointment: 'Marcar Consulta',
      myAppointments: 'Minhas Consultas',
      healthRecords: 'Registos de Saúde',
      howItWorks: 'Como Funciona',
      joinPlatform: 'Junte-se à Plataforma',
      managePractice: 'Gerir o Consultório',
      patientManagement: 'Gestão de Pacientes',
      onlineBooking: 'Marcação Online',
      digitalRecords: 'Registos Digitais',
      patientsDesc: 'Encontre médicos, marque consultas e gerencie a sua saúde',
      professionalsDesc: 'Faça crescer o seu consultório com ferramentas digitais',
      about: 'Sobre Nós',
      contact: 'Contacto',
      help: 'Centro de Ajuda'
    }
  }[language];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      )}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-9 items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-gray-600">
              <a href="tel:+351000000000" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span>+351 000 000 000</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{language === 'en' ? 'Mon-Fri: 8h-20h' : 'Seg-Sex: 8h-20h'}</span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <Link href="#" className="hover:text-blue-600 transition-colors">{t.about}</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">{t.contact}</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">{t.help}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300 shadow-md">
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
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
                  Health Finder
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
                  Portugal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* For Patients */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600 bg-transparent hover:bg-blue-50/50">
                    {t.forPatients}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-6">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{t.forPatients}</h4>
                          <p className="text-sm text-gray-500">{t.patientsDesc}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Search className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.findDoctor}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Calendar className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.bookAppointment}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Clock className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.myAppointments}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Heart className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.healthRecords}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* For Professionals */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600 bg-transparent hover:bg-blue-50/50">
                    {t.forProfessionals}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-6">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{t.forProfessionals}</h4>
                          <p className="text-sm text-gray-500">{t.professionalsDesc}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Building2 className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.joinPlatform}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Calendar className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.managePractice}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                            <User className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.patientManagement}</p>
                          </div>
                        </Link>
                        <Link href="#" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Shield className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{t.digitalRecords}</p>
                          </div>
                        </Link>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link href="/register/professional">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            {t.joinPlatform}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* How It Works */}
                <NavigationMenuItem>
                  <Link href="#how-it-works" legacyBehavior passHref>
                    <NavigationMenuLink className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2 transition-colors">
                      {t.howItWorks}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'PT'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => onLanguageChange('en')}
                  className={cn(language === 'en' && "bg-blue-50 text-blue-600")}
                >
                  <span className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange('pt')}
                  className={cn(language === 'pt' && "bg-blue-50 text-blue-600")}
                >
                  <span className="mr-2">🇵🇹</span> Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-gray-200"></div>

            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                {t.login}
              </Button>
            </Link>
            <Link href="/register/patient">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                {t.signup}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                  <span className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange('pt')}>
                  <span className="mr-2">🇵🇹</span> Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t bg-white px-4 py-4 space-y-4">
          {/* Patient Section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              {t.forPatients}
            </p>
            <div className="space-y-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                {t.findDoctor}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                {t.bookAppointment}
              </Link>
            </div>
          </div>

          {/* Professional Section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              {t.forProfessionals}
            </p>
            <div className="space-y-1">
              <Link
                href="#professionals"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                {t.joinPlatform}
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                {t.login}
              </Button>
            </Link>
            <Link href="/register/patient" className="block" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">
                {t.signup}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
