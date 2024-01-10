import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Overlock_SC } from 'next/font/google'
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { NavigateProvider } from '@/contexts/NavigateContext';
import { Providers } from '@/providers/providers';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Project Manager',
  description: 'Gestor de Projestos customizado by Victor Candido',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body 
          className={cn(roboto.className, 'bg-white dark:bg-[#313338]')}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='project-manager'
          >
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
