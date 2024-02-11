import React from "react";
import { useUser } from "../../UserContext";
import { FormattedMessage } from "react-intl";

const DeletePost = ({ postId, onSuccess }) => {
  const [user] = useUser();

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
    <button className="button" onClick={handleDelete}>
      <FormattedMessage id="post.deletePost" />
    </button>
  );
};

export default DeletePost;
