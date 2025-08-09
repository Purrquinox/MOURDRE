'use client';

import { useState, useEffect } from 'react';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const searchResults = [
	{ id: 1, name: 'Midnight Velvet Blazer', category: 'Blazers', price: '$1,200' },
	{ id: 2, name: 'Silk Evening Gown', category: 'Dresses', price: '$2,400' },
	{ id: 3, name: 'Cashmere Coat', category: 'Outerwear', price: '$1,800' },
	{ id: 4, name: 'Vintage Chanel Bag', category: 'Accessories', price: '$3,200' },
	{ id: 5, name: 'Pearl Necklace', category: 'Jewelry', price: '$850' }
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
	const [query, setQuery] = useState('');
	const [filteredResults, setFilteredResults] = useState(searchResults);

	useEffect(() => {
		if (query.trim() === '') {
			setFilteredResults(searchResults);
		} else {
			setFilteredResults(
				searchResults.filter(
					(item) =>
						item.name.toLowerCase().includes(query.toLowerCase()) ||
						item.category.toLowerCase().includes(query.toLowerCase())
				)
			);
		}
	}, [query]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
			setQuery('');
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				className={`bg-theme-text/50 fixed inset-0 z-50 backdrop-blur-sm transition-all duration-300 ${
					isOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={`bg-theme-surface border-theme-border fixed top-0 right-0 left-0 z-50 transform border-b transition-all duration-500 ease-out ${
					isOpen ? 'translate-y-0' : '-translate-y-full'
				}`}
			>
				<div className="mx-auto max-w-4xl p-6">
					{/* Header */}
					<div className="mb-8 flex items-center justify-between">
						<h2 className="text-theme-text font-serif text-2xl font-semibold">Search</h2>
						<button
							onClick={onClose}
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

					{/* Search Input */}
					<div className="relative mb-8">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search for luxury pieces..."
							className="border-theme-border text-theme-text placeholder-theme-textSecondary focus:border-theme-primary w-full border-b-2 bg-transparent px-6 py-4 text-lg transition-colors duration-300 focus:outline-none"
							autoFocus
						/>
						<svg
							className="text-theme-textSecondary absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
							/>
						</svg>
					</div>

					{/* Results */}
					<div className="max-h-96 overflow-y-auto">
						{filteredResults.length > 0 ? (
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{filteredResults.map((item, index) => (
									<div
										key={item.id}
										className="hover:bg-theme-accent/10 animate-slide-in-up flex cursor-pointer items-center space-x-4 rounded p-4 transition-all duration-300"
										style={{ animationDelay: `${index * 50}ms` }}
										onClick={onClose}
									>
										<div className="bg-theme-accent/20 h-12 w-12 rounded"></div>
										<div className="flex-1">
											<h3 className="text-theme-text font-medium">{item.name}</h3>
											<p className="text-theme-textSecondary text-sm">{item.category}</p>
										</div>
										<span className="text-theme-primary font-medium">{item.price}</span>
									</div>
								))}
							</div>
						) : (
							<div className="py-12 text-center">
								<p className="text-theme-textSecondary">No results found for "{query}"</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchModal;
