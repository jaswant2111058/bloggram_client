import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from "../api/post"
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import DOMpurify from 'dompurify'
import './post.css'
import { useAuth0 } from '@auth0/auth0-react'

const PostPage = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const { posts, setPosts } = useContext(DataContext)
  const post = posts.find((post) => post._id.toString() === id);
  const Navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await api.delete(`/posts/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      setPosts(
        posts.filter((post) => post._id !== id)
      );
      Navigate("/");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <div className="postPageHeader">
              <img className="headerImg" src={post.image && post.image != "NA" ? post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage" />
              <h2>{post.title}</h2>
              <p><strong>By {post?.user.name}</strong></p>
            </div>
            <div className="postContainer">
              <p className="postDate">{post.datetime.split(' ').slice(0, 3).join(' ')}</p>
              {
                isAuthenticated && user?.sub?.split('|')[1] === post?.user?.sub &&
                <>
                  <Link to={`/edit/${post._id}`}>
                    <button className="editButton">
                      <FaEdit style={{ color: "black" }} size="1.7rem" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="deleteButton"
                  >
                    <AiFillDelete style={{ color: "black" }} size="1.7rem" />
                  </button>
                </>}
              <div className="postBody sun-editor-editable" dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(post.body, { ADD_TAGS: ['iframe'] }) }} />
              <div className="author">
                <div>
                  <img src={post?.user?.photo} />
                  <span style={{ padding: "10px" }}>
                    <p><strong>By {post?.user?.name}</strong></p>
                    <p><em>{"student"}</em></p>
                  </span>
                </div>
                {
                  isAuthenticated && user?.sub?.split('|')[1] === post?.user?.sub &&
                  <div>
                    <Link to={`/edit/${post._id}`}>
                      <button className="editButton">
                        <FaEdit style={{ color: "black" }} size="1.7rem" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="deleteButton"
                    >
                      <AiFillDelete style={{ color: "black" }} size="1.7rem" />
                    </button>
                  </div>
                }
              </div>
            </div>
          </>
        ) : (
          <p>
            <h2>Post Not Found</h2>
            <p>Well, thats disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </p>
        )}

      </article>
    </main>
  );
};

export default PostPage;
