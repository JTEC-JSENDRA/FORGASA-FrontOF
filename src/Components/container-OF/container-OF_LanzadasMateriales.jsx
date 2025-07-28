import React, { useState, useEffect } from "react";
import './container-OF.css';

export default function ContainerOFMat({ OF_Mat }) {
  const [umbrales, setUmbrales] = useState({
    lc70: 2.5,
    lc80: 2.5,
    hl26: 2.5,
    agua: 2.5,
    aguaRecuperada: 2.5,
    antiespumante: 2.5,
    ligno: 2.5,
    potasa: 2.5,
  });

  const LanzarUmbrales = async (umbralesData) => {
    try {
      const response = await fetch("https://192.168.8.2:446/api/Worker/Umbrales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(umbralesData),
      });

      if (!response.ok) throw new Error("Error en la petición POST");
    } catch (error) {
      console.error("Error al Enviar Umbrales:", error);
    }
  };

  useEffect(() => {
    LanzarUmbrales(umbrales);
    console.log("Umbrales actualizados:", umbrales);
  }, [umbrales]);

  const ALERT_THRESHOLD = {
    lc70: umbrales.lc70 / 100,
    lc80: umbrales.lc80 / 100,
    hl26: umbrales.hl26 / 100,
    agua: umbrales.agua / 100,
    aguaRecuperada: umbrales.aguaRecuperada / 100,
    antiespumante: umbrales.antiespumante / 100,
    ligno: umbrales.ligno / 100,
    potasa: umbrales.potasa / 100,
  };

  const materiales = [
    { key: "lc70", label: "LC70 (kg)" },
    { key: "lc80", label: "LC80 (kg)" },
    { key: "hl26", label: "AZUCAR (kg)" },
    { key: "agua", label: "AGUA (L)" },
    { key: "aguaRecuperada", label: "AGUA RECUPERADA (L)" },
    { key: "antiespumante", label: "ANTIESPUMANTE (Kg)" },
    { key: "ligno", label: "LIGNO (Kg)" },
    { key: "potasa", label: "POTASA (kg)" },
  ];

  const hasDatos = Array.isArray(OF_Mat) && OF_Mat.length > 0;

  return (
    <>
      <div>
        <p className="Titulo-tabla" style={{ textAlign: "center" }}>
          MATERIAS PRIMAS ASOCIADAS A LA OF
        </p>

        <hr className="separador" />

        <div className="cabecera-tabla-umbral" style={{ alignItems: "flex-end" }}>
          <div style={{ width: '10%' }}></div>
          {materiales.map((mat, i) => (
            <div
              key={i}
              className="columna-material"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{
                fontWeight: "bold",
                fontSize: "0.7rem",
                marginBottom: "0.25rem",
              }}>
                Umbral Error %
              </p>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={umbrales[mat.key]}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                    setUmbrales((prev) => ({
                      ...prev,
                      [mat.key]: newValue,
                    }));
                  }
                }}
                title={`Umbral para ${mat.label}`}
                style={{
                  width: "60px",
                  textAlign: "center",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="cabecera-tabla">
        <div style={{ width: '10%' }}>
          <p className="elemento-cabecera">Orden Fabricación</p>
        </div>
        {materiales.map((mat, i) => (
          <div key={i} className="columna-material">
            <p className="elemento-cabecera">{mat.label}</p>
            <div style={{ display: "flex", width: "100%" }}>
              <p className="elemento-cabecera subcolumna">Teórica</p>
              <p className="elemento-cabecera subcolumna">Real</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="separador" />

      <ul className="tabla-of">
        {hasDatos ? (
          OF_Mat.map((mat) => (
            <li key={mat.ordenFabricacion} className="elemento-OF">
              <div style={{ width: '10%' }}>
                <p className="elemento-elemento-OF">{mat.ordenFabricacion}</p>
              </div>
              {materiales.map((material, i) => {
                const key = material.key;
                const realKey = key + "Real";

                let teorico = Number(String(mat[key]).replace(",", ".")) || 0;
                if (key === "potasa") {
                  teorico *= 1.5;
                }
                const real = Number(String(mat[realKey]).replace(",", ".")) || 0;

                const threshold = ALERT_THRESHOLD[key] || 0;
                const isAlert = real > teorico * (1 + threshold);

                return (
                  <div key={i} className="columna-material">
                    <div style={{ display: "flex", width: "100%" }}>
                      <p className="elemento-elemento-OF subcolumna">
                        {!isNaN(teorico) ? teorico.toFixed(2) : "-"}
                      </p>
                      <p
                        className={`elemento-elemento-OF subcolumna ${isAlert ? "alert-real" : ""}`}
                        title={isAlert ? `Real supera teórico en más de ${(threshold * 100).toFixed(2)}%` : ""}
                      >
                        {!isNaN(real) ? real.toFixed(2) : "-"}
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
          <p style={{ textAlign: "center" }}>No hay materiales cargados.</p>
        )}
      </ul>
    </>
  );
}
