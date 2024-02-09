import { useMyInfo, usePostsById } from "../../../hooks/api";

const Profile = () => {
  const info = useMyInfo();
  const posts = usePostsById(info.data.user.id);

  return (
    <>
    <div>
      <div>
      <h1>{info.data.user.username}</h1>
      <h2 className="avatarinfo">
        <img src={`http://localhost:3000/${info.data.user.avatar}`} /> 
        </h2>
      </div>
      <div>
         <div>
          <span>50</span>
          <span>Publicaciones</span>
        </div>
        <div>
          <span>492</span>
          <span>Seguidores</span>
        </div> 
        <div>
          <span>950</span>
          <span>Seguidos</span>
        </div>
        <div>
          <span>50</span>
          <span>Publicaciones</span>
        </div>
      </div>
    </div>
    <div className="posts">
    {posts && posts.data.photos.map((e) => 
      <img src={`http://localhost:3000/${e.imagenURL}`} key={e.id}/>)}
    </div>
</>
  )
}

export default Profile;