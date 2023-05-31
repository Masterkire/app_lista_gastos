import React, { useState } from "react";
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

const FormularioGasto = () => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarInputCantidad] = useState("");
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const {usuario} = useAuth();

  const handleChange = (e) => {
    if(e.target.name === 'descripcion'){
        cambiarInputDescripcion(e.target.value);
    } else if(e.target.name === 'cantidad'){
        cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let cantidad = parseFloat(inputCantidad).toFixed(2);

    // console.log(inputDescripcion, inputCantidad, categoria, fecha);
    agregarGasto({
      categoria: categoria,
      descripcion: inputDescripcion,
      cantidad: cantidad,
      fecha: getUnixTime(fecha),
      uidUsuario: usuario.uid
    });
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
          Agregar Gasto <IconoPlus />
        </Boton>
      </ContenedorBoton>
    </Formulario>
  );
};

export default FormularioGasto;
