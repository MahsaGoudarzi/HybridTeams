// useless file
// In this scenario it's useless, however, I kept it 
import { createContext, useState } from "react";

const PostsContext = createContext({
  posts: [],
  addPost: (post) => {},
  removePost: (postId) => {},
  updatePosts: (newPosts) => {},
  updatePost: (postId, updatedPost) => {},
  getPostById: (postId) => null,
  authenticated: false,
});

export function PostsContextProvider(props) {
  const [postsBlog, setPostsBlog] = useState([]);

  function addPostHandler(post) {
    setPostsBlog((prevPostsBlog) => {
      return prevPostsBlog.concat(post);
    });
  }

  function removePostHandler(postId) {
    setPostsBlog((prevPostsBlog) => {
      return prevPostsBlog.filter((post) => post.id !== postId);
    });
  }

  function updatePostsHandler(newPosts) {
    setPostsBlog(newPosts);
  }

  function updatePostHandler(postId, updatedPost) {
    setPostsBlog((prevPostsBlog) =>
      prevPostsBlog.map(
        (post) => post.id === postId && { ...post, ...updatedPost }
      )
    );
  }

  function getPostByIdHandler(postId) {
    return postsBlog.find((post) => post.id === postId) || null;
  }

  const context = {
    posts: postsBlog,
    addPost: addPostHandler,
    removePost: removePostHandler,
    updatePosts: updatePostsHandler,
    updatePost: updatePostHandler,
    getPostById: getPostByIdHandler,
  };

  return (
    <PostsContext.Provider value={context}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContext;
