import { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
//import { useUser } from "../../UserContext";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userRegister, setUserRegister] = useState("");
  const intl = useIntl();
  const [theme, setTheme] = useState("light"); 

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
      <div className="container">
        <h2 style={{ textAlign: "center" }}>
          <img
            src="icons8-insta.svg"
            alt="ClonInsta"
            style={{
              display: "block",
              margin: "0 auto",
              width: "150px",
              filter: theme === 'dark' ? 'invert(1)' : 'invert(0)', 
            }}
          />
          Bienvenido a ClonInsta {username}. Por favor revisa tu correo para que
          puedas validar tu usuario.
          <div className="icon" style={{ fontSize: "36px" }}>🎉🎉🎉</div>
        </h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleForm} className="form">
          <input
            name="username"
            placeholder={intl.formatMessage({
              id: "register.usernamePlaceholder",
            })}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="email"
            placeholder={intl.formatMessage({
              id: "register.emailPlaceholder",
            })}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={intl.formatMessage({
              id: "register.passwordPlaceholder",
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="password"
            placeholder={intl.formatMessage({
              id: "register.confirmPasswordPlaceholder",
            })}
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


