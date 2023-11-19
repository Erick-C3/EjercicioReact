import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../estilos/Tarjeta.css"
import ListaCantidad from './ListaCantidad.jsx';
import { useContext, useState } from 'react';
import { ProductoContexto } from '../contexto/producto.jsx';

function Tarjeta({nombre, precio, imagen}) {
  const producto = useContext(ProductoContexto);
  const [cantSelecc, setCantSelecc] = useState(0);
  return (
    <Card className='tarjeta-producto' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen} alt={imagen}/>
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          Precio: {precio}$
        </Card.Text>
        <Card.Text>
          Cantidad: {producto.cantidad} u 
        </Card.Text>
        <ListaCantidad
          actualizarSelecc = {setCantSelecc}
        />
        <Button onClick={()=>{producto.setCantidad(producto.cantidad - cantSelecc)}} variant="primary">Agregar</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;