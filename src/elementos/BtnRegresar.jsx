import React from 'react';
import styled from 'styled-components';
import IconoFlecha from './../ComponentSvg/Flecha.jsx';
import {useNavigate} from 'react-router-dom';

const Btn = styled.button`
    display: block;
    width: 3.12rem;
    height: 3.12rem;
    line-height: 3.12rem;
    text-align: center;
    margin-right: 1.25rem;
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem;
    cursor: pointer;

    @media(max-width: 60rem) {
        width: 2.5rem;
        height: 2.5rem;
        line-hright: 2.5rem;
    }
`;

const BtnRegresar = ({ruta = '/'}) => {
    const navigate = useNavigate();

    return ( 
        <Btn onClick={() => navigate(ruta)}><IconoFlecha /></Btn>
     );
}
 
export default BtnRegresar;