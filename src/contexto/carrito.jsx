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
        const posProdRepetido = productos.findIndex((prod)=>{ return prod.nombre === nuevoProducto.nombre});
        console.log(posProdRepetido, nuevoProducto, productos);
        if (posProdRepetido === -1) {
            setProductos([...productos, nuevoProducto]);
        }else{
            setProductos((productosPrev)=>{
                productosPrev[posProdRepetido].cantidad += nuevoProducto.cantidad;
                return [...productosPrev]; 
            });
        }
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