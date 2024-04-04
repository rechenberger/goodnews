import { MainTop } from '@/components/layout/MainTop'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | GoodNews',
    absolute: 'GoodNews',
  },
  description: 'powered by teampilot.ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background min-h-[100svh] flex flex-col ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainTop />
          <hr />
          <div className="container lg:max-w-[1024px] xl:max-w-[1024px] 2xl:max-w-[1024px] flex flex-col gap-8 py-8 flex-1">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
