import { createContext, useContext, useState, useEffect } from 'react'
import { useAuthor } from './AuthorContext'

/*
HOW TO USE THE CONTEXT ?? 
1. import : import { useCart } from '../context/CartContext.jsx';
2. declare what you need at the begining of the component
    => const {cart, setCart } = useCart()

cart : current cart : {id1: nb1, id2: nb2, ...},
setCart : to update the cart
*/


const CartContext = createContext()

function CartProvider({ children }) {
    const { user } = useAuthor()
    
    const [cart, setCart] = useState(() => {
        if (user?.id) {
            const saved = localStorage.getItem(user.id);
            return saved ? JSON.parse(saved) : {};
        }
        return {}; // No user connected : empty cart
    });

    useEffect(() => {
        if (user?.id) {
            localStorage.setItem(user.id, JSON.stringify(cart));
        } else {
            setCart({});
        }
    }, [user]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );

}


const useCart = () => useContext(CartContext)

export { CartProvider, useCart }