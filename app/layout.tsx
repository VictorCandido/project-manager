import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const font = Open_Sans({ subsets: ['latin'] });

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
          className={cn(font.className, 'bg-white dark:bg-[#313338]')}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='project-manager'
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
