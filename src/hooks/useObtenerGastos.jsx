import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit } from 'firebase/firestore';

const useObtenerGastos = () => {
    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([]);

    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        })

        return unsuscribe;
    }, [usuario]);

    return [gastos];
}
 
export default useObtenerGastos;