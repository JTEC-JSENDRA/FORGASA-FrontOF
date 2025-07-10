import React, {useState} from "react";
import './container-OF.css';

export default function ContainerOFMat({ OF_Mat }) {
  const colGroupWidth = "11.11%";
  const subColWidth = "50%";
  const hasDatos = Array.isArray(OF_Mat) && OF_Mat.length > 0;

    // Estado para el umbral de alerta (en porcentaje, ej: 10)
    const [alertPercent, setAlertPercent] = useState(10); // valor inicial 10%

  const ALERT_THRESHOLD = alertPercent / 100;; // VALOR EN EL QUE SALTA EL AVISO DE

  const materiales = [
    { key: "lc70", label: "LC70 (kg)" },
    { key: "lc80", label: "LC80 (kg)" },
    { key: "hl26", label: "HL26 (kg)" },
    { key: "agua", label: "AGUA (L)" },
    { key: "aguaRecuperada", label: "AGUA RECUPERADA (L)" },
    { key: "antiespumante", label: "ANTIESPUMANTE (L)" },
    { key: "ligno", label: "LIGNO (L)" },
    { key: "potasa", label: "POTASA (L)" },
  ];

  return (
    <>
      <div>
        <p className='elemento-cabecera' style={{ textAlign: "center" }}>
          MATERIALES ASOCIADOS A LA OF
        </p>
        <hr className='separador' />

        {/* Casilla para ingresar el porcentaje de alerta */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <label htmlFor="alert-threshold" style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
            Umbral de alerta (% sobre teórico):
          </label>

          <input
            id="alert-threshold"
            type="number"
            min={0}
            max={100}
            step={1}
            value={alertPercent}
            onChange={(e) => setAlertPercent(Number(e.target.value))}
            style={{ width: "60px", textAlign: "center" }}
          />
        </div>

      </div>

      {/* CABECERA */}
      <div
        className='cabecera-tabla'
        style={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <div style={{ width: colGroupWidth }}>
          <p className='elemento-cabecera'>OrdenFabricación</p>
        </div>
        {materiales.map((mat, i) => (
          <div key={i} style={{ width: colGroupWidth}}>
            <p className='elemento-cabecera'>{mat.label}</p>
            <div style={{ display: 'flex' }}>
              <p
                className='elemento-cabecera'
                style={{ width: subColWidth, fontSize: "0.75rem" }}
              >
                Teórica
              </p>
              <p
                className='elemento-cabecera'
                style={{ width: subColWidth, fontSize: "0.75rem" }}
              >
                Real
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr className='separador' />

      {/* DATOS */}
      <ul className='tabla-of' style={{ padding: 0, margin: 0 }}>
        {hasDatos ? (
          OF_Mat.map((mat) => (
            <li
              key={mat.ordenFabricacion}
              className='elemento-OF'
              style={{ display: "flex", alignItems: "center", textAlign: "center" }}
            >
              <div style={{ width: colGroupWidth }}>
                <p className='elemento-elemento-OF'>{mat.ordenFabricacion}</p>
              </div>
              {materiales.map((material, i) => {
                const key = material.key;
                const realKey = key + "Real";

                //const teorico = Number(mat[key]) || 0;
                //const real = Number(mat[realKey]) || 0;
                const teorico = Number(String(mat[key]).replace(',', '.')) || 0;
                const real = Number(String(mat[realKey]).replace(',', '.')) || 0;
                
                const isAlert = real > teorico * (1 + ALERT_THRESHOLD);

                return (
                  <div
                    key={i}
                    style={{ width: colGroupWidth }}
                  >
                    <div style={{ display: 'flex',flexDirection:'row', justifyContent: "center", alignItems: "center", gap: "6px" }}>
                      <p
                        className='elemento-elemento-OF'
                        style={{ width: subColWidth,textAlign:'center',margin:0 }}
                      >
                        {mat[key] ?? "-"}
                      </p>
                      <p
                        className={`elemento-elemento-OF ${isAlert ? 'alert-real' : ''}`}
                        style={{
                          width: subColWidth,
                          textAlign: 'center',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                        title={isAlert ? `Real supera teórico en más de ${ALERT_THRESHOLD * 100}%` : ""}
                      >
                        {mat[realKey] ?? "-"}
                        {isAlert && <span className="alert-icon" title="¡Atención! Valor real alto.">!</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay materiales cargados.</p>
        )}
      </ul>
    </>
  );
}
