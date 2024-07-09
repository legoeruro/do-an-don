import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do an donut",
  description: "A simple calendar app that helps you plan what to eat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider
          defaultColorScheme="light"
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}