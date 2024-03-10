import React, { useState } from "react";
import { useUser } from "../../UserContext";
import { FaRegTrashCan } from "react-icons/fa6";
import Confirm from "../../Components/Confirm/Confirm";
import "../Home/home.css";

const DeletePost = ({ postId, onSuccess }) => {
  const [user] = useUser();
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${user}`,
      },
    });

    if (res.ok) {
      onSuccess();
    } else {
    } 
  };

  return (
    <>
    <button id="button-delete" onClick={()=>{
      setShowConfirm(true)
    }}>
      
     <FaRegTrashCan style={{color: "#d132a9"}} />
    </button>

    {showConfirm && (
      <Confirm  setShowConfirm={setShowConfirm} handleOk={handleDelete}/>
    )}
      </>
  );
};

export default DeletePost;

