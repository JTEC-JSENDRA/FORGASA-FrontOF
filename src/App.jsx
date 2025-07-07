import './App.css';
import { useState, useEffect, useMemo } from 'react';

import OFLiberadas from './Components/container-OF/container-OF_Liberadas.jsx';
import OFLanzadas from './Components/container-OF/container-OF_Lanzadas.jsx';
import OFMat from './Components/container-OF/container-OF_LanzadasMateriales.jsx';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function App() {
  // Estado para OF lanzadas y liberadas
  const [OF_Lanzadas, setOF_Lanzadas] = useState({});
  const [OF_Liberadas, setOF_Liberadas] = useState({});

  // Estado de control para recargas y acciones
  const [Lanzar, setLanzar] = useState(false);
  const [Refrescar, setRefrescar] = useState(false);
  const [Reload_SAP, setReload_SAP] = useState(false);

  // Estado del modal y búsqueda por OF
  const [showModal, setShowModal] = useState(false);
  const [inputOF, setInputOF] = useState("");

  // Estado para mostrar datos de una OF específica
  const [loadingOF, setLoadingOF] = useState(false);
  const [errorOF, setErrorOF] = useState(null);
  const [datosOF, setDatosOF] = useState(null);

  // Estados de materiales teóricos y reales
  const [OF_Mat, setOF_Mat] = useState({});
  const [OF_MatReales, setOF_MatReales] = useState({});

  const [OF_Finalizadas, setOF_Finalizadas] = useState([]);

  // Buscar una OF específica e iniciar modal
  const handleAbrirVentana = async () => {
    //console.log("OF ingresada:", inputOF);
    await buscarDatosOF();  // Llama a la API
    setShowModal(true);     // Muestra el modal
  };

  // Fetch de datos individuales de OF (detalle)
  const buscarDatosOF = async () => {
    if (!inputOF) return;

    setLoadingOF(true);
    setErrorOF(null);

    try {
      const response = await fetch(`http://localhost:7248/api/Lanzadas/OF/${inputOF}`);
      if (!response.ok) throw new Error("Error en la búsqueda de la OF");

      const data = await response.json();
      //console.log("Datos recibidos de la API:", data);
      setDatosOF(data);
    } catch (error) {
      //console.error("Error al buscar la OF:", error);
      setErrorOF(error.message);
      setDatosOF(null);
    } finally {
      setLoadingOF(false);
    }
  };

  // Fetch OF liberadas
  const fetchLiberadas = () => {
    fetch("http://localhost:7248/api/Liberadas/FO01")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        const OrdenesFabricacion = data;
        setOF_Liberadas(
          OrdenesFabricacion["soap-env:Envelope"]["soap-env:Body"]["n0:ZMES_GET_OFSResponse"].ET_OFS.item
        );
      })
      .catch(err => console.error("❌ Error en fetch de OF Liberadas:", err));
  };

  // Llamada para refrescar desde SAP
  const fetchLiberadas_SAP = () => {
    fetch("http://localhost:7248/api/Liberadas/SAP/FO01")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
      })
      .catch(err => console.error("❌ Error en fetch de SAP:", err));
  };

  // Recarga manual de OF liberadas
  const reloadInfo = () => {
    console.log('🔁 Recargando información...');
    fetchLiberadas();
  };

  // Recarga desde SAP
  const reloadSAP = () => {
    console.log('🔄 Recargando desde SAP...');
    fetchLiberadas_SAP();
  };


  // Combinación de materiales teóricos y reales (por orden de fabricación)
  const combinedMat = useMemo(() => {
    if (!OF_Mat.length || !OF_MatReales.length) return [];

    const realesDict = {};
    OF_MatReales.forEach(item => {
      realesDict[item.ordenFabricacion] = item;
    });

    const combinado = OF_Mat.map(teorico => {
      const orden = teorico.ordenFabricacion;
      const real = realesDict[orden] || {};

      const nuevoObj = { ordenFabricacion: orden };
      Object.keys(teorico).forEach(key => {
        if (key !== "ordenFabricacion") {
          nuevoObj[key] = teorico[key];
          nuevoObj[key + "Real"] = real[key] ?? "0";
        }
      });
      return nuevoObj;
    });

    //console.log("combinedMat:", combinado);
    return combinado;
  }, [OF_Mat, OF_MatReales]);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    const interval = setTimeout(() => {
      setRefrescar(!Refrescar);
    }, 30000);
    return () => clearTimeout(interval);
  }, [Refrescar]);

  // Lanzar OF (POST a backend)
  const LanzarOF = async (Datos) => {
    try {
      const response = await fetch("http://localhost:7248/api/Liberadas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Datos),
      });

      if (!response.ok) throw new Error("Error en la petición POST");
      setLanzar(!Lanzar);
    } catch (error) {
      console.error("Error al lanzar OF:", error);
    }
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return 'N/A';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Cargar datos iniciales
  useEffect(() => { fetchLiberadas(); }, []);

  useEffect(() => {
    fetch("http://localhost:7248/api/Lanzadas")
      .then(res => res.json())
      .then(data => {
        //console.log("Datos recibidos - OF Lanzadas:", data);
        setOF_Lanzadas(data);
      })
      .catch(err => console.error("Error al cargar OF Lanzadas:", err));
  }, [Lanzar, Refrescar]);

  useEffect(() => {
    fetch("http://localhost:7248/api/Lanzadas/MateriasPorOrden")
      .then(res => res.json())
      .then(data => setOF_Mat(data))
      .catch(err => console.error("Error al obtener materiales teóricos:", err));
  }, [Lanzar, Refrescar]);

  useEffect(() => {
    fetch("http://localhost:7248/api/Lanzadas/MateriasPorOrdenReales")
      .then(res => res.json())
      .then(data => setOF_MatReales(data))
      .catch(err => console.error("Error al obtener materiales reales:", err));
  }, [Lanzar, Refrescar]);

  useEffect(() => {
    fetch("http://localhost:7248/api/Lanzadas/OF_Finalizadas")
      .then(res => res.json())
      .then(data => {
        console.log("OF_Finalizadas desde backend:", data);
        setOF_Finalizadas(data);
      })
      .catch(err => console.error("Error al obtener OF Finalizadas", err));
  }, [Lanzar, Refrescar]);

  return (
    <div className='container'>
      {/* Header con input de búsqueda de OF */}
      <header className='header'>

        {/* Texto centrado */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '1.5rem',
          pointerEvents: 'none',
          color: 'black',
          whiteSpace: 'nowrap'
        }}>
          Gestión de Órdenes de Fabricación
        </div>

        <div className="of-search-box">   

          <input
            list="listaOFs"
            value={inputOF}
            onChange={(e) => setInputOF(e.target.value)}
            placeholder="Seleccionar o escribir OF"
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "200px"
            }}
          />

          <datalist id="listaOFs">
            {OF_Finalizadas.map((of, index) => (
              <option key={index} value={of.OrdenFabricacion || of} />
            ))}
          </datalist>

          <button
            style={{
              backgroundColor: "gold",
              fontWeight: "bold",
              borderRadius: "6px",
              padding: "8px",
            }}
            disabled={!inputOF.trim()}
            onClick={handleAbrirVentana}
          >
            🔍 Buscar OF
          </button>
            
          <button onClick={reloadSAP} className='reload-button-SAP'>
            🔄 Recargar SAP
          </button>

        </div>


      </header>

      {/* Contenido principal */}
      <main className='main'>
        <section className='sub-main'>
          <section className='sub-container'>
            <OFLiberadas OF_Liberadas={OF_Liberadas} OF_Lanzadas={OF_Lanzadas} LanzarOF={LanzarOF} />
          </section>
        </section>

        <section className='sub-main'>
          <section className='sub-container'>
            <OFLanzadas OF_Lanzadas={OF_Lanzadas} />
          </section>
        </section>

        <section className='sub-main'>
          <section className='sub-container'>
            <OFMat OF_Mat={combinedMat} />
          </section>
        </section>
      </main>

      {/* Modal para visualización de datos de una OF específica */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {loadingOF ? (
              <p>Cargando datos...</p>
            ) : errorOF ? (
              <p>Error: {errorOF}</p>
            ) : datosOF ? (
              <>
                <>
                  <h2 style={{ 
                    fontWeight: '700', 
                    color: '#222', 
                    marginBottom: '12px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.15)'
                  }}>
                    Orden Fabricación: {datosOF.OrdenFabricacion || 'N/A'}
                  </h2>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#222', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    letterSpacing: '0.5px'
                  }}>
                    Fecha Inserción: <span style={{ fontWeight: '600', color: '#222' }}>
                      {formatearFecha(datosOF.FechaInsercion)}
                    </span>
                  </p>
                </>

                {/* Gráfico de barras comparativo CT vs CR */}
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={Object.values(
                      Object.entries(datosOF)
                        .filter(([key]) => key !== 'OrdenFabricacion' && key !== 'FechaInsercion')
                        .reduce((acc, [key, value]) => {
                          const match = key.match(/^(.*)_(CT|CR)$/);
                          if (match) {
                            const [_, base, type] = match;
                            if (!acc[base]) acc[base] = { name: base };
                            acc[base][type] = Number(value);
                          }
                          return acc;
                        }, {})
                    )}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`${value}`, name === "CR" ? "Real (CR)" : "Teórico (CT)"]}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Bar dataKey="CR" fill="#ff6f61" name="Real (CR)" label={{ position: 'top', fill: '#000' }} />
                    <Bar dataKey="CT" fill="#4f81bd" name="Teórico (CT)"label={{ position: 'top', fill: '#000' }} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            ) : (
              <p>⚠️ No hay datos disponibles.</p>
            )}
            <button onClick={() => setShowModal(false)} className="close-button">
              ❌ Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
