import React from "react";
import {Header, Titulo} from './../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';

const EditarGasto = () => {
    return ( 
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Editar Gasto</Titulo>
            </Header>

            <FormularioGasto />

            <BarraTotalGastado />
        </>
     );
}
 
export default EditarGasto;