import React from 'react';
import { useState } from 'react';
import { useUserById, usePostsByUserId } from "../../../hooks/api";
import { Link } from 'react-router-dom';
import Avatar from '../Profile/Avatar';
import "./Profile.css"

const Profile = () => {
  const userId = window.location.pathname.split("/")[2];
  const info = useUserById(userId);
  const posts = usePostsByUserId(userId);
  const [avatar, setAvatar] = useState(info.data.user.avatar);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);

      uploadAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
   <div className="container">
  <div>
    <h1>{info.data.user.username}</h1>
    <h4 className="avatarinfo">
      <form htmlFor="avatarInput">
        <img src={`http://localhost:3000/${avatar}`} alt="Avatar" />
      </form>
    </h4> 
    <Avatar />
  </div>
  <div className="posts">
    {posts &&
      posts.data.photos.map((e) => (
        <Link to={`/posts/${e.id}`} key={e.id}>
          <img src={`http://localhost:3000/${e.imagenURL}`} />
        </Link>
      ))}
  </div> 
</div>

    </>
  );
};

export default Profile;
