import React, { useState } from 'react';
import { useUserById, usePostsByUserId, useMyInfo } from "../../../hooks/api";
import { Link } from 'react-router-dom';
import Avatar from '../Profile/Avatar';
import "./Profile.css";

const Profile = () => {
  const userId = window.location.pathname.split("/")[2];
  const info = useUserById(userId);
  const currentUser = useMyInfo();
  const posts = usePostsByUserId(userId);
  const [avatar, setAvatar] = useState(info.data.user.avatar);
  
  
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
        <Avatar editable={currentUser.data.user.id == userId} />
      </div>
      <div className="posts">
        {posts && posts.data.photos.map((e) => (
          <Link to={`/posts/${e.id}`} key={e.id}>
            <img src={`http://localhost:3000/${e.imagenURL}`} alt={`Post ${e.id}`} />
          </Link>
        ))}
      </div> 
    </div>
    </>
  );
};

export default Profile;
