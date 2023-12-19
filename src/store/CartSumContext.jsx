import { createContext, useState } from 'react';
import { calculateCartSum, calculateTotalItems } from '../util/calculationsUtil';

// tema kaudu hakkan võtma mida context väljastab
export const CartSumContext = createContext({ // näitab kõiki muudetavaid mida sellest contextist vaja
    cartSum: 0,
    cartDiffernetItems: 0,
    cartTotalItems: 0,
    setCartSum: (cartSum) => {}, //näitab et ta tahab muutujana cartSumi
    setCartDifferentItems: (number) => {},
    setCartTotalItems: (number) => {}
}); // tekidab app-wide parameetri

// index.js faili -> tema sees olev useState globaalne
export function CartSumContextProvider({ children }) { // children lisa et ülejäänud app tuleks ka läbi
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const [cartSum, setCartSum] = useState(calculateCartSum(cart));

    const [cartDiffernetItems, setCartDifferentItems] = useState(cart.length);
    const [cartTotalItems, setCartTotalItems] = useState(calculateTotalItems(cart));

    return (
        <CartSumContext.Provider value={{
            cartSum, setCartSum, 
            cartDiffernetItems, setCartDifferentItems, 
            cartTotalItems, setCartTotalItems
            }}>
            { children }
        </CartSumContext.Provider>
    )
}