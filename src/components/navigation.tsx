'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useTheme } from '@/context/theme-context';
import Cart from './cart';
import SearchModal from './search-modal';

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { state, dispatch } = useCart();
	const { mode, toggleMode } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMenuOpen]);

	return (
		<>
			<nav
				className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
					isScrolled
						? 'bg-theme-surface/95 border-theme-border border-b shadow-lg backdrop-blur-md'
						: 'bg-theme-surface/95 border-theme-border border-b backdrop-blur-sm'
				}`}
			>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex h-20 items-center justify-between">
						{/* Logo */}
						<Link href="/" className="group flex items-center space-x-2">
							<div className="text-theme-text group-hover:text-theme-primary font-serif text-2xl font-semibold tracking-wide transition-colors duration-300">
								MOURDRÉ
							</div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden items-center space-x-12 md:flex">
							<Link
								href="/collection"
								className="text-theme-text hover:text-theme-primary group relative text-sm font-medium transition-all duration-300"
							>
								Collection
								<span className="bg-theme-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
							</Link>
							<Link
								href="/story"
								className="text-theme-text hover:text-theme-primary group relative text-sm font-medium transition-all duration-300"
							>
								Our Story
								<span className="bg-theme-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
							</Link>
							<Link
								href="/care"
								className="text-theme-text hover:text-theme-primary group relative text-sm font-medium transition-all duration-300"
							>
								Care Guide
								<span className="bg-theme-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
							</Link>
							<Link
								href="/contact"
								className="text-theme-text hover:text-theme-primary group relative text-sm font-medium transition-all duration-300"
							>
								Contact
								<span className="bg-theme-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
							</Link>
						</div>

						{/* Actions */}
						<div className="flex items-center space-x-6">
							{/* Theme Toggle */}
							<button
								onClick={toggleMode}
								className="text-theme-text hover:text-theme-primary transform transition-all duration-300 hover:scale-110"
								title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
							>
								{mode === 'light' ? (
									<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
										/>
									</svg>
								) : (
									<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
								)}
							</button>

							<button
								onClick={() => setIsSearchOpen(true)}
								className="text-theme-text hover:text-theme-primary transform transition-all duration-300 hover:scale-110"
							>
								<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
									/>
								</svg>
							</button>

							<button
								onClick={() => dispatch({ type: 'TOGGLE_CART' })}
								className="text-theme-text hover:text-theme-primary relative transform transition-all duration-300 hover:scale-110"
							>
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
								{state.items.length > 0 && (
									<span className="bg-theme-primary text-theme-background absolute -top-2 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full text-xs">
										{state.items.length}
									</span>
								)}
							</button>

							{/* Mobile menu button */}
							<button
								className="text-theme-text relative h-6 w-6 md:hidden"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<span
									className={`absolute top-1 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 rotate-45' : ''}`}
								></span>
								<span
									className={`absolute top-2.5 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
								></span>
								<span
									className={`absolute top-4 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 -rotate-45' : ''}`}
								></span>
							</button>
						</div>
					</div>

					{/* Mobile Navigation */}
					<div
						className={`overflow-hidden transition-all duration-500 md:hidden ${isMenuOpen ? 'max-h-96 py-6' : 'max-h-0'}`}
					>
						<div className="border-theme-border border-t pt-6">
							<div className="flex flex-col space-y-6">
								{['Collection', 'Our Story', 'Care Guide', 'Contact'].map((item, index) => (
									<Link
										key={item}
										href={`/${item.toLowerCase().replace(' ', '-')}`}
										className={`text-theme-text hover:text-theme-primary transform text-sm font-medium transition-all duration-300 hover:translate-x-2 ${
											isMenuOpen ? 'animate-slide-in-left' : ''
										}`}
										style={{ animationDelay: `${index * 100}ms` }}
										onClick={() => setIsMenuOpen(false)}
									>
										{item}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</nav>

			<Cart />
			<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
		</>
	);
}
