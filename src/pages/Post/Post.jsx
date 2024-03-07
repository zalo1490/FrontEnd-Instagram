import { FormattedDate, FormattedMessage } from "react-intl";
import { usePostsById } from "../../hooks/api";
import { useNavigate } from "react-router-dom";
import Like from "../Home/Like";
import DeletePost from "../Post/DeletePost";
//import { useUser } from "../../UserContext";

const Post = ({ onDelete, currentUser }) => {
  const postId = window.location.pathname.split("/")[2];
  const result = usePostsById(postId);
  const data = result.data.post;
  //const [user] = useUser();
  const navigate = useNavigate();
  const createdAt = new Date(data.createdAt);
  const currentDate = new Date();
  const differenceInHours = Math.round((currentDate - createdAt) / 3600000);
  const isMoreThanOneDay = differenceInHours >= 24;

  let timeAgoText = "";

  if (isMoreThanOneDay) {
    const differenceInDays = Math.floor(differenceInHours / 24);
    timeAgoText = `${differenceInDays} día${differenceInDays === 1 ? "" : "s"}`;
  } else {
    timeAgoText = `${differenceInHours} hora${
      differenceInHours === 1 ? "" : "s"
    }`;
  }

  const handleDelete = () => {
    if (data && data.id) {
      onDelete(data.id);
    }
  };

  return (
    <>
      <div className="PostsContainer">
        <div
          className="PostImage"
          style={{
            backgroundImage: `url("http://localhost:3000/${data.imagenURL}")`,
          }}
        ></div>
        <div className="PostContent">
          <h3>{data.description}</h3>
          <div className="PostInfo">
            <span className="author">
              <FormattedMessage id="posts.author" />
              <button
                className="profile-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/profile/${data.userId}`);
                }}
              >
                {data.username}
              </button>
            </span>
            <span className="date">
              <FormattedMessage id="posts.date" />
              <FormattedDate
                value={data.createdAt}
                month="long"
                day="numeric"
              />
            </span>
            {" -"}
            <span className="time-ago"> Hace {timeAgoText}</span>
          </div>
        </div>
      </div>
      <div className="PostActions">
        <Like postId={data.id} likes={data.likes} />
        {currentUser && currentUser.id == data.userId && (
          <DeletePost postId={data.id} onSuccess={handleDelete} />
        )}
      </div>
    </>
  );
};
export default Post;
