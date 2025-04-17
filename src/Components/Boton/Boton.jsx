import './Boton.css'

export default function boton({Datos, LanzarOF, Receta, Version, Destino, ordenesLanzadas}){
    
    const handleClick = () => {
        Datos.GMDix.nombreReceta = Receta
        Datos.GMDix.version = Version
        Datos.GMDix.nombreReactor = Destino
        Datos.GMDix.estado ="Lanzada";
        LanzarOF(Datos);
    };

    // Verificamos si hay datos disponibles
    const hasDatos = Array.isArray(ordenesLanzadas) && ordenesLanzadas.length > 0;

    // Por defecto asumimos que no hay orden lanzada
    let ordenYaLanzada = false;

    // Condición para deshabilitar el botón
    if (hasDatos) {
        ordenYaLanzada = ordenesLanzadas.some(of =>
            of.nombreReactor === Destino && of.estado === "Lanzada"
        );
    }
    
    const isDisable = Receta === "--" || Version === "" || Destino === "--" || ordenYaLanzada;

    return(
        <button onClick={handleClick} disabled={isDisable}>Lanzar</button>
    )
}