import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./styleRegister.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  //Para ingresar el usuario
  const handleRegister = () => {
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (name && lastName && email && password && role) {
      // Verificar si el correo tiene un formato válido
      if (!emailRegex.test(email)) {
        Swal.fire({
          title: "Error",
          text: "Por favor, ingresa un correo electrónico válido.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        return; // Detener el registro si el correo no es válido
      }
      // Hacer la solicitud al backend para registrar el usuario
      axios
        .post("http://localhost:5000/api/users/registrarUsuario", {
          nombre: name,
          apellido: lastName,
          correo: email,
          clave: password,
          rol: role,
        })
        .then(() => {
          Swal.fire({
            title: "Registro",
            text: "Usuario ingresado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });

          navigate("/"); //Aquí lo manda al login
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            if (error.response.data.message.includes("La contraseña")) {
              Swal.fire({
                title: "Contraseña",
                text: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "El correo ya está registrado. Usa otro email.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          } else {
            console.error("Error registrando usuario:", error);
            Swal.fire({
              title: "Registro",
              text: "Hubo un problema al registrar el usuario.",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="fondo">
      <div className="w-50">
        <h2 className="text-white text-center">Regitro de usuario</h2>
        <RegisterForm
          text="Nombre:"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <RegisterForm
          text="Apellido:"
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div style={{ marginLeft: "15px" }}>
          <RegisterForm
            text="Correo:"
            type="text"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className="d-flex justify-content-start align-items-center mb-3"
          style={{ marginLeft: "40px" }}
        >
          <p className="text-white fw-bold mb-0 me-3">Rol:</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected>Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <RegisterForm
            text="Clave:"
            type="text"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <section className="d-flex justify-content-center mt-4">
          <button
            type="button"
            className="btn btn-primary fw-bold px-4 me-3"
            disabled={!name || !lastName || !email || !password || !role}
            onClick={handleRegister}
          >
            Registrarme
          </button>
          <Link to="/">
            <button className="btn btn-primary fw-bold px-4">Regresar</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RegisterUser;
