import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/providers/Providers';

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
          className={roboto.className}
          suppressHydrationWarning
        >
          <Providers>
            {children}
          </Providers>

          <Toaster richColors expand position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
