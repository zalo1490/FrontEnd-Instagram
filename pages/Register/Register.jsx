import { useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../UserContext"

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useUser()
  const [error, setError] = useState()

  const handleForm = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
      })

    const response = await res.json()
    if (res.ok) {
      setUser(response)
    } else {
      setError(response)
    }
  }

  if (user?.username) {
    return (
      <h2>Bienvenido, {user.username}</h2>
    )
  }

  return (
    <form onSubmit={handleForm}>
      <input
        name="username"
        placeholder="Usuario..."
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
       <input
        name="email"
        placeholder="Email..."
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
  
     <input 
        type="password"
        placeholder="Contraseña..."
        value={password}
        onChange={e => setPassword(e.target.value)}
     />
      <input 
        name="password"
        placeholder="Repetir contraseña..."
        type="password"
        value={password2}
        onChange={e => setPassword2(e.target.value)}
      />

{password !== password2 &&
<p className="error">Las contraseñas no coinciden.</p>
      }
      {error?.error &&
        <p className="error">Se ha producido un error: {error.error}</p>
      } 

      <button>Registro</button> 
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form> 
  )
}

export default Register
