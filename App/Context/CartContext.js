import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);



    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const productExists = prevCart.find((item) => item._id === product._id);
            setTotal(total + product.precioUnitario);
            if (productExists) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId, precio) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        setTotal(total - precio)
    };

    // Función para vaciar el carrito
    const clearCart = () => {      
        setTotal(0)
                    setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCart = () => {
    return useContext(CartContext);
};
