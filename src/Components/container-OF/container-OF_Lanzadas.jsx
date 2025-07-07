import './container-OF.css';

export default function ContainerOFLanzadas({ OF_Lanzadas }) {
  // Anchos de columnas
  const widths = {
    titulo: "100%",
    orden: "6%",
    descripcion: "10%",
    inicioFin: "12%",
    receta: "10%",
    version: "3.5%",
    destino: "3.5%",
    etapaNombre: "10%",
    etapaNumero: "6%",
    estado: "8%"
  };

  const hasDatos = OF_Lanzadas?.length > 0;

  // Formatear fecha a "YYYY-MM-DD HH:mm:ss"
  function formatearFechaYHora(fecha) {
    if (!fecha) return '';
    const d = new Date(fecha);
    if (isNaN(d)) return fecha;

    return (
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ` +
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
    );
  }

  return (
    <>
      <div>
        <p className='elemento-cabecera' style={{ textAlign: "center", width: widths.titulo }}>
          ORDENES DE PRODUCCIÓN LANZADAS
        </p>
        <hr className='separador' />
      </div>

      {/* Cabecera de tabla */}
      <ul className='cabecera-tabla'>
        <p className='elemento-cabecera' style={{ width: widths.inicioFin }}>Fecha Inicio</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.orden }}>OF</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.descripcion }}>Descripción</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.receta }}>Receta</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.version }}>Versión</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.destino }}>Destino</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.etapaNombre }}>Nombre Etapa</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.etapaNumero }}>Etapa</p><hr className='separador' />
        <p className='elemento-cabecera' style={{ width: widths.estado }}>Estado</p><hr className='separador' />
      </ul>
      <hr className='separador' />

      {/* Cuerpo de la tabla */}
      <ul className='tabla-of'>
        {hasDatos ? (
          OF_Lanzadas.map((orden, idx) => (
            <li key={idx} className='elemento-OF'>
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
          <p style={{ textAlign: "center" }}>No hay órdenes de producción lanzadas</p>
        )}
      </ul>
    </>
  );
}
