import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpedientePaciente = () => {
  const [expediente, setExpediente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    setLoading(true);
    axios
      .get("http://localhost:5000/api/pacientes/expediente", {
        params: { id_paciente: user.id_paciente },
      })
      .then((res) => {
        setExpediente(res.data);
        setMensaje(res.data.length === 0 ? "No hay citas pasadas." : "");
      })
      .catch(() => setMensaje("Error al cargar el expediente"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4" style={{ color: "#2e5da1" }}>
        Mi Expediente
      </h2>
      {loading ? (
        <div className="text-center py-5">Cargando...</div>
      ) : mensaje ? (
        <div className="alert alert-info">{mensaje}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Motivo</th>
                <th>Informe</th>
              </tr>
            </thead>
            <tbody>
              {expediente.map((cita) => (
                <tr key={cita.id_cita}>
                  <td>{cita.fecha_cita}</td>
                  <td>{cita.hora_cita.slice(0, 5)}</td>
                  <td>
                    {cita.medico_nombre} {cita.medico_apellido}
                  </td>
                  <td>{cita.especialidad}</td>
                  <td>{cita.motivo}</td>
                  <td>
                    {cita.informe ? (
                      <span>{cita.informe}</span>
                    ) : (
                      <span className="text-muted">Sin informe disponible</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpedientePaciente;