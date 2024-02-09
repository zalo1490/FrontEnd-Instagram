import Avatar from '../Profile/Avatar';

const EditAvatar = () => {
  const handleChangeAvatar = () => {
    console.log("Cambiar avatar del usuario");
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <button onClick={fetchUserPosts}>Ver Publicaciones</button>
      <button onClick={handleChangeAvatar}>Cambiar Avatar</button>
     
      {showPosts && (
        <div>
          <h2>Publicaciones del Usuario</h2>
          {userPosts.map(post => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 <Avatar />
export default EditAvatar;