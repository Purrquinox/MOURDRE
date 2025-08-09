'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';

const featuredItems = [
	{
		id: 1,
		name: 'Midnight Velvet Blazer',
		price: '$1,200',
		originalPrice: '$2,800',
		story: 'Once worn to a gallery opening in Paris, 1987',
		image: '/placeholder.svg?height=600&width=400',
		sizes: ['XS', 'S', 'M']
	},
	{
		id: 2,
		name: 'Silk Evening Gown',
		price: '$2,400',
		originalPrice: '$5,200',
		story: 'A single dance at the Met Gala, never forgotten',
		image: '/placeholder.svg?height=600&width=400',
		sizes: ['S', 'M', 'L']
	},
	{
		id: 3,
		name: 'Cashmere Coat',
		price: '$1,800',
		originalPrice: '$3,600',
		story: 'Walked through Central Park one autumn morning',
		image: '/placeholder.svg?height=600&width=400',
		sizes: ['M', 'L', 'XL']
	}
];

const FeaturedCollection = () => {
	const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
	const { dispatch } = useCart();
	const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
	const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>({});

	const handleAddToCart = async (item: (typeof featuredItems)[0]) => {
		const selectedSize = selectedSizes[item.id] || item.sizes[0];

		setLoadingItems((prev) => ({ ...prev, [item.id]: true }));

		// Simulate loading
		await new Promise((resolve) => setTimeout(resolve, 800));

		dispatch({
			type: 'ADD_ITEM',
			payload: {
				...item,
				size: selectedSize
			}
		});

		setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
	};

	return (
		<section ref={ref} className="bg-theme-background px-6 py-24 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div
					className={`mb-20 text-center transition-all duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
					}`}
				>
					<h2 className="text-theme-text mb-6 font-serif text-4xl font-semibold md:text-5xl">
						Featured Pieces
					</h2>
					<p className="text-theme-textSecondary mx-auto max-w-2xl text-lg leading-relaxed">
						Each garment in our collection has lived a life of luxury, waiting to continue its story
						with you.
					</p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
					{featuredItems.map((item, index) => (
						<div
							key={item.id}
							className={`group cursor-pointer transition-all duration-1000 ${
								isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
							}`}
							style={{ transitionDelay: `${index * 200}ms` }}
						>
							{/* Image */}
							<div className="bg-theme-accent/10 relative mb-6 aspect-[3/4] overflow-hidden rounded-lg">
								<Image
									src={item.image || '/placeholder.svg'}
									alt={item.name}
									fill
									className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="from-theme-text/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

								{/* Quick Add Button */}
								<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
									<button
										onClick={() => handleAddToCart(item)}
										disabled={loadingItems[item.id]}
										className="bg-theme-surface text-theme-text hover:bg-theme-primary hover:text-theme-background transform rounded px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 disabled:opacity-50"
									>
										{loadingItems[item.id] ? (
											<div className="flex items-center space-x-2">
												<div className="border-theme-text h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
												<span>ADDING...</span>
											</div>
										) : (
											'QUICK ADD'
										)}
									</button>
								</div>

								{/* Sale Badge */}
								<div className="bg-theme-primary text-theme-background absolute top-4 left-4 rounded px-3 py-1 text-xs font-medium tracking-wide">
									VINTAGE
								</div>
							</div>

							{/* Content */}
							<div className="space-y-4">
								<h3 className="text-theme-text group-hover:text-theme-primary font-serif text-xl font-medium transition-colors duration-300">
									{item.name}
								</h3>

								<div className="flex items-center space-x-3">
									<span className="text-theme-text text-lg font-medium">{item.price}</span>
									<span className="text-theme-textSecondary text-sm line-through">
										{item.originalPrice}
									</span>
									<span className="bg-theme-secondary/20 text-theme-secondary rounded px-2 py-1 text-xs">
										{Math.round(
											(1 -
												parseFloat(item.price.replace('$', '').replace(',', '')) /
													parseFloat(item.originalPrice.replace('$', '').replace(',', ''))) *
												100
										)}
										% OFF
									</span>
								</div>

								<p className="text-theme-textSecondary text-sm leading-relaxed italic">
									{item.story}
								</p>

								{/* Size Selection */}
								<div className="space-y-2">
									<p className="text-theme-textSecondary text-xs tracking-wide uppercase">
										Available Sizes
									</p>
									<div className="flex space-x-2">
										{item.sizes.map((size) => (
											<button
												key={size}
												onClick={() => setSelectedSizes((prev) => ({ ...prev, [item.id]: size }))}
												className={`h-8 w-8 rounded border text-xs transition-all duration-300 ${
													selectedSizes[item.id] === size ||
													(!selectedSizes[item.id] && size === item.sizes[0])
														? 'border-theme-primary bg-theme-primary text-theme-background'
														: 'border-theme-border text-theme-text hover:border-theme-primary'
												}`}
											>
												{size}
											</button>
										))}
									</div>
								</div>

								<button className="text-theme-primary hover:text-theme-text group/btn text-sm font-medium tracking-wide transition-colors duration-300">
									VIEW DETAILS
									<span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
										→
									</span>
								</button>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div
					className={`mt-16 text-center transition-all delay-600 duration-1000 ${
						isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<button className="group border-theme-text text-theme-text hover:bg-theme-text hover:text-theme-background relative overflow-hidden rounded border px-12 py-4 text-sm font-medium tracking-wide transition-all duration-300">
						<span className="relative z-10">VIEW ALL PIECES</span>
						<div className="bg-theme-text absolute inset-0 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></div>
					</button>
				</div>
			</div>
		</section>
	);
};

export default FeaturedCollection;
