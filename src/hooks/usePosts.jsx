import { useEffect, useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({
    sortBy: "createdAt",
    sortOrder: "-",
    searchValue: "",
    currentPage: 1,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("sq", query.searchValue);
    params.append("sort", query.sortOrder + query.sortBy);
    params.append("page", query.currentPage);
    params.append("limit", 2);

    const url = new URL(`${import.meta.env.VITE_API_URL}/posts`);
    url.search = params.toString();
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [query]);

  return { posts, error, loading, query, setQuery };
};

export default usePosts;
