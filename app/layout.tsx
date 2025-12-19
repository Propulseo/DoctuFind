import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Health Finder - Book Your Medical Appointment in Portugal | Find Doctors Near You',
  description: 'Find and schedule appointments with top healthcare professionals in Portugal. Easy, fast, and secure online booking. Over 2,500 verified doctors. Book your appointment in 2 minutes.',
  keywords: 'healthcare, medical appointments, doctors, Portugal, online booking, medical consultation, healthcare professionals, book doctor, find doctor',
  authors: [{ name: 'Health Finder' }],
  creator: 'Health Finder',
  publisher: 'Health Finder',
  openGraph: {
    type: 'website',
    locale: 'en_PT',
    alternateLocale: 'pt_PT',
    url: 'https://healthfinder.pt',
    siteName: 'Health Finder',
    title: 'Health Finder - Book Your Medical Appointment in Portugal',
    description: 'Find and schedule appointments with top healthcare professionals in Portugal. Easy, fast, and secure online booking.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Health Finder - Healthcare Made Simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Finder - Book Your Medical Appointment in Portugal',
    description: 'Find and schedule appointments with top healthcare professionals in Portugal.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
