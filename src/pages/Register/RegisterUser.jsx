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
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hoverDisabled, setHoverDisabled] = useState(false);
  const navigate = useNavigate();

  //Para ingresar el usuario
  const handleRegister = () => {
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (
      name &&
      lastName &&
      address &&
      phone &&
      email &&
      password &&
      gender &&
      role
    ) {
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
        .post("http://localhost:5000/api/usuarios/registrarUsuario", {
          nombres: name,
          apellidos: lastName,
          direccion: address,
          telefono: phone,
          correo: email,
          contrasena: password,
          sexo: gender,
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
          text="Nombres:"
          type="text"
          placeholder="Nombres"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <RegisterForm
          text="Apellidos:"
          type="text"
          placeholder="Apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <RegisterForm
          text="Dirección:"
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <RegisterForm
          text="Teléfono:"
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          style={{ marginLeft: "15px" }}
        >
          <p className="text-white fw-bold mb-0 me-3">Genero:</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setGender(e.target.value)}
          >
            <option selected>Genero</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div
          className="d-flex justify-content-start align-items-center mb-3"
          style={{ marginLeft: "45px" }}
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
        <div className="d-flex">
          <div className="flex-grow-1 me-2">
            <RegisterForm
              text="Contraseña:"
              type={showPassword ? "text" : "password"}
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash-fill fs-4 text-white"></i>
            ) : (
              <i className="bi bi-eye-fill fs-4 text-white"></i>
            )}
          </span>
        </div>
        <section className="d-flex justify-content-center mt-3">
          <div
            className="position-relative d-inline-block"
            onMouseEnter={() => setHoverDisabled(true)}
            onMouseLeave={() => setHoverDisabled(false)}
          >
            <button
              type="button"
              className="btn btn-primary fw-bold px-4 me-3"
              disabled={
                !name ||
                !lastName ||
                !address ||
                !phone ||
                !email ||
                !password ||
                !gender ||
                !role
              }
              onClick={handleRegister}
            >
              Registrarme
            </button>
            {(!name || !lastName || !email || !password) && hoverDisabled && (
              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{ pointerEvents: "none" }}
              >
                <i className="bi bi-ban text-danger fw-bold fs-4"></i>
              </div>
            )}
          </div>
          <Link to="/">
            <button className="btn btn-primary fw-bold px-4">Regresar</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RegisterUser;
