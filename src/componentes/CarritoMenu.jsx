import { useContext, useEffect, useId, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../estilos/CarritoMenu.css"
import { API_PEDIDO, CarritoContexto } from '../contexto/carrito';

function CarritoMenu({ name, ...props }) {
  const [show, setShow] = useState(false);
  const carrito = useContext(CarritoContexto);
  const [productosAgregados, setProdAgregados] = useState(null);
  const idCarrito = useId();
  let idCliente = -1;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (carrito.compraConfirmada) {
      setProdAgregados([])
    } else {
      setProdAgregados(carrito.productos.map((prod, i) => {
        return (
          <li key={idCarrito + "prod" + i} className='prod-carrito'>
            <ul>
              <li>{prod.nombre}</li>
              <li>${prod.precio}</li>
              <li>{prod.cantidad}</li>
            </ul>
          </li>
        )
      }));
    }
  }, [carrito.productos, carrito.compraConfirmada]);


  function confirmarCompra() {
    try {
      carrito.productos.forEach(async producto => {
        const info = await fetch(API_PEDIDO, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            cliente_id: idCliente
          })
        });
        const res = await info.json();
        console.log(info.status);
        if (info.status === 201) {
          carrito.setCompraConfirmada(true);
          carrito.vaciar();
        }
      })
    } catch (error) {
      console.log("error POST: ", error);
    }
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas id="carrito-menu" show={show} onHide={handleClose} {...props} scroll={true}
        backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Agregar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ol>
            {/* <li>
              <ul>
                <li>Nombre</li>
                <li>Precio</li>
                <li>Cantidad</li>
              </ul>
            </li> */}
            {carrito.productos.length ? productosAgregados : (carrito.compraConfirmada ? <h2>Gracias por comprar!</h2> : <h2>No hay productos</h2>)}
          </ol>
        </Offcanvas.Body>
        <div id='secc-confirm'>
          <input onChange={(event) => idCliente = event.target.value} type="number" placeholder='id cliente' />
          <button onClick={confirmarCompra} className='btn btn-success'>Confirmar</button>
        </div>
      </Offcanvas>
    </>
  );
}

export default CarritoMenu;

/* function Example() {
  return (
    <>
      {['start', 'end', 'top', 'bottom'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

render(<Example />); */