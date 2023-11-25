import {useEffect, useId, useState } from 'react'
import './App.css'
import Tarjeta from './componentes/Tarjeta.jsx'
import { ProductoProvider } from './contexto/producto.jsx';
import CarritoMenu from './componentes/CarritoMenu.jsx';
import IconoCarrito from './iconos/IconoCarrito.jsx';

/* const DEF_TARJETA = <ProductoProvider>
  <Tarjeta
  key={"def key"}
  nombre="def producto"
  precio={9999999}
  imagen="def url"
/>
</ProductoProvider> */

function App() {
  const [productos, setProductos] = useState(/* DEF_TARJETA */ "DEF PROD");
  const idApp = useId();

  useEffect(() => {
    console.log("Effect");

    async function pedirProductos() {
      const res = await fetch("http://localhost:4000/productos");
      let productos = "def producto";
      const tempComponentTarjetas = []
      if (res.ok) {
        productos = await res.json();
        console.log(productos);
        productos.forEach(producto => {
          tempComponentTarjetas.push(
            <ProductoProvider key={"prod-provider-" + producto.id} cantidadInicial={producto.cantidad}>
              <Tarjeta
                key={"tarjeta-" + producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </ProductoProvider>
          );
        });
        setProductos(tempComponentTarjetas);
      }
    }

    pedirProductos()

    return () => {
      console.log("Limpiando efecto");
    }
  }, []);


  return (
    <>
      <CarritoMenu
        key={idApp+"carrito-menu"}
        placement="end"
        name={<IconoCarrito.Menu/>}
      />
      <div id='productos'>
        {productos}
      </div>
    </>
  )
}

export default App
