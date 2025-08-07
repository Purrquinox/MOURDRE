'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AnimationContext = createContext<{
	prefersReducedMotion: boolean;
}>({
	prefersReducedMotion: false
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(mediaQuery.matches);

		const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
		mediaQuery.addEventListener('change', handler);

		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	return (
		<AnimationContext.Provider value={{ prefersReducedMotion }}>
			{children}
		</AnimationContext.Provider>
	);
}

export const useAnimation = () => useContext(AnimationContext);
