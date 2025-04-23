import './container-OF.css'

export default function container_OF_Runing({OF_Lanzadas}){
    
    const width_Titulo = "100%";
    const width_Orden = "6%";
    const width_TextoMaterial = "10%";
    const width_InicioFin = "12%";
    const width_Receta = "10%";
    const width_Version = "3.5%";
    const width_Destino = "3.5%";
    const width_Etapa = "10%";
    const width_Numero_Etapa = "6%";
    const width_Estado = "8%";
    const hasDatos = OF_Lanzadas?.length > 0

    // console.log(OF_Lanzadas)

    return (
        <>
        <div>
            <p className='elemento-cabecera'  style={{textAlign: "center"}}>Production Orders launched from SCADA</p>
            <hr className='separador' />
        </div>
        <div>
            <li className='cabecera-tabla'>
                <p className='elemento-cabecera' style={{width: width_InicioFin}}>Fecha Inicio</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Orden}}>OF</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_TextoMaterial}}>Descripción</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Receta}}>Receta</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Version}}>Version</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Destino}}>Destino</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Etapa}}>Nombre Etapa</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Numero_Etapa}}>Etapa</p>
                <hr className='separador' />
                <p className='elemento-cabecera' style={{width: width_Estado}}>Estado</p>
                <hr className='separador' />
            </li>
            <hr className='separador' />
        </div>

        {/* Tabla con los datos */}
        <div className='tabla-of'>
            {
                hasDatos
                ? OF_Lanzadas.map((OrdenFabricacion, index) => (
                    <li key={index} className='elemento-OF'>
                        <p className='elemento-elemento-OF' style={{ width: width_InicioFin }}>{OrdenFabricacion.fechaInicio}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Orden }}>{OrdenFabricacion.OF}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_TextoMaterial }}>{OrdenFabricacion.descripcion}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Receta }}>{OrdenFabricacion.nombreReceta}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Version }}>{OrdenFabricacion.version}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Destino }}>{OrdenFabricacion.nombreReactor}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Etapa }}>{OrdenFabricacion.nombreEtapa}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Numero_Etapa }}>{OrdenFabricacion.numeroEtapa}</p>
                        <hr className='separador' />
                        <p className='elemento-elemento-OF' style={{ width: width_Estado }}>{OrdenFabricacion.estado}</p>
                        <hr className='separador' />
                    </li>
                ))
                : <p style={{textAlign: "center"}}>No Production Orders launched</p>
            }
    </div>

        </>
    )
}