import { Inter } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from "./components/providers/ReactQueryProvider"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Starwars Character App',
  description: 'Assignent for Complyance.io',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
         
        <main>{children}</main>
        </ReactQueryProvider>
       
      </body>
    </html>
  )
}
