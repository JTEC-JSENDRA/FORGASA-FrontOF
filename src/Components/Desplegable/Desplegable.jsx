// Desplegable.jsx
import React from 'react';
import './Desplegable.css';

// Definimos y exportamos el componente funcional 'Desplegable'
// Este componente recibe tres props:
// 1. Datos → Un array con las opciones que se mostrarán en el desplegable
// 2. value → El valor actual seleccionado
// 3. onChange → Una función que se ejecuta cada vez que el usuario cambia la opción
export default function Desplegable({ Datos, value, onChange }) {
    return (
        // Creamos un <select>, que es un menú desplegable en HTML
        // value → el valor actual del select, controlado por el componente padre
        // onChange → se dispara cuando el usuario selecciona otra opción
        // className='desplegable' aplica estilos desde el archivo CSS
        <select value={value} onChange={onChange} className='desplegable'>

            {/* Recorremos el array de 'Datos' usando .map()
                Por cada elemento del array, creamos una opción <option> */}
            {Datos.map((opcion, index) => (
                // key → identificador único para ayudar a React a renderizar mejor
                // value → el valor que se enviará al seleccionar esta opción
                // El texto que se muestra en la opción también es 'opcion'
                <option key={index} value={opcion}>{opcion}</option>
            ))}

        </select>
    );
}
