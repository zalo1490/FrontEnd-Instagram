import { Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { listPosts, useMyInfo } from "../../hooks/api";
import { useUser } from "../../UserContext";
import Posts from "./Posts";
import "./Home.css";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const Home = ({ filtros }) => {
  const [posts, setPosts] = useState([]);
  const [user] = useUser();
  const [theme] = useTheme();
  const info = useMyInfo();

  useEffect(() => {
    const getListPost = async () => {
      const respAPI = await listPosts(filtros);
      setPosts(respAPI.data.photos);
    };
    getListPost();
  }, [filtros]);

  const handlePostDelete = (postId) => {
    console.log(postId);
    const newPosts = posts.filter(post => post.id !== postId);
    setPosts(newPosts);
  };

  return (
    <div>
      <h2>
        <FormattedMessage id="home.newPosts" />{""}
      </h2>
      {user && (
        <h3>
          <Link className="new-posts-link" to="/Posts">
            <FormattedMessage id="home.newPost" />
          </Link> 
        </h3> 
      )}
      {posts && posts.map((e) => <Posts key={e.id} data={e} onDelete={handlePostDelete} currentUser={info.data?.user} />)}
    </div>
  );
};

export default Home;
