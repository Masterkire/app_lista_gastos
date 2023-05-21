// import React from "react";
import {Helmet} from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import {Boton} from './../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import SvgLogin from './../ComponentSvg/SvgLogin';

const RegistroUsuarios = () => {
    return ( 
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario>
                <SvgLogin />
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
                <Input 
                    type="password"
                    name="password2"
                    placeholder="Repetir la contraseña"
                />
                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
     );
}
 
export default RegistroUsuarios;