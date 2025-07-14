import React, { useState } from "react";
import './container-OF.css';

// Componente principal que recibe la lista de órdenes OF con materiales asociados
export default function ContainerOFMat({ OF_Mat }) {
  // Anchura de cada columna principal (material)
  const colGroupWidth = "11.11%";

  // Anchura de las subcolumnas (teórica y real)
  const subColWidth = "50%";

  // Verificamos si el array de datos es válido y tiene al menos un elemento
  const hasDatos = Array.isArray(OF_Mat) && OF_Mat.length > 0;

  // Estado para definir el umbral de alerta (% de tolerancia sobre el valor teórico)
  const [alertPercent, setAlertPercent] = useState(10); // Valor por defecto: 10%

  // Convertimos el umbral de alerta a decimal (por ejemplo, 10% -> 0.1)
  const ALERT_THRESHOLD = alertPercent / 100;

  // Lista de materiales que queremos mostrar en la tabla
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
      {/* TÍTULO DE LA SECCIÓN Y CAMPO PARA CAMBIAR EL UMBRAL DE ALERTA */}
      <div>
        {/* Título principal */}
        <p className="Titulo-tabla" style={{ textAlign: "center" }}>
          MATERIALES ASOCIADOS A LA OF
        </p>

        {/* Línea divisora */}
        <hr className="separador" />

        {/* Campo de entrada para modificar el umbral de alerta */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <label htmlFor="alert-threshold" style={{ marginRight: "0.5rem" }}>
            Umbral de alerta (% sobre teórico):
          </label>
          <input
            id="alert-threshold"
            type="number"
            min={0}
            max={100}
            step={1}
            value={alertPercent}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= 100) {
                setAlertPercent(value);
              }
            }}
            style={{ width: "60px", textAlign: "center" }}
          />
        </div>
      </div>

      {/* CABECERA DE LA TABLA */}
      <div className="cabecera-tabla">
        {/* Columna: Orden de Fabricación */}
        <div style={{ width: '10%' }}>
          <p className="elemento-cabecera">Orden Fabricación</p>
        </div>

        {/* Por cada material, mostramos su nombre y subcabeceras */}
        {materiales.map((mat, i) => (
          <div key={i} className="columna-material">
            {/* Nombre del material */}
            <p className="elemento-cabecera">{mat.label}</p>

            {/* Subcabeceras: Teórica y Real */}
            <div style={{ display: "flex", width: "100%" }}>
              <p className="elemento-cabecera subcolumna">Teórica</p>
              <p className="elemento-cabecera subcolumna">Real</p>
            </div>
          </div>
        ))}
      </div>

      {/* Separador visual entre cabecera y cuerpo */}
      <hr className="separador" />

      {/* CUERPO DE LA TABLA */}
      <ul className="tabla-of">
        {/* Si hay datos cargados, los mostramos */}
        {hasDatos ? (
          OF_Mat.map((mat) => (
            <li key={mat.ordenFabricacion} className="elemento-OF">
              {/* Celda: Orden de Fabricación */}
              <div style={{ width: '10%' }}>
                <p className="elemento-elemento-OF">{mat.ordenFabricacion}</p>
              </div>

              {/* Por cada material, mostramos su valor teórico y real */}
              {materiales.map((material, i) => {
                const key = material.key;
                const realKey = key + "Real";

                // Obtenemos valores, convirtiendo strings con coma a número
                const teorico = Number(String(mat[key]).replace(",", ".")) || 0;
                const real = Number(String(mat[realKey]).replace(",", ".")) || 0;

                // Verificamos si el valor real supera el umbral de alerta
                const isAlert = real > teorico * (1 + ALERT_THRESHOLD);

                return (
                  <div key={i} className="columna-material">
                    <div style={{ display: "flex", width: "100%" }}>
                      {/* Valor teórico */}
                      <p className="elemento-elemento-OF subcolumna">
                        {mat[key] ?? "-"}
                      </p>

                      {/* Valor real con posible alerta visual */}
                      <p
                        className={`elemento-elemento-OF subcolumna ${isAlert ? "alert-real" : ""}`}
                        title={isAlert ? `Real supera teórico en más de ${ALERT_THRESHOLD * 100}%` : ""}
                      >
                        {mat[realKey] ?? "-"}
                        {/* Si hay alerta, mostramos un icono de exclamación */}
                        {isAlert && (
                          <span className="alert-icon" title="¡Atención! Valor real alto.">!</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </li>
          ))
        ) : (
          // Si no hay datos, mensaje informativo
          <p style={{ textAlign: "center" }}>No hay materiales cargados.</p>
        )}
      </ul>
    </>
  );
}
