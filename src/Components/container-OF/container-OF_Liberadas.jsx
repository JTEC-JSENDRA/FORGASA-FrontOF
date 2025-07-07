import './container-OF.css'
import React, { useState, useEffect } from 'react';
import Desplegable from '../Desplegable/Desplegable.jsx'
import Boton from '../Boton/Boton.jsx'


export default function container_OF({OF_Liberadas, OF_Lanzadas, LanzarOF}){


  const width_Orden = "6%";
  const width_Material = "9%";
  const width_TextoMaterial = "10%";
  const width_Cantidad = "5%";                                    
  const width_Unidades = "1.5%";
  const width_InicioFin = "14%";
  const width_Alternativa = "2%";
  const width_Operacion = "6%";
  const width_Receta = "10%";
  const width_Version = "3.5%";
  const width_Destino = "3.5%";
  const width_Accion = "3.5%";
  const hasDatos = OF_Liberadas?.length > 0
  
  //console.log("OF_Liberadas recibidas:", OF_Liberadas);

  return(
      <>
        <div>
          <p className='elemento-cabecera'  style={{textAlign: "center"}}>ORDENES DE PRODUCCIÓN LIBERADAS</p>
          <hr className='separador' />
        </div>

        {/* Barra Superior */}
        <div>
          <li className='cabecera-tabla'>
            <p className='elemento-cabecera' style={{width: width_Orden}}>OF</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Material}}>Material</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_TextoMaterial}}>Descripción</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Cantidad}}>Cantidad</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Unidades}}>Ud.</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_InicioFin}}>Inicio Programado</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_InicioFin}}>Fin Programado</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Alternativa}}>Alt.</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Operacion}}>Operacion</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Receta}}>Receta</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Version}}>Version</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Destino}}>Destino</p>
            <hr className='separador' />
            <p className='elemento-cabecera' style={{width: width_Accion}}>Acción</p>
            <hr className='separador' />
          </li>
          <hr className='separador' />
        </div>
        
        {/* Tabla con los datos */}
        <div className='tabla-of'>
  {
      hasDatos
      ? OF_Liberadas.map((OrdenFabricacion, index) => {

        const [selectedReceta, setSelectedReceta] = useState("");
        const [selectedVersion, setSelectedVersion] = useState("");
        const [selectedDestino, setSelectedDestino] = useState("");
        const [versiones, setVersiones] = useState([]); // Estado para las versiones obtenidas de la API
      
          // Log completo de cada OrdenFabricacion
          //console.log(`OrdenFabricacion[${index}] completa:\n`, JSON.stringify(OrdenFabricacion, null, 2));
          
          if (!OrdenFabricacion?.GMDix?.nombreReceta || OrdenFabricacion.GMDix.nombreReceta === "Vacio") {
            //console.warn(`⚠️ OF[${index}] SIN receta válida:`, OrdenFabricacion.AUFNR);
          }
          // Llamar a la API cuando cambia la receta seleccionada
          useEffect(() => {
            
            if (selectedReceta) {

              const url = `http://localhost:7248/api/Liberadas/obtenerVersionesReceta?receta=${selectedReceta}`;
              //console.log("Receta seleccionada:", selectedReceta);
              //console.log("URL:", url);

              fetch(`http://localhost:7248/api/Liberadas/obtenerVersionesReceta?receta=${selectedReceta}`)
               
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.text(); // Primero obtenemos el texto en bruto
              })
              .then(text => {
                if (!text) {
                  throw new Error("La respuesta está vacía");
                }
                return JSON.parse(text); // Convertimos manualmente a JSON
              })
              .then(data => {
                //console.log("Datos recibidos:", data);
                setVersiones(data.versiones || []);
              })
              .catch(error => console.error("Error obteniendo versiones:", error));
            }
          }, [selectedReceta]);
      
        const handleRecetaChange = (event) => {
          setSelectedReceta(event.target.value);
          setSelectedVersion("0"); // Reiniciar versión cuando se cambia la receta
          setSelectedDestino("--");
          /*
          console.log("Receta cambiada, reiniciando valores: ", {
            selectedVersion: "0",
            selectedDestino: "--",
          });
          console.log("Receta cambiada:", event.target.value);
          */
        };
      
        const handleVersionChange = (event) => {
            setSelectedVersion(event.target.value);
        };
      
        const handleDestinoChange = (event) => {
            setSelectedDestino(event.target.value);
        };
        
          // Verifica si `OPERACIONES.item` es un array
          const items = Array.isArray(OrdenFabricacion.OPERACIONES?.item)
              ? OrdenFabricacion.OPERACIONES.item
              : [OrdenFabricacion.OPERACIONES?.item]; // Si no es array, conviértelo en un array con un único elemento

          // Filtra los elementos que tienen el ARBPL deseado
          const tieneARBPL = items.some(item => 
              item?.ARBPL === "FO111001" ||
              item?.ARBPL === "FO111002" ||
              item?.ARBPL === "FO112001"
          );
          //console.log(" - - - - - - - - ");
          //console.log(tieneARBPL);

          //console.log("Recetas:",{ nombreReceta: OrdenFabricacion.GMDix.nombreReceta });

          // DEBUG receta ->>>>> SALE VACÍO <<<<-
          //console.log(`Receta cruda [${index}]:`, OrdenFabricacion.GMDix.nombreReceta);

          //console.log(OrdenFabricacion.GMDix.nombreReceta);
          //console.log("Datos para desplegable de receta:", OrdenFabricacion.GMDix.nombreReceta);
          // Renderiza solo si el estado es "Liberada" y contiene los ARBPL deseados

          return OrdenFabricacion.GMDix.estado === "Liberada" && tieneARBPL ? (
            <li key={index} className="elemento-OF">
              <p className="elemento-elemento-OF" style={{ width: width_Orden }}>
                {parseInt(OrdenFabricacion.AUFNR, 10)}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Material }}>
                {parseInt(OrdenFabricacion.PLNBEZ, 10)}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_TextoMaterial }}>
                {OrdenFabricacion.MAKTX}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Cantidad }}>
                {OrdenFabricacion.GAMNG}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Unidades }}>
                {OrdenFabricacion.GMEIN}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_InicioFin }}>
                {OrdenFabricacion.GSTRS} / {OrdenFabricacion.GSUZS}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_InicioFin }}>
                {OrdenFabricacion.GLTRS} / {OrdenFabricacion.GLUZS}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Alternativa }}>
                {OrdenFabricacion.STLAL}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Operacion }}>
                {OrdenFabricacion.GMDix.operacion}
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Receta }}>
                <Desplegable
                  Datos={OrdenFabricacion.GMDix.nombreReceta}
                  value={selectedReceta}
                  onChange={handleRecetaChange}
                />
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Version }}>
                <Desplegable
                  Datos={versiones}
                  value={selectedVersion}
                  onChange={handleVersionChange}
                />
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Destino }}>
                <Desplegable
                  Datos={OrdenFabricacion.GMDix.nombreReactor}
                  value={selectedDestino}
                  onChange={handleDestinoChange}
                />
              </p>
              <hr className="separador" />
          
              <p className="elemento-elemento-OF" style={{ width: width_Accion }}>
                <Boton
                  Datos={OrdenFabricacion}
                  LanzarOF={LanzarOF}
                  Receta={selectedReceta}
                  Version={selectedVersion}
                  Destino={selectedDestino}
                  ordenesLanzadas={OF_Lanzadas}
                />
              </p>
              <hr className="separador" />
            </li>
          ) : null;
    })
      : <p style={{ textAlign: "center" }}>Cargando datos</p>
    }
    </div>
    </>
  )
}