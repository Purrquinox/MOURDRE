import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { CartProvider } from '@/context/cart-context';
import { AnimationProvider } from '@/context/animation-context';
import { ThemeProvider } from '@/context/theme-context';
import LoadingBar from '@/components/loading-bar';
import ThemeSwitcher from '@/components/theme-switcher';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
});

const crimsonText = Crimson_Text({
	subsets: ['latin'],
	weight: ['400', '600'],
	style: ['normal', 'italic'],
	variable: '--font-crimson',
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'MOURDRÉ - Worn once. Forever yours.',
	description: 'Luxury garments salvaged from lost moments'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
			<body
				className={`${inter.className} bg-theme-background text-theme-text overflow-x-hidden antialiased transition-colors duration-300`}
			>
				<ThemeProvider>
					<AnimationProvider>
						<CartProvider>
							<LoadingBar />
							<Navigation />
							<main className="min-h-screen">{children}</main>
							<Footer />
							<ThemeSwitcher />
						</CartProvider>
					</AnimationProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
