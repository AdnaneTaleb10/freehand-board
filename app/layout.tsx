import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freehand Board',
  description: 'A simple, intuitive freehand drawing board for the web.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn('font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} flex h-dvh w-full flex-col overflow-hidden p-4`}
      >
        <ThemeProvider attribute='class'>
          <Header />
          <main className='min-h-0 flex-1'>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
