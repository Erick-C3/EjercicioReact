import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../estilos/Tarjeta.css"

function Tarjeta({nombre, precio, imagen}) {
  return (
    <Card className='tarjeta-producto' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen} alt={imagen}/>
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          Precio: {precio}$
        </Card.Text>
        <Button variant="primary">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;