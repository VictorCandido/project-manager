import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils';
import { Providers } from '@/providers/providers';
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
            <Providers>
              {children}
            </Providers>
          <Toaster richColors expand position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
