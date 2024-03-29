import React, { useState } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import Like from "./Like";
import DeletePost from "../Post/DeletePost";
import { useUser } from "../../UserContext";
import "./Posts.css";

const Posts = ({ data, onDelete, currentUser }) => {
  const [theme, setTheme] = useState("light"); 
  const style = {};
  const slug = data.description.toLowerCase().replaceAll(" ", "-");
  const [user] = useUser();
  const navigate = useNavigate();
  const createdAt = new Date(data.createdAt);
  const currentDate = new Date();
  const differenceInHours = Math.round((currentDate - createdAt) / 3600000);
  const isMoreThanOneDay = differenceInHours >= 24;

  let timeAgoText = "";

  if (isMoreThanOneDay) {
    const differenceInDays = Math.floor(differenceInHours / 24);
    timeAgoText = (
      <>
        {differenceInDays}{" "}
        <FormattedMessage
          id={differenceInDays === 1 ? "timeAgoText.day" : "timeAgoText.days"}
        />
      </>
    );
  } else {
    timeAgoText = (
      <>
        {differenceInHours}{" "}
        <FormattedMessage
          id={
            differenceInHours === 1 ? "timeAgoText.hour" : "timeAgoText.hours"
          }
        />
      </>
    );
  }

  const handleDelete = () => {
    if (data && data.id) {
      onDelete(data.id);
    }
  };

  return (
    <>
      <Link className="PostLink" to={`/posts/${data.id}`}>
        <div className="PostContainer">
          <div
            className="PostImage"
            style={{
              backgroundImage: `url("http://localhost:3000/${data.imagenURL}")`,
            }}
          ></div>
          <div className="PostContent">
            <h3>{data.description}</h3> 
            <div className="PostInfo">
            <span id="author">
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
              <span className="time-ago"> {timeAgoText}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="PostActions">
        <Like postId={data.id} likes={data.likes} />
        {currentUser && currentUser.id == data.userId && (
          <DeletePost postId={data.id} onSuccess={handleDelete} />
        )}
      </div>
    </>
  );
};

export default Posts;




