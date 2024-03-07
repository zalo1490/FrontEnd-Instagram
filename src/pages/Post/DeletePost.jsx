import React, { useState } from "react";
import { useUser } from "../../UserContext";
import { FormattedMessage } from "react-intl";
import Confirm from "../../Components/Confirm/Confirm";

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
    <button className="button" onClick={()=>{
      setShowConfirm(true)
    }}>
      <FormattedMessage id="post.deletePost" />
    </button>
    {showConfirm && (
      <Confirm text="Cofirmas?" setShowConfirm={setShowConfirm} handleOk={handleDelete}/>
    )}
      </>
  );
};

export default DeletePost;
