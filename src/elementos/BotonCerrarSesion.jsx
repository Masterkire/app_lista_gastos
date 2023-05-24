import React from "react";
import {Boton} from './Boton';
import {auth} from './../firebase/firebaseConfig';
import {signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const IconoCerrarSesion = () => {
    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z"/></svg>
     );
}

const BotonCerrarSesion = () => {

    const navigate = useNavigate();
    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            navigate('/iniciar-sesion')
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Boton iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
     );
}
 
export {BotonCerrarSesion};

