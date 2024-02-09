import { usePostsById } from "../../hooks/api"; 
import Posts from '../Home/Posts'

const Post = ({ user }) => { 
  const { data } = usePostsById(user.id); 
  
  return (
    <div id="post">
      <h3>Hola Mundo</h3> 
      <Posts /> 
    </div>
  );
};

export default Post;



/*import { FormattedDate } from "react-intl";
import { usePostsById } from "../../hooks/api"; 
import './Post.css';

const Post = ({ postId }) => { 
  const post = usePostsById(postId); 
  
  return (
    <div id="post">
        <h3>{post.data.description}</h3> 
      <div className="metadata">
        <span className="author">Por {post.data.username}</span> 
        <span className="date">
          <FormattedDate value={post.data.createdAt} month="long" day="numeric" /> 
        </span>
      </div>
      <main>
        {post.data.content} 
      </main>
    </div>
  );
};

export default Post; */
