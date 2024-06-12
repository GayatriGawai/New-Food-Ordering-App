import './globals.css';
import Header from '../components/layout/Header';
import { Tinos } from 'next/font/google';
import { AppProvider } from '../components/AppContext';

const roboto = Tinos({ subsets: ['latin'], weight: '400' });

export const metadata = {
    title: 'ST Pizza',
    description: 'demo project for cafe',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <main className="max-w-4xl mx-auto p-4">
                    <AppProvider>
                        <Header />
                        {children}
                        <footer className="border-t p-8 text-center text-xs text-gray-500 mt-16">
                            {' '}
                            &copy; 2024 All rights are reserved
                        </footer>
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
