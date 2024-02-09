import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useUser } from "../../UserContext"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useUser()
  const [error, setError] = useState()

  const handleForm = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
     })
    const response = await res.json()
      if (res.ok) {
      setUser(response.data.token)
      } else {
      setError(response)
      }
      } 

  if (user) return <Navigate to="/" />

  return (
    <form onSubmit={handleForm}>
     <input
        name="email"
        placeholder="Email..."
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        name="password"
        placeholder="Contraseña..."
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Login</button>
      {error?.error &&
        <p className="error">Se ha producido un error: {error.error}</p>
      }
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </form>
  )
}

export default Login