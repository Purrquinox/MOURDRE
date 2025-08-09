'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LoadingBar = () => {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, [pathname]);

	if (!loading) return null;

	return (
		<div className="bg-soft-bone fixed top-0 right-0 left-0 z-[100] h-1">
			<div className="bg-oxidized-brass animate-loading-bar h-full"></div>
		</div>
	);
};

export default LoadingBar;
