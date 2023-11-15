import { useEffect, useState } from 'react'
import './App.css'
import Tarjeta from './componentes/Tarjeta.jsx'

const DEF_TARJETA = <Tarjeta
  key={"def key"}
  nombre="def producto"
  precio={9999999}
  imagen="def url"
/>;

function App() {

  const [productos, setProductos] = useState([DEF_TARJETA]);

  useEffect(()=>{
    console.log("Effect");

    async function pedirProductos(){
      const res = await fetch("http://localhost:4000/productos");
      let productos = "def producto";
      const tempComponentTarjetas = []
      if(res.ok){
        productos = await res.json();
        console.log(productos);
        productos.forEach(producto => {
          tempComponentTarjetas.push(
            <Tarjeta
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          );
        });
        setProductos(tempComponentTarjetas);
      }
    }

    pedirProductos()

    return ()=>{
      console.log("Limpiando efecto");
    }
  },[]);


  return (
    <div id='productos'>
      {productos}
    </div>
  )
}

export default App
