'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ColorScheme = 'original' | 'monochrome' | 'forest' | 'ocean' | 'sunset';
export type Mode = 'light' | 'dark';

interface Theme {
	name: string;
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		surface: string;
		text: string;
		textSecondary: string;
		border: string;
	};
}

const themes: Record<ColorScheme, { light: Theme; dark: Theme }> = {
	original: {
		light: {
			name: 'Original Light',
			colors: {
				primary: '#9A8866',
				secondary: '#678D58',
				accent: '#D2B6C9',
				background: '#F2F0EB',
				surface: '#FFFFFF',
				text: '#2B2B2B',
				textSecondary: '#6B7280',
				border: '#E5E7EB'
			}
		},
		dark: {
			name: 'Original Dark',
			colors: {
				primary: '#B8A082',
				secondary: '#7BA066',
				accent: '#E2C6D9',
				background: '#1A1A1A',
				surface: '#2B2B2B',
				text: '#F2F0EB',
				textSecondary: '#9CA3AF',
				border: '#374151'
			}
		}
	},
	monochrome: {
		light: {
			name: 'Monochrome Light',
			colors: {
				primary: '#000000',
				secondary: '#4B5563',
				accent: '#9CA3AF',
				background: '#FFFFFF',
				surface: '#F9FAFB',
				text: '#111827',
				textSecondary: '#6B7280',
				border: '#E5E7EB'
			}
		},
		dark: {
			name: 'Monochrome Dark',
			colors: {
				primary: '#FFFFFF',
				secondary: '#D1D5DB',
				accent: '#6B7280',
				background: '#000000',
				surface: '#111827',
				text: '#F9FAFB',
				textSecondary: '#9CA3AF',
				border: '#374151'
			}
		}
	},
	forest: {
		light: {
			name: 'Forest Light',
			colors: {
				primary: '#065F46',
				secondary: '#047857',
				accent: '#A7F3D0',
				background: '#F0FDF4',
				surface: '#FFFFFF',
				text: '#064E3B',
				textSecondary: '#6B7280',
				border: '#D1FAE5'
			}
		},
		dark: {
			name: 'Forest Dark',
			colors: {
				primary: '#34D399',
				secondary: '#10B981',
				accent: '#6EE7B7',
				background: '#064E3B',
				surface: '#065F46',
				text: '#ECFDF5',
				textSecondary: '#A7F3D0',
				border: '#047857'
			}
		}
	},
	ocean: {
		light: {
			name: 'Ocean Light',
			colors: {
				primary: '#0C4A6E',
				secondary: '#0284C7',
				accent: '#7DD3FC',
				background: '#F0F9FF',
				surface: '#FFFFFF',
				text: '#0C4A6E',
				textSecondary: '#6B7280',
				border: '#BAE6FD'
			}
		},
		dark: {
			name: 'Ocean Dark',
			colors: {
				primary: '#38BDF8',
				secondary: '#0EA5E9',
				accent: '#7DD3FC',
				background: '#0C4A6E',
				surface: '#075985',
				text: '#F0F9FF',
				textSecondary: '#BAE6FD',
				border: '#0284C7'
			}
		}
	},
	sunset: {
		light: {
			name: 'Sunset Light',
			colors: {
				primary: '#DC2626',
				secondary: '#EA580C',
				accent: '#FED7AA',
				background: '#FFF7ED',
				surface: '#FFFFFF',
				text: '#9A3412',
				textSecondary: '#6B7280',
				border: '#FDBA74'
			}
		},
		dark: {
			name: 'Sunset Dark',
			colors: {
				primary: '#FB7185',
				secondary: '#F97316',
				accent: '#FDBA74',
				background: '#9A3412',
				surface: '#C2410C',
				text: '#FFF7ED',
				textSecondary: '#FED7AA',
				border: '#EA580C'
			}
		}
	}
};

interface ThemeContextType {
	colorScheme: ColorScheme;
	mode: Mode;
	theme: Theme;
	setColorScheme: (scheme: ColorScheme) => void;
	setMode: (mode: Mode) => void;
	toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('original');
	const [mode, setMode] = useState<Mode>('light');

	const theme = themes[colorScheme][mode];

	useEffect(() => {
		// Load saved preferences
		const savedScheme = localStorage.getItem('mordoré-color-scheme') as ColorScheme;
		const savedMode = localStorage.getItem('mordoré-mode') as Mode;

		if (savedScheme && themes[savedScheme]) {
			setColorScheme(savedScheme);
		}

		if (savedMode) {
			setMode(savedMode);
		} else {
			// Check system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setMode(prefersDark ? 'dark' : 'light');
		}
	}, []);

	useEffect(() => {
		// Apply CSS variables
		const root = document.documentElement;
		Object.entries(theme.colors).forEach(([key, value]) => {
			root.style.setProperty(`--color-${key}`, value);
		});

		// Save preferences
		localStorage.setItem('mordoré-color-scheme', colorScheme);
		localStorage.setItem('mordoré-mode', mode);
	}, [theme, colorScheme, mode]);

	const toggleMode = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
	};

	return (
		<ThemeContext.Provider
			value={{
				colorScheme,
				mode,
				theme,
				setColorScheme,
				setMode,
				toggleMode
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
};
