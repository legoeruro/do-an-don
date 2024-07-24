import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { useRef } from 'react';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import createSchedulerStore from '@/stores/schedulerStore';

// import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Do an donut',
    description: 'A simple calendar app that helps you plan what to eat',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Creating and initializing the store
    //TODO: move this into a subdirectory
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <MantineProvider defaultColorScheme="light">
                    testing testing testing
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
