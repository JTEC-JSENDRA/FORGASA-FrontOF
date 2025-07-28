import './container-OF.css';

// Este es el componente principal que recibe las órdenes lanzadas como propiedad
export default function ContainerOFLanzadas({ OF_Lanzadas }) {
  // Definimos el ancho de cada columna para usar en los estilos inline
  const widths = {
    titulo: "100%",         // Ancho del título que ocupa toda la fila
    orden: "6%",            // Ancho para la columna "OF" (orden)
    descripcion: "10%",     // Ancho para la columna descripción
    inicioFin: "12%",       // Ancho para fecha de inicio (y fin si hay)
    receta: "10%",          // Ancho para la columna receta
    version: "3.5%",        // Ancho para la columna versión
    destino: "3.5%",        // Ancho para la columna destino
    etapaNombre: "10%",     // Ancho para nombre de la etapa
    etapaNumero: "6%",      // Ancho para número de la etapa
    estado: "8%"            // Ancho para columna estado
  };

  // Verificamos si hay datos en la lista de órdenes lanzadas
  const hasDatos = OF_Lanzadas?.length > 0;

  // Función para formatear fechas a un formato legible "YYYY-MM-DD HH:mm:ss"
  function formatearFechaYHora(fecha) {
    if (!fecha) return ''; // Si no hay fecha, retorna vacío
    const d = new Date(fecha); // Creamos un objeto Date
    if (isNaN(d)) return fecha; // Si no es fecha válida, retornamos lo que venga

    // Armamos la cadena con ceros a la izquierda para mes, día, hora, minutos y segundos
    return (
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ` +
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
    );
  }

  return (
    <>
      {/* Título principal centrado */}
      <div>
        <p className='Titulo-tabla' style={{ textAlign: "center", width: widths.titulo }}>
          ORDENES DE PRODUCCIÓN LANZADAS
        </p>
        <hr className='separador' /> {/* Línea separadora */}
      </div>

      {/* Cabecera de la tabla con los nombres de las columnas */}
      <div>
        <li className='cabecera-tabla'>
          {/* Cada columna tiene un ancho específico definido */}
          <p className='elemento-cabecera' style={{ width: widths.inicioFin }}>Fecha Inicio</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.orden }}>OF</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.descripcion }}>Descripción</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.receta }}>Receta</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.version }}>Versión</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.destino }}>Destino</p><hr clasLanzarOFsName='separador' />
          <p className='elemento-cabecera' style={{ width: widths.etapaNombre }}>Nombre Etapa</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.etapaNumero }}>Etapa</p><hr className='separador' />
          <p className='elemento-cabecera' style={{ width: widths.estado }}>Estado</p><hr className='separador' />
        </li>
        <hr className='separador' /> {/* Línea separadora después de la cabecera */}
      </div>
      {/* Aquí va el cuerpo de la tabla con los datos reales */}
      <ul className='tabla-of'>
        {hasDatos ? ( // Si hay datos, los mostramos
          OF_Lanzadas.map((orden, idx) => (
            <li key={idx} className='elemento-OF'>
              {/* Cada dato se muestra en un párrafo con el ancho correspondiente */}
              <p className='elemento-elemento-OF' style={{ width: widths.inicioFin }}>
                {formatearFechaYHora(orden.fechaInicio)}
              </p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.orden }}>{orden.OF}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.descripcion }}>{orden.descripcion}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.receta }}>{orden.nombreReceta}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.version }}>{orden.version}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.destino }}>{orden.nombreReactor}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.etapaNombre }}>{orden.nombreEtapa}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.etapaNumero }}>{orden.numeroEtapa}</p><hr className='separador' />
              <p className='elemento-elemento-OF' style={{ width: widths.estado }}>{orden.estado}</p><hr className='separador' />
            </li>
          ))
        ) : (
          // Si no hay datos, mostramos un mensaje informativo
          <p style={{ textAlign: "center" }}>No hay órdenes de producción lanzadas</p>
        )}
      </ul>
    </>
  );
}