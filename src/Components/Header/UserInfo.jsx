import { Link } from "react-router-dom"
import { useMyInfo } from "../../hooks/api"
import { useUser } from "./../../UserContext"
import './Header.css'

const UserInfo = () => {
  const [user] = useUser()

  if (user) return <UserInfoLoggedIn />

  return (
    <Link to="/login">Iniciar sesión</Link>
  )
}

const UserInfoLoggedIn = () => {
  const [, setUser] = useUser()
  const info = useMyInfo()
  return (
    <span className="userinfo">
     <Link to={`/profile/${info.data.user.id}`}> {info.data.user.username}</Link> 
      <img src={`http://localhost:3000/${info.data.user.avatar}`} /> 
      <span className="logout" onClick={() => setUser()}>⏻</span>
    </span>
  )
}

export default UserInfo
