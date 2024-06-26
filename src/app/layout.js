import './globals.css';
import Header from '../components/layout/Header';
import { Tinos } from 'next/font/google';
import { AppProvider } from '../components/AppContext';

const roboto = Tinos({ subsets: ['latin'], weight: '400' });

export const metadata = {
    title: 'OUT',
    description: 'demo project for cafe',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <main className="mx-auto flex-col">
                    <AppProvider>
                        <Header />
                        {children}
                        <footer className="border-t p-8 text-right text-xs font-semibold mt-16">
                            {' '}
                            &copy; 2024 All rights are reserved
                        </footer>
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
