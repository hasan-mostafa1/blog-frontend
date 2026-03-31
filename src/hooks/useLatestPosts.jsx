import { useEffect, useState } from "react";

const useLatestPosts = (limit) => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/posts?limit=${limit}&sort=-createdAt`,
    )
      .then((res) => res.json())
      .then((json) => {
        setLatestPosts(json);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return [latestPosts, error, loading];
};

export default useLatestPosts;
