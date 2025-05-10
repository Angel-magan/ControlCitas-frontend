import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "../Register/styleRegister.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    axios
      .post("http://localhost:5000/api/usuarios/iniciarSesion", {
        correo: email,
        contrasena: password,
      })
      .then((response) => {
        Swal.fire({
          title: "Bienvenido",
          text: "Inicio de sesión exitoso",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        // Aquí puedes guardar el usuario en localStorage o usar contexto
        console.log(response.data.user);

        // Redirige a otra ruta, por ejemplo al dashboard
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Error al iniciar sesión",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="fondo">
      <section className="w-50">
        <h2 className="text-center text-light mb-3">Iniciar sesión</h2>
        <div className="text-light border-b-3" style={{ textAlign: "center" }}>
          <input
            className="form-control mb-3"
            style={{ height: "43px" }}
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-group mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill fs-5 text-primary"></i>
              ) : (
                <i className="bi bi-eye-fill fs-5 text-primary"></i>
              )}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary fw-bold px-4 mb-2"
            onClick={handleLogin}
          >
            Acceder
          </button>
        </div>
      </section>
      <section
        className="border-start border-dark border-5 p-5"
        style={{ textAlign: "center" }}
      >
        <h2 className="text-dark">¿No tienes cuenta?</h2>
        <Link to="/registerUser">
          <button className="btn btn-primary fw-bold px-4 mt-4">
            Registrarse
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Login;
