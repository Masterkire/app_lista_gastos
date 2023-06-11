import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from 'firebase/firestore';

const useObtenerGastos = () => {
    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

    const obtenerMasGastos = () => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        onSnapshot(consulta, (snapshot) => {
            console.log(snapshot.docs.length);
            if (snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                
                cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return {...gasto.data(), id: gasto.id}
                })))
            } else {
                console.log("La condicion no es valida");
                cambiarHayMasPorCargar(false);
            }
        }, error => {console.log(error)})

        console.log("Los datos fueron ejecutados");
    }

    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            /* console.log(snapshot.docs[snapshot.docs.length -1].data()); */
            if (snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                cambiarHayMasPorCargar(true);
            } else {
                cambiarHayMasPorCargar(false);
            }

            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        });

        return unsuscribe;
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;