import Footer from './components/Constants/Footer'
import Navbar from './components/Constants/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './components/context/useAuthContext';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Neuromate',
  description: 'Neuromate ai',
  icons: {
    icon: {
      url: "/smallbrain.png",
      type: "image/png",
    },
    shortcut: { url: "/smallbrain.png", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body>
        <Toaster position='top-right'   reverseOrder={false} />
        <AuthContextProvider>
        {children}
        </AuthContextProvider>
        <Analytics />

        </body>
    </html>
  )
}
