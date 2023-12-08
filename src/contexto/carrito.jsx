import { createContext, useState } from "react";

export const CarritoContexto = createContext(null);

/* const DEF_PROD = {
    nombre: "defprod",
    precio: 999999,
    cantidad: -1
} */
export const API_PEDIDO = "http://localhost:4000/pedidos";

export function CarritoProvider({children}) {

    const [productos, setProductos] = useState([]);
    const [compraConfirmada, setCompraConfirmada] = useState(false);

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

    function vaciar() {
        setProductos([]);
    }

    return (
        <CarritoContexto.Provider value={
            {
                productos,
                setProductos: agregarProducto,
                compraConfirmada,
                setCompraConfirmada,
                vaciar
            }
        }>
            {children}
        </CarritoContexto.Provider>
    )
}