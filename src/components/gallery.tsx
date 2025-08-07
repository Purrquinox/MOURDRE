'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useState } from 'react';

const galleryImages = [
	{
		src: '/placeholder.svg?height=400&width=300',
		alt: 'Intricate beadwork detail',
		category: 'Details'
	},
	{
		src: '/placeholder.svg?height=500&width=400',
		alt: 'Vintage coat in boutique',
		category: 'Outerwear'
	},
	{
		src: '/placeholder.svg?height=600&width=400',
		alt: 'Luxury silk scarf',
		category: 'Accessories'
	},
	{
		src: '/placeholder.svg?height=400&width=350',
		alt: 'Vintage accessories',
		category: 'Jewelry'
	},
	{
		src: '/placeholder.svg?height=550&width=400',
		alt: 'Evening gown display',
		category: 'Dresses'
	}
];

export default function Gallery() {
	const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [hoveredImage, setHoveredImage] = useState<number | null>(null);

	const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))];

	const filteredImages =
		selectedCategory === 'All'
			? galleryImages
			: galleryImages.filter((img) => img.category === selectedCategory);

	return (
		<section ref={ref} className="px-6 py-24 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div
					className={`mb-16 text-center transition-all duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
					}`}
				>
					<h2 className="text-weathered-charcoal mb-6 font-serif text-4xl font-semibold md:text-5xl">
						Moments Preserved
					</h2>
					<p className="text-weathered-charcoal/70 mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
						A glimpse into the artistry and elegance that defines each piece in our collection.
					</p>

					{/* Category Filter */}
					<div className="flex flex-wrap justify-center gap-4">
						{categories.map((category, index) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
									selectedCategory === category
										? 'bg-oxidized-brass text-soft-bone'
										: 'text-weathered-charcoal hover:text-oxidized-brass border-weathered-charcoal/30 hover:border-oxidized-brass border'
								} ${isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Masonry Grid */}
				<div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4">
					{filteredImages.map((image, index) => (
						<div
							key={`${image.src}-${selectedCategory}`}
							className={`group cursor-pointer break-inside-avoid transition-all duration-1000 ${
								isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
							}`}
							style={{ transitionDelay: `${index * 100}ms` }}
							onMouseEnter={() => setHoveredImage(index)}
							onMouseLeave={() => setHoveredImage(null)}
						>
							<div className="bg-dust-mauve/10 relative overflow-hidden rounded-lg">
								<Image
									src={image.src || '/placeholder.svg'}
									alt={image.alt}
									width={400}
									height={500}
									className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="from-weathered-charcoal/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

								{/* Overlay Content */}
								<div
									className={`text-soft-bone absolute right-4 bottom-4 left-4 transform transition-all duration-300 ${
										hoveredImage === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									<p className="text-sm font-medium">{image.alt}</p>
									<p className="text-soft-bone/80 text-xs">{image.category}</p>
								</div>

								{/* Category Badge */}
								<div className="bg-oxidized-brass/90 text-soft-bone absolute top-4 right-4 rounded px-2 py-1 text-xs font-medium tracking-wide">
									{image.category}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load More Button */}
				<div
					className={`mt-12 text-center transition-all delay-800 duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<button className="group text-oxidized-brass hover:text-weathered-charcoal text-sm font-medium tracking-wide transition-colors duration-300">
						VIEW MORE GALLERY
						<span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
