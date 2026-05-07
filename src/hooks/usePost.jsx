import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const usePost = (postId) => {
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/posts/${postId}`);
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setPost(json);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [token, postId]);

  return { post, setPost, error, loading };
};

export default usePost;
