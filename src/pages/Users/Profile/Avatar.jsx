import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import addImage from "/add-image.png";
import { FormattedMessage } from "react-intl";
import "../Profile/Profile.css";

const Avatar = () => {
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();
  const [user] = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("avatar", photo);
    const res = await fetch("http://localhost:3000/users/avatar", {
      method: "PUT",
      headers: {
        Authorization: `${user}`,
      },
      body: fd,
    });
    if (!user || !user.token) {
      console.error("El usuario o el token es undefined.");
    }

    if (res.ok) {
      const data = await res.json();
      console.log(data.data.avatar);
      navigate("/users/" + data.data.avatar);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="EditAvatar">
      <label>
        <img src={preview || addImage} />
        <input type="file" onChange={handleChange} accept="image/*" />
      </label>
      <button>
        <FormattedMessage id="Subir foto de perfil" />
      </button>
    </form>
  );
};

export default Avatar;
