import { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
//import { useUser } from "../../UserContext";
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userRegister, setUserRegister] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const response = await res.json();
    if (res.ok) {
      setUserRegister(true);
    } else {
      setErrorMessage("Ocurrió un error durante el registro.");
    }
  };

  if (userRegister) {
    return (
      
      <h2>
        <img src="icons8-insta.svg" alt="ClonInsta" />
        Bienvenido a ClonInsta {registeredUsername}. Por favor revisa tu correo para que puedas validar tu usuario.
      </h2>
    );
  }

  return (
    <div className="container">
    <div className="form-wrapper">
      <form onSubmit={handleForm} className="form">
        <input
          name="username"
          placeholder="Usuario..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="email"
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="password"
          placeholder="Repetir contraseña..."
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {password !== password2 && (
          <p className="error">Las contraseñas no coinciden.</p>
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
  
        <button>
          <FormattedMessage id="register.singUp" />
        </button>
        <p>
          <FormattedMessage id="register.account" />{" "}
          <Link to="/login">
            <FormattedMessage id="register.singIn" />
          </Link>
        </p>
      </form>
    </div>
  </div>
  

  );
};

export default Register;
