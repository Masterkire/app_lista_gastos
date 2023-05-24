import React, { useState, useContext, useEffect } from 'react';
import {auth} from './../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

// Creamos el contexto;
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    // Creamos un state para saber cuando termina de
    // cargar la comprovacion de onAuthStateChanged
    const [cargando, cambiarCargando] = useState(true);

    // Efecto para ejecutar la comprobacion una sola vez.
    useEffect(() => {
        // Comprovamos si hay un usuario.
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        }, []);

        return cancelarSuscripcion;
    });

    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {/* Solamente retornamos los elementos hijos cuando no este cargando.
            De esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido establecido.
            
            Si no hacemos esto alñ recargar la pagina el componente children intenta cargar inmediatamente,
            antes de haber comprobado que existe un usuario. */}
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export {AuthProvider, AuthContext, useAuth};