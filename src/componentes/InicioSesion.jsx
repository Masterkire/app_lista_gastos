// import React from "react";
import {Helmet} from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import {Boton} from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import Login from './../ComponentSvg/Login';

const InicioSesion = () => {
    return ( 
        <>
            <Helmet>
                <title>Iniciar sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar sesion</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario>
                <Login />
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                />
                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Iniciar sesion</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
     );
}
 
export default InicioSesion;