import './container-OF.css';
import React, { useState, useEffect } from 'react';
import Desplegable from '../Desplegable/Desplegable.jsx';
import Boton from '../Boton/Boton.jsx';

export default function ContainerOF({ OF_Liberadas, OF_Lanzadas, LanzarOF }) {
  // Anchos de columnas
  const width = {
    orden: "6%",
    material: "9%",
    descripcion: "10%",
    cantidad: "5%",
    unidad: "1.5%",
    fecha: "14%",
    alternativa: "2%",
    operacion: "6%",
    receta: "10%",
    version: "3.5%",
    destino: "3.5%",
    accion: "3.5%"
  };

  const hayDatos = OF_Liberadas?.length > 0;

  return (
    <>
      {/* Título */}
      <div>
        <p className='elemento-cabecera' style={{ textAlign: "center" }}>
          ORDENES DE PRODUCCIÓN LIBERADAS
        </p>
        <hr className='separador' />
      </div>

      {/* Cabecera de la tabla */}
      <div>
        <li className='cabecera-tabla'>
          <p className='elemento-cabecera' style={{ width: width.orden }}>OF</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.material }}>Material</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.descripcion }}>Descripción</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.cantidad }}>Cantidad</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.unidad }}>Ud.</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.fecha }}>Inicio Programado</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.fecha }}>Fin Programado</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.alternativa }}>Alt.</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.operacion }}>Operación</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.receta }}>Receta</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.version }}>Versión</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.destino }}>Destino</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: width.accion }}>Acción</p><hr className='separador' />
        </li>
        <hr className='separador' />
      </div>

      {/* Cuerpo de la tabla */}
      <div className='tabla-of'>
        {
          hayDatos
            ? OF_Liberadas.map((orden, index) => {
                // Estados para campos seleccionables
                const [recetaSeleccionada, setRecetaSeleccionada] = useState("");
                const [versionSeleccionada, setVersionSeleccionada] = useState("");
                const [destinoSeleccionado, setDestinoSeleccionado] = useState("");
                const [listaVersiones, setListaVersiones] = useState([]);

                // Efecto para obtener versiones al cambiar la receta
                useEffect(() => {
                  if (recetaSeleccionada) {
                    fetch(`http://localhost:7248/api/Liberadas/obtenerVersionesReceta?receta=${recetaSeleccionada}`)
                      .then(res => res.ok ? res.text() : Promise.reject(`HTTP ${res.status}`))
                      .then(text => JSON.parse(text))
                      .then(data => setListaVersiones(data.versiones || []))
                      .catch(err => console.error("Error al obtener versiones:", err));
                  }
                }, [recetaSeleccionada]);

                // Handlers
                const cambiarReceta = (e) => {
                  setRecetaSeleccionada(e.target.value);
                  setVersionSeleccionada("0"); 
                  setDestinoSeleccionado("--");
                };
                const cambiarVersion = (e) => setVersionSeleccionada(e.target.value);
                const cambiarDestino = (e) => setDestinoSeleccionado(e.target.value);

                // Validación de operaciones permitidas
                const operaciones = Array.isArray(orden.OPERACIONES?.item)
                  ? orden.OPERACIONES.item
                  : [orden.OPERACIONES?.item];

                const tieneOperacionValida = operaciones.some(op =>
                  ["FO111001", "FO111002", "FO112001"].includes(op?.ARBPL)
                );

                const esLiberada = orden.GMDix.estado === "Liberada";

                // Renderizar solo si cumple condiciones
                if (!esLiberada || !tieneOperacionValida) return null;

                return (
                  <li key={index} className="elemento-OF">
                    <p className="elemento-elemento-OF" style={{ width: width.orden }}>
                      {parseInt(orden.AUFNR, 10)}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.material }}>
                      {parseInt(orden.PLNBEZ, 10)}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.descripcion }}>
                      {orden.MAKTX}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.cantidad }}>
                      {orden.GAMNG}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.unidad }}>
                      {orden.GMEIN}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.fecha }}>
                      {orden.GSTRS} / {orden.GSUZS}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.fecha }}>
                      {orden.GLTRS} / {orden.GLUZS}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.alternativa }}>
                      {orden.STLAL}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.operacion }}>
                      {orden.GMDix.operacion}
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.receta }}>
                      <Desplegable
                        Datos={orden.GMDix.nombreReceta}
                        value={recetaSeleccionada}
                        onChange={cambiarReceta}
                      />
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.version }}>
                      <Desplegable
                        Datos={listaVersiones}
                        value={versionSeleccionada}
                        onChange={cambiarVersion}
                      />
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.destino }}>
                      <Desplegable
                        Datos={orden.GMDix.nombreReactor}
                        value={destinoSeleccionado}
                        onChange={cambiarDestino}
                      />
                    </p><hr className="separador" />

                    <p className="elemento-elemento-OF" style={{ width: width.accion }}>
                      <Boton
                        Datos={orden}
                        LanzarOF={LanzarOF}
                        Receta={recetaSeleccionada}
                        Version={versionSeleccionada}
                        Destino={destinoSeleccionado}
                        ordenesLanzadas={OF_Lanzadas}
                      />
                    </p><hr className="separador" />
                  </li>
                );
              })
            : <p style={{ textAlign: "center" }}>Cargando datos...</p>
        }
      </div>
    </>
  );
}
