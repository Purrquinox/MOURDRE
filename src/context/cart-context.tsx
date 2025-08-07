'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
	id: number;
	name: string;
	price: string;
	image: string;
	size?: string;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;
	total: number;
}

type CartAction =
	| { type: 'ADD_ITEM'; payload: CartItem }
	| { type: 'REMOVE_ITEM'; payload: number }
	| { type: 'TOGGLE_CART' }
	| { type: 'CLEAR_CART' };

const CartContext = createContext<{
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD_ITEM':
			return {
				...state,
				items: [...state.items, action.payload],
				total: state.total + parseFloat(action.payload.price.replace('$', '').replace(',', ''))
			};
		case 'REMOVE_ITEM':
			const itemToRemove = state.items.find((item) => item.id === action.payload);
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
				total:
					state.total -
					(itemToRemove ? parseFloat(itemToRemove.price.replace('$', '').replace(',', '')) : 0)
			};
		case 'TOGGLE_CART':
			return { ...state, isOpen: !state.isOpen };
		case 'CLEAR_CART':
			return { ...state, items: [], total: 0 };
		default:
			return state;
	}
};

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, {
		items: [],
		isOpen: false,
		total: 0
	});

	return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within CartProvider');
	return context;
};
