// Desplegable.jsx
import React from 'react';
import './Desplegable.css';

export default function Desplegable({ Datos, value, onChange }) {
    return (
        <select value={value} onChange={onChange} className='desplegable'>
            {Datos.map((opcion, index) => (
                <option key={index} value={opcion}>{opcion}</option>
            ))}
        </select>
    );
}
