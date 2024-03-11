import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import addImage from "/plus_add_new_icon_231258.png";
import { FormattedMessage } from "react-intl";
import "./Profile.css";

const Avatar = ({ editable }) => {
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

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Error al actualizar el avatar.");
    }
  };

  return (
    <div>
      <label htmlFor="fileInput" >
        {editable && (
          <img className="fileInput"
            src={preview || addImage}
            alt="Preview"
          />
        )}
      </label>
      {editable && (
        <>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <button className="avatar" onClick={handleSubmit}>
            <FormattedMessage id="avatar.profile" />
          </button>
        </>
      )}
    </div>
  );
};

export default Avatar;

/*
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <button className="avatar" onClick={handleSubmit}>
        <FormattedMessage id="avatar.profile" />
      </button> 
*/
