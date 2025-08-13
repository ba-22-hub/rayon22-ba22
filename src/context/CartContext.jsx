import { createContext, useContext, useState, useEffect } from 'react'
import { useAuthor } from './AuthorContext'

/*
HOW TO USE THE CONTEXT ?? 
1. import : import { useCart } from '../context/CartContext.jsx';
2. declare what you need at the begining of the component
    => const {cart, setCart, client } = useCart()

cart : current cart : {id1: nb1, id2: nb2, ...},
setCart : to update the cart
client : session associated to cart
*/


const CartContext = createContext()

function CartProvider({ children }) {
    const { user } = useAuthor()

    console.log(user)

    const [client, setClient] = useState({user})

    console.log(client)

    if (user === client) {
        // Current cart belongs to user
        const [cart, setCart] = useState(() => {
            const saved = localStorage.getItem(client);
            return saved ? JSON.parse(saved) : {};
        });

        useEffect(() => {
            localStorage.setItem(client, JSON.stringify(cart));
        }, [cart]);

        return (
            <CartContext.Provider value={{ cart, setCart, client }}>
                {children}
            </CartContext.Provider>
        );

    } else {
        // Different user : new cart
        const [cart, setCart] = useState({})

        useEffect(() => {
            localStorage.setItem(client, JSON.stringify(cart));
        }, [cart]);

        return (
            <CartContext.Provider value={{ cart, setCart, client }}>
                {children}
            </CartContext.Provider>
        );
    }
}


const useCart = () => useContext(CartContext)

export { CartProvider, useCart }