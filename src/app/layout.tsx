import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import './global.css';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Zeit',
    template: '%s | Zeit',
  },
  description: 'Generated by create next app',
  creator: 'noghartt',
  authors: [
    {
      name: 'noghartt',
      url: 'https://noghartt.dev',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* TODO: Fix this overflow hidden. There's a better way to handle full-height size components. */}
      <body className={inter.className} style={{ overflow: 'hidden' }}>
        <Providers>
          <Theme accentColor='gray' grayColor='gray' appearance='light'>
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
