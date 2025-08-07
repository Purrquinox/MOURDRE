'use client';

import { useState } from 'react';
import { useTheme, ColorScheme } from '@/context/theme-context';

export default function ThemeSwitcher() {
	const { colorScheme, mode, setColorScheme, toggleMode } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const colorSchemes: { value: ColorScheme; name: string; preview: string[] }[] = [
		{ value: 'original', name: 'Original', preview: ['#9A8866', '#678D58', '#D2B6C9'] },
		{ value: 'monochrome', name: 'Monochrome', preview: ['#000000', '#4B5563', '#9CA3AF'] },
		{ value: 'forest', name: 'Forest', preview: ['#065F46', '#047857', '#A7F3D0'] },
		{ value: 'ocean', name: 'Ocean', preview: ['#0C4A6E', '#0284C7', '#7DD3FC'] },
		{ value: 'sunset', name: 'Sunset', preview: ['#DC2626', '#EA580C', '#FED7AA'] }
	];

	return (
		<div className="fixed right-6 bottom-6 z-50">
			{/* Theme Panel */}
			<div
				className={`bg-theme-surface border-theme-border absolute right-0 bottom-16 w-80 transform rounded-lg border p-6 shadow-xl transition-all duration-300 ${
					isOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0'
				}`}
			>
				<h3 className="text-theme-text mb-4 font-serif text-lg font-semibold">Customize Theme</h3>

				{/* Mode Toggle */}
				<div className="mb-6">
					<label className="text-theme-text mb-3 block text-sm font-medium">Mode</label>
					<button
						onClick={toggleMode}
						className="bg-theme-border focus:ring-theme-primary relative h-8 w-16 rounded-full transition-colors duration-300 focus:ring-2 focus:outline-none"
					>
						<div
							className={`bg-theme-primary absolute top-1 h-6 w-6 rounded-full transition-transform duration-300 ${
								mode === 'dark' ? 'translate-x-9' : 'translate-x-1'
							}`}
						>
							{mode === 'light' ? (
								<svg
									className="text-theme-background absolute top-1 left-1 h-4 w-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									className="text-theme-background absolute top-1 left-1 h-4 w-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
								</svg>
							)}
						</div>
					</button>
				</div>

				{/* Color Schemes */}
				<div>
					<label className="text-theme-text mb-3 block text-sm font-medium">Color Scheme</label>
					<div className="space-y-3">
						{colorSchemes.map((scheme) => (
							<button
								key={scheme.value}
								onClick={() => setColorScheme(scheme.value)}
								className={`flex w-full items-center justify-between rounded-lg border p-3 transition-all duration-300 ${
									colorScheme === scheme.value
										? 'border-theme-primary bg-theme-primary/10'
										: 'border-theme-border hover:border-theme-primary/50'
								}`}
							>
								<span className="text-theme-text font-medium">{scheme.name}</span>
								<div className="flex space-x-1">
									{scheme.preview.map((color, index) => (
										<div
											key={index}
											className="border-theme-border h-4 w-4 rounded-full border"
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Toggle Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-theme-primary text-theme-background flex h-14 w-14 transform items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
			>
				<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
					/>
				</svg>
			</button>
		</div>
	);
}
