'use client';

import { useCart } from '@/context/cart-context';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Cart() {
	const { state, dispatch } = useCart();

	useEffect(() => {
		if (state.isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [state.isOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				className={`bg-theme-text/50 fixed inset-0 z-50 backdrop-blur-sm transition-all duration-300 ${
					state.isOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
				onClick={() => dispatch({ type: 'TOGGLE_CART' })}
			/>

			{/* Cart Panel */}
			<div
				className={`bg-theme-surface border-theme-border fixed top-0 right-0 z-50 h-full w-full max-w-md transform border-l transition-all duration-500 ease-out ${
					state.isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex h-full flex-col">
					{/* Header */}
					<div className="border-theme-border flex items-center justify-between border-b p-6">
						<h2 className="text-theme-text font-serif text-xl font-semibold">Shopping Cart</h2>
						<button
							onClick={() => dispatch({ type: 'TOGGLE_CART' })}
							className="text-theme-text hover:text-theme-primary transition-colors duration-300"
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Cart Items */}
					<div className="flex-1 overflow-y-auto p-6">
						{state.items.length === 0 ? (
							<div className="py-12 text-center">
								<svg
									className="text-theme-textSecondary mx-auto mb-4 h-16 w-16"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1}
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
								<p className="text-theme-textSecondary mb-4">Your cart is empty</p>
								<button
									onClick={() => dispatch({ type: 'TOGGLE_CART' })}
									className="text-theme-primary hover:text-theme-text transition-colors duration-300"
								>
									Continue Shopping
								</button>
							</div>
						) : (
							<div className="space-y-6">
								{state.items.map((item, index) => (
									<div
										key={`${item.id}-${index}`}
										className="animate-slide-in-right flex items-center space-x-4"
										style={{ animationDelay: `${index * 100}ms` }}
									>
										<div className="bg-theme-accent/10 relative h-20 w-16 overflow-hidden rounded">
											<Image
												src={item.image || '/placeholder.svg'}
												alt={item.name}
												fill
												className="object-cover"
											/>
										</div>
										<div className="flex-1">
											<h3 className="text-theme-text text-sm font-medium">{item.name}</h3>
											<p className="text-theme-primary font-medium">{item.price}</p>
											{item.size && (
												<p className="text-theme-textSecondary text-xs">Size: {item.size}</p>
											)}
										</div>
										<button
											onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
											className="text-theme-textSecondary hover:text-theme-text transition-colors duration-300"
										>
											<svg
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Footer */}
					{state.items.length > 0 && (
						<div className="border-theme-border space-y-4 border-t p-6">
							<div className="flex items-center justify-between">
								<span className="text-theme-text font-serif text-lg font-semibold">Total</span>
								<span className="text-theme-text font-serif text-lg font-semibold">
									${state.total.toLocaleString()}
								</span>
							</div>
							<button className="bg-theme-primary text-theme-background hover:bg-theme-primary/90 w-full transform py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]">
								CHECKOUT
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
