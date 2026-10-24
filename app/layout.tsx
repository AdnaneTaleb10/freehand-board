import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

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
      <body className={`${inter.className} flex flex-col w-full p-6`}>
        <ThemeProvider attribute='class'>
          <Header />
          <main className='grow'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
