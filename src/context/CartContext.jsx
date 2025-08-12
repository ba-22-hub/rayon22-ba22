import { createContext, useContext, useState } from 'react'
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

    const [cart, setCart] = useState({})
    const [client, setClient] = useState(user)
    

    return (
        <CartContext.Provider value={{ cart, setCart, client }}>
            {children}
        </CartContext.Provider>
    );
}


const useCart = () => useContext(CartContext)

export { CartProvider, useCart }