'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect, useState } from 'react';

export default function Hero() {
	const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<section
			ref={ref}
			className="from-theme-background via-theme-surface to-theme-background relative mt-24 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br md:mt-0"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 z-0">
				{/* Geometric Shapes */}
				<div
					className="border-theme-primary/20 animate-spin-slow absolute top-1/4 left-1/4 h-64 w-64 rounded-full border"
					style={{
						transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
					}}
				/>
				<div
					className="border-theme-secondary/20 animate-spin-slow absolute right-1/3 bottom-1/3 h-48 w-48 rounded-full border"
					style={{
						animationDirection: 'reverse',
						transform: `translate(${(mousePosition.x - 50) * -0.01}px, ${(mousePosition.y - 50) * -0.01}px)`
					}}
				/>
				<div
					className="bg-theme-accent/10 animate-float absolute top-1/2 right-1/4 h-32 w-32 rounded-full"
					style={{
						transform: `translate(${(mousePosition.x - 50) * 0.015}px, ${(mousePosition.y - 50) * 0.015}px)`
					}}
				/>

				{/* Grid Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="grid h-full grid-cols-12 gap-4">
						{Array.from({ length: 144 }).map((_, i) => (
							<div key={i} className="border-theme-primary/20 border" />
						))}
					</div>
				</div>
			</div>

			{/* Floating Elements */}
			<div className="absolute inset-0 z-5">
				<div
					className="bg-theme-primary/30 animate-float absolute top-1/4 left-1/4 h-2 w-2 rounded-full"
					style={{ animationDelay: '0s' }}
				></div>
				<div
					className="bg-theme-accent/40 animate-float absolute top-1/3 right-1/3 h-1 w-1 rounded-full"
					style={{ animationDelay: '2s' }}
				></div>
				<div
					className="bg-theme-secondary/20 animate-float absolute bottom-1/3 left-1/3 h-3 w-3 rounded-full"
					style={{ animationDelay: '4s' }}
				></div>
			</div>

			{/* Content */}
			<div
				className={`relative z-10 mx-auto max-w-6xl px-6 text-center transition-all duration-1000 ${
					isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
				}`}
			>
				{/* Main Logo */}
				<div className="mb-12">
					<h1 className="text-theme-text mb-4 font-serif text-6xl leading-tight font-semibold md:text-8xl lg:text-9xl">
						<span className="animate-letter-spacing inline-block">M</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.1s' }}
						>
							O
						</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.2s' }}
						>
							U
						</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.3s' }}
						>
							R
						</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.4s' }}
						>
							D
						</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.5s' }}
						>
							R
						</span>
						<span
							className="animate-letter-spacing inline-block"
							style={{ animationDelay: '0.6s' }}
						>
							É
						</span>
					</h1>

					{/* Decorative Line */}
					<div className="mb-8 flex items-center justify-center space-x-4">
						<div className="bg-theme-primary h-px w-16"></div>
						<div className="bg-theme-primary h-2 w-2 rounded-full"></div>
						<div className="bg-theme-primary h-px w-16"></div>
					</div>
				</div>

				<div
					className={`mb-16 transition-all delay-500 duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<p className="text-theme-text mb-6 font-serif text-2xl font-light tracking-wide italic md:text-3xl">
						Worn once. Forever yours.
					</p>
					<p className="text-theme-textSecondary mx-auto max-w-3xl text-lg leading-relaxed font-light">
						Luxury garments salvaged from lost moments, each piece carrying stories of elegance and
						grace, waiting to begin their next chapter with you.
					</p>
				</div>

				{/* Stats */}
				<div
					className={`mb-16 grid grid-cols-1 gap-8 transition-all delay-700 duration-1000 md:grid-cols-3 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<div className="text-center">
						<div className="text-theme-primary mb-2 font-serif text-3xl font-semibold md:text-4xl">
							500+
						</div>
						<div className="text-theme-textSecondary text-sm tracking-wide uppercase">
							Curated Pieces
						</div>
					</div>
					<div className="text-center">
						<div className="text-theme-primary mb-2 font-serif text-3xl font-semibold md:text-4xl">
							50+
						</div>
						<div className="text-theme-textSecondary text-sm tracking-wide uppercase">
							Luxury Brands
						</div>
					</div>
					<div className="text-center">
						<div className="text-theme-primary mb-2 font-serif text-3xl font-semibold md:text-4xl">
							1000+
						</div>
						<div className="text-theme-textSecondary text-sm tracking-wide uppercase">
							Stories Continued
						</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div
					className={`flex flex-col items-center justify-center gap-6 transition-all delay-900 duration-1000 sm:flex-row ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<button className="group bg-theme-primary text-theme-background hover:bg-theme-primary/90 relative transform overflow-hidden px-10 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg">
						<span className="relative z-10">EXPLORE COLLECTION</span>
						<div className="bg-theme-background/20 absolute inset-0 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></div>
					</button>
					<button className="group border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-theme-background relative overflow-hidden border-2 px-10 py-4 text-sm font-medium tracking-wide transition-all duration-300">
						<span className="relative z-10">OUR STORY</span>
						<div className="bg-theme-primary absolute inset-0 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></div>
					</button>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div
				className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform transition-all delay-1000 duration-1000 ${
					isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
				}`}
			>
				<div className="flex flex-col items-center space-y-4">
					<div className="bg-theme-primary/50 h-16 w-px animate-pulse"></div>
					<p className="text-theme-textSecondary origin-center rotate-90 transform animate-bounce text-xs tracking-widest">
						SCROLL
					</p>
				</div>
			</div>
		</section>
	);
}
