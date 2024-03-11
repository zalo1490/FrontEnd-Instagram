import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import addImage from "/photo-photography-image-picture_108525 (1).png";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import DeletePost from "./DeletePost";
import "./CreatePost.css";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();
  const [user] = useUser();
  const navigate = useNavigate();
  const [postIdtoDelete, setPostIdtoDelete] = useState(null);
  const intl = useIntl();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("description", description);
    fd.append("photo", photo);
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        Authorization: `${user}`,
      },
      body: fd,
    });
    if (!user) {
      console.error("El usuario o el token es undefined.");
    }
    navigate("/");
  };

  //window.location.reload();

  const handleDeleteSuccess = () => {
    setPostIdtoDelete(null);
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      <label htmlFor="fileInput">
        <img
          src={preview || addImage}
          alt="Preview"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        />
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <input
        name="description"
        type="text"
        placeholder={intl.formatMessage({ id: "description.placeholder" })}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>
        <FormattedMessage id="post.createPost" />
      </button>
      {postIdtoDelete && (
        <DeletePost postId={postIdtoDelete} onSuccess={handleDeleteSuccess} />
      )}
    </div>
  );
};

export default CreatePost;
