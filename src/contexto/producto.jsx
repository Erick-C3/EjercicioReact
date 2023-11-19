import { createContext, useState } from "react";

export const ProductoContexto = createContext();

export function ProductoProvider({children, cantidadInicial}) {
    const [cantidad, setCantidad] = useState(cantidadInicial);

    function regularCantidad(nuevaCantidad) {
        if (nuevaCantidad >=0) {
            setCantidad(nuevaCantidad);
        }
    }
    
    return (
        <ProductoContexto.Provider value={
            {
                cantidad,
                setCantidad: regularCantidad
            }
        }>
            {children}
        </ProductoContexto.Provider>
    );
}