import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Providers } from '@/providers/providers';
import ModalsProvider from '@/components/providers/ModalsProvider';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "GESTOR"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body 
          className={cn(roboto.className, 'bg-white bg-background')}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='project-manager'
          >
            <Providers>
              <ModalsProvider />
              
              {children}
            </Providers>
          </ThemeProvider>

          <Toaster richColors expand position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
