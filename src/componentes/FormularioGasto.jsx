import { useState, useEffect } from "react";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "./../elementos/ElementosDeFormulario";
import DatePicker from './DatePicker';
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import { Boton } from "./../elementos/Boton";
import SelectCategorias from "./SelectCategorias";
import agregarGasto from './../firebase/agregarGasto';
import {useAuth} from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import {useNavigate} from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';

const IconoPlus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" />
    </svg>
  );
};

const FormularioGasto = ({gasto}) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarInputCantidad] = useState("");
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const {usuario} = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobamos si hay algun gasto.
    // De ser asi establecemos todo el state con los valores del gasto.
    if(gasto){
      //Comprobamos que el gasto sea del usuario actual.
      // Para eso comprobamos el uid guardado en el gasto con el uid del usuario.
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputCantidad(gasto.data().cantidad);
      } else {
        navigate("/lista");
      }
    }
  }, [gasto, usuario, navigate]);

  const handleChange = (e) => {
    if(e.target.name === 'descripcion'){
        cambiarInputDescripcion(e.target.value);
    } else if(e.target.name === 'cantidad'){
        cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //convertimos la cantidad a un numero float con 2 decimales
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    // Comprobamos que haya una descripcion y valor
    if (inputDescripcion !== '' && inputCantidad !== '') {

      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha)
          }).then(() => {
            navigate('/lista');
          }).catch((error) => {
            console.log(error);
          });
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid
          })
          .then(() => {
            cambiarCategoria('hogar')
            cambiarInputDescripcion('')
            cambiarInputCantidad('')
            cambiarFecha(new Date)
  
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.'})
          })
          .catch((error) => {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar agregar tu gasto.'})
          })
        }        
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'})
      }

    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto.'})
    }
  }

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias 
            categoria={categoria}
            cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
      </ContenedorFiltros>

      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion del gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          { gasto ? 'Editar Gasto' : 'Agregar Gasto' } <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta 
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
