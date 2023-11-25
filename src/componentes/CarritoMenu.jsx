import { useContext, useEffect, useId, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../estilos/CarritoMenu.css"
import { CarritoContexto } from '../contexto/carrito';

function CarritoMenu({ name, ...props }) {
  const [show, setShow] = useState(false);
  const carrito = useContext(CarritoContexto);
  const [productosAgregados, setProdAgregados] = useState(null);
  const idCarrito = useId();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setProdAgregados(carrito.productos.map((prod,i) => {
      return (
        <li key={idCarrito+"prod"+i} className='prod-carrito'>
          <ul>
            <li>{prod.nombre}</li>
            <li>${prod.precio}</li>
            <li>{prod.cantidad}</li>
          </ul>
        </li>
      )
    }));
  }, [carrito.productos]);



  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas id="carrito-menu" show={show} onHide={handleClose} {...props}  scroll={true}
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
            {carrito.productos.length? productosAgregados:<h2>No hay productos</h2>}
          </ol>
        </Offcanvas.Body>
        <div id='secc-confirm'>
          <button className='btn btn-success'>Confirmar</button>
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