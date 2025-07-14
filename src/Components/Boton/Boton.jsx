import './Boton.css'

// Definimos y exportamos el componente funcional 'boton'
// Recibe varios props desde el componente padre:
// - Datos: objeto que contiene información general de la orden
// - LanzarOF: función que se ejecuta cuando se lanza la orden
// - Receta: receta seleccionada
// - Version: versión seleccionada
// - Destino: reactor de destino
// - ordenesLanzadas: array con las órdenes ya lanzadas (para validar duplicados)
export default function boton({Datos, LanzarOF, Receta, Version, Destino, ordenesLanzadas}){

    // Función que se ejecuta al hacer clic en el botón
    const handleClick = () => {
        // Modificamos los campos dentro del objeto Datos.GMDix antes de enviarlo
        Datos.GMDix.nombreReceta = Receta;     // Establece la receta seleccionada
        Datos.GMDix.version = Version;         // Establece la versión seleccionada
        Datos.GMDix.nombreReactor = Destino;   // Establece el reactor de destino
        Datos.GMDix.estado = "Lanzada";        // Estado fijo: lanzada

        // Llamamos a la función LanzarOF, pasando los datos completos
        LanzarOF(Datos);
    };

    // Verificamos si el array de órdenes ya lanzadas está definido y no está vacío
    const hasDatos = Array.isArray(ordenesLanzadas) && ordenesLanzadas.length > 0;

    // Por defecto, asumimos que NO hay una orden lanzada en el mismo reactor
    let ordenYaLanzada = false;

    // Si hay datos, verificamos si ya existe una orden lanzada para el mismo reactor
    if (hasDatos) {
        ordenYaLanzada = ordenesLanzadas.some(of =>
            of.nombreReactor === Destino && of.estado === "Lanzada"
        );
    }

    // Definimos si el botón debe estar deshabilitado
    // El botón se desactiva si:
    // - No se ha seleccionado una receta válida
    // - No se ha ingresado una versión
    // - No se ha seleccionado un destino válido
    // - Ya existe una orden lanzada para ese reactor
    const isDisable = Receta === "--" || Version === "" || Destino === "--" || ordenYaLanzada;

    // Devolvemos el botón, el cual se desactiva según la lógica anterior
    // handleClick se llama al hacer clic
    return(
        <button onClick={handleClick} disabled={isDisable}>
            Lanzar
        </button>
    );
}