import { ClerkProvider } from '@clerk/nextjs'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import { Toaster } from '@/components/ui/sonner';
import ModalsProvider from "@/providers/modals-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NavigateProvider } from "@/contexts/navigate-context";

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Project Manager"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={roboto.className}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='project-manager'
          >
            <NavigateProvider>
              <ModalsProvider />
              {children}
            </NavigateProvider>
          </ThemeProvider>

          <Toaster richColors expand position="bottom-center" />
        </ClerkProvider>
      </body>
    </html>
  )
}
