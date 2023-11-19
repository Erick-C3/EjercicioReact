import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ProductoContexto } from '../contexto/producto';

function ListaCantidad(props) {

  const [opciones, setOpciones] = useState(null);
  const producto = useContext(ProductoContexto);

  useEffect(()=>{
    const opcionesTemp = [];
    for (let i = 1; i <= producto.cantidad; i++) {
      opcionesTemp.push(<option key={"opc-prod-"+i} value={i}>{i}</option>);
    }
    setOpciones(opcionesTemp);
  },[producto.cantidad]);

  return (
    <Form.Select onChange={(e)=>{ props.actualizarSelecc(e.target.value)}} aria-label="Default select example">
      <option>{producto.cantidad>0?"Seleccione":"Sin stock"}</option>
      {opciones}
    </Form.Select>
  );
}

export default ListaCantidad;