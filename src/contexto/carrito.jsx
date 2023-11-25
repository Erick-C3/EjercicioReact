import { createContext, useState } from "react";

export const CarritoContexto = createContext(null);

const DEF_PROD = {
    nombre: "defprod",
    precio: 999999,
    cantidad: -1
}


export function CarritoProvider({children}) {

    const [productos, setProductos] = useState([DEF_PROD]);

    function agregarProducto(nuevoProducto) {
        setProductos([...productos, nuevoProducto]);
    }

    return (
        <CarritoContexto.Provider value={
            {
                productos,
                setProductos: agregarProducto
            }
        }>
            {children}
        </CarritoContexto.Provider>
    )
}