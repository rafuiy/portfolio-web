import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar" 

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Rafi Putra Fauzi",
  description: "Portfolio Rafi!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Navbar /> 
        {children}
      </body>
    </html>
  )
}
