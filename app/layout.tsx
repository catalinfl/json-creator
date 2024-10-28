import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

const Inter = localFont({
  src: "./fonts/InterRegular.ttf",
  variable: "--font-inter-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="light">
      <body
        className={`${Inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
