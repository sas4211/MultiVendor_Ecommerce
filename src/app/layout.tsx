import type { Metadata } from "next";
import { Inter,Barlow } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from '@clerk/nextjs'

const interfont =Inter({ subsets: ["latin"]})
const barlowfont =Barlow({
  subsets:["latin"],
  weight:["500","700"],
  variable: "--font-barlow",
})

export const metadata: Metadata = {
  title: "LetsShop",
  description: "Welcom To LetsShop, Your Ultimate Destination For Seamless Online Shopping Experience. Descover Vast Varaity Of Prouducts Under One Platform"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${interfont.className} ${barlowfont.variable} dark:`}
      >
        
      
        <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
