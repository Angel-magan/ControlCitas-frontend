import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ExpedienteMedico = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detalle, setDetalle] = useState(null);

  // Buscar paciente por nombre o documento
  const buscarExpediente = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      Swal.fire("Ingrese un nombre o documento", "", "warning");
      return;
    }
    setLoading(true);
    try {
      // Buscar pacientes
      const pacientes = await axios.get("http://localhost:5000/api/admin/buscar-pacientes", {
        params: { q: busqueda },
      });
      if (!pacientes.data.length) {
        setResultados([]);
        setLoading(false);
        Swal.fire("No se encontraron pacientes", "", "info");
        return;
      }
      // Tomar el primer paciente encontrado (puedes mostrar lista si quieres)
      const paciente = pacientes.data[0];
      // Obtener expediente
      const expediente = await axios.get("http://localhost:5000/api/medico/expediente", {
        params: { id_paciente: paciente.id_paciente },
      });
      setResultados(
        expediente.data.map((cita) => ({
          ...cita,
          paciente: `${paciente.nombres} ${paciente.apellidos}`,
        }))
      );
    } catch {
      setResultados([]);
      Swal.fire("Error al buscar expediente", "", "error");
    }
    setLoading(false);
  };

  const verDetalle = (cita) => setDetalle(cita);
  const cerrarDetalle = () => setDetalle(null);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3" style={{ color: "#2e5da1" }}>
        Expediente de Pacientes
      </h2>
      <form className="row g-2 mb-4 align-items-end" onSubmit={buscarExpediente}>
        <div className="col-md-6">
          <label className="form-label">Buscar paciente</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre, apellido o documento"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary fw-bold" style={{ background: "#2e5da1" }}>
            Buscar
          </button>
        </div>
      </form>
      {loading ? (
        <div className="text-center text-secondary py-4">Cargando...</div>
      ) : resultados.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay citas pasadas para mostrar.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: "#e3eafc" }}>
              <tr>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Informe</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((cita, i) => (
                <tr key={i}>
                  <td>{cita.paciente}</td>
                  <td>{cita.fecha_cita}</td>
                  <td>{cita.hora_cita}</td>
                  <td>
                    <span
                      className={
                        cita.estado === 1
                          ? "badge bg-success"
                          : cita.estado === 2 || cita.estado === 3
                          ? "badge bg-secondary"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {cita.estado === 1
                        ? "Finalizada"
                        : cita.estado === 2
                        ? "Cancelada por paciente"
                        : cita.estado === 3
                        ? "Cancelada por médico"
                        : "Pendiente"}
                    </span>
                  </td>
                  <td>
                    {cita.informe ? (
                      <span className="text-success">Disponible</span>
                    ) : (
                      <span className="text-secondary">Sin informe</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => verDetalle(cita)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Detalle */}
      {detalle && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ minWidth: 340, maxWidth: 400, position: "relative" }}
          >
            <button
              className="btn-close position-absolute"
              style={{ top: 10, right: 10 }}
              onClick={cerrarDetalle}
            ></button>
            <h5 className="fw-bold mb-2" style={{ color: "#2e5da1" }}>
              Detalle de la Cita
            </h5>
            <div>
              <b>Paciente:</b> {detalle.paciente}
              <br />
              <b>Fecha:</b> {detalle.fecha_cita}
              <br />
              <b>Hora:</b> {detalle.hora_cita}
              <br />
              <b>Estado:</b>{" "}
              {detalle.estado === 1
                ? "Finalizada"
                : detalle.estado === 2
                ? "Cancelada por paciente"
                : detalle.estado === 3
                ? "Cancelada por médico"
                : "Pendiente"}
              <br />
              <b>Informe:</b>
              <div className="border rounded p-2 mt-1 mb-2" style={{ minHeight: 40 }}>
                {detalle.informe ? (
                  <span>{detalle.informe}</span>
                ) : (
                  <span className="text-secondary">Sin informe disponible</span>
                )}
              </div>
              {detalle.informe && (
                <div>
                  <b>Fecha informe:</b> {detalle.fecha_registro?.slice(0, 19).replace("T", " ")}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpedienteMedico;