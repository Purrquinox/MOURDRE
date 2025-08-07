'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function Story() {
	const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

	return (
		<section ref={ref} className="bg-theme-surface py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
					{/* Content */}
					<div
						className={`space-y-8 transition-all duration-1000 ${
							isIntersecting ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
						}`}
					>
						<div>
							<h2 className="text-theme-text mb-6 font-serif text-4xl leading-tight font-semibold md:text-5xl">
								Every Thread Tells a Story
							</h2>
							<p className="text-theme-textSecondary mb-6 text-lg leading-relaxed">
								In the quiet corners of forgotten wardrobes, luxury garments wait in silence. Each
								piece carries the weight of moments—a first date, a celebration, a farewell. These
								are not merely clothes; they are vessels of memory, crafted by master artisans and
								worn by those who understood true elegance.
							</p>
							<p className="text-theme-textSecondary text-lg leading-relaxed">
								We rescue these treasures from obscurity, giving them new life and new stories to
								tell. When you choose MOURDRÉ, you're not just buying fashion—you're becoming part
								of a continuing narrative of beauty, craftsmanship, and timeless style.
							</p>
						</div>

						<div className="space-y-6">
							{[
								{
									title: 'Authenticated Luxury',
									description:
										'Every piece is carefully authenticated and restored by our expert craftspeople.',
									delay: '0ms'
								},
								{
									title: 'Sustainable Elegance',
									description:
										'Giving new life to luxury pieces reduces waste while preserving craftsmanship.',
									delay: '200ms'
								},
								{
									title: 'Timeless Investment',
									description:
										'Quality that transcends trends, pieces that appreciate in both value and meaning.',
									delay: '400ms'
								}
							].map((item, index) => (
								<div
									key={item.title}
									className={`flex items-start space-x-4 transition-all duration-1000 ${
										isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
									}`}
									style={{ transitionDelay: item.delay }}
								>
									<div className="bg-theme-primary mt-3 h-2 w-2 flex-shrink-0 animate-pulse rounded-full"></div>
									<div>
										<h3 className="text-theme-text mb-2 font-medium">{item.title}</h3>
										<p className="text-theme-textSecondary">{item.description}</p>
									</div>
								</div>
							))}
						</div>

						<button
							className={`group bg-theme-primary text-theme-background hover:bg-theme-primary/90 relative transform overflow-hidden rounded px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 ${
								isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
							}`}
							style={{ transitionDelay: '600ms' }}
						>
							<span className="relative z-10">LEARN MORE</span>
							<div className="bg-theme-background/20 absolute inset-0 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></div>
						</button>
					</div>

					{/* Image */}
					<div
						className={`relative transition-all duration-1000 ${
							isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
						}`}
						style={{ transitionDelay: '300ms' }}
					>
						<div className="relative aspect-[4/5] overflow-hidden rounded-lg">
							<Image
								src="/placeholder.svg?height=800&width=640"
								alt="Craftsperson working on luxury garment"
								fill
								className="object-cover object-center transition-transform duration-700 hover:scale-105"
							/>
						</div>

						{/* Decorative elements */}
						<div className="bg-theme-accent/20 absolute -right-6 -bottom-6 -z-10 h-24 w-24 animate-pulse rounded-full"></div>
						<div className="border-theme-primary/30 animate-float absolute -top-4 -left-4 -z-10 h-16 w-16 rounded border"></div>
					</div>
				</div>
			</div>
		</section>
	);
}
