'use client';

import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Newsletter = () => {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsSubmitting(false);
		setIsSubmitted(true);
		setEmail('');

		// Reset success state after 3 seconds
		setTimeout(() => setIsSubmitted(false), 3000);
	};

	return (
		<section ref={ref} className="bg-theme-accent/10 relative overflow-hidden py-24">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="border-theme-primary animate-spin-slow absolute top-1/4 left-1/4 h-32 w-32 rounded-full border"></div>
				<div
					className="border-theme-secondary animate-spin-slow absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full border"
					style={{ animationDirection: 'reverse' }}
				></div>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
				<div
					className={`transition-all duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
					}`}
				>
					<h2 className="text-theme-text mb-6 font-serif text-4xl font-semibold md:text-5xl">
						Stay Connected
					</h2>
					<p className="text-theme-textSecondary mx-auto mb-12 max-w-2xl text-lg leading-relaxed">
						Be the first to discover new arrivals and hear the stories behind each piece. Join our
						community of those who appreciate the beauty of pre-loved luxury.
					</p>
				</div>

				<div
					className={`transition-all delay-300 duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					{isSubmitted ? (
						<div className="animate-fade-in mx-auto max-w-md">
							<div className="bg-theme-secondary/20 text-theme-secondary rounded-lg p-6">
								<svg
									className="mx-auto mb-4 h-8 w-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<p className="font-medium">Thank you for subscribing!</p>
								<p className="mt-2 text-sm">Welcome to the MOURDRÉ community.</p>
							</div>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="mx-auto max-w-md">
							<div className="flex flex-col gap-4 sm:flex-row">
								<div className="relative flex-1">
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email address"
										className="bg-theme-surface border-theme-border text-theme-text placeholder-theme-textSecondary focus:border-theme-primary focus:ring-theme-primary/20 w-full rounded-lg border px-6 py-4 transition-all duration-300 focus:ring-2 focus:outline-none"
										required
										disabled={isSubmitting}
									/>
									{isSubmitting && (
										<div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
											<div className="border-theme-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
										</div>
									)}
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="bg-theme-text text-theme-background hover:bg-theme-primary transform rounded-lg px-8 py-4 text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 disabled:opacity-50"
								>
									{isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
								</button>
							</div>
						</form>
					)}
				</div>

				<p
					className={`text-theme-textSecondary mt-6 text-sm transition-all delay-500 duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
					}`}
				>
					We respect your privacy. Unsubscribe at any time.
				</p>
			</div>
		</section>
	);
};

export default Newsletter;
