import { format, parseISO } from "date-fns";
import DOMPurify from "dompurify";
import styles from "./Post.module.css";
import usePost from "../../hooks/usePost";
import { useParams } from "react-router";
import loadingIconUrl from "../../assets/icons/loading.svg";
import errorIconUrl from "../../assets/icons/alert-rhombus.svg";
import heartIconUrl from "../../assets/icons/heart.svg";
import { useState } from "react";

const Post = () => {
  const { postId } = useParams();
  const { post, setPost, error, loading } = usePost(postId);
  const [likes, setLikes] = useState(
    JSON.parse(localStorage.getItem("likes")) || [],
  );
  console.log(likes.includes(postId));
  const handleLike = () => {
    let url;
    let updateLikes;
    if (likes.includes(postId)) {
      url = new URL(`${import.meta.env.VITE_API_URL}/posts/${postId}/unlike`);
      updateLikes = likes.filter((item) => item != postId);
    } else {
      url = new URL(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`);
      updateLikes = [...likes, postId];
    }

    fetch(url, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((json) => {
        setPost(json);
        setLikes(updateLikes);
        localStorage.setItem("likes", JSON.stringify(updateLikes));
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className={styles.section}>
      {loading ? (
        <div className={styles.loading}>
          <img src={loadingIconUrl} alt="" />
        </div>
      ) : error ? (
        <div className={styles.networkError}>
          <img src={errorIconUrl} alt="" />
          <p>Network Error</p>
        </div>
      ) : post.data ? (
        <>
          {post.data.bannerImage && (
            <div className={styles.bannerImage}>
              <img
                src={`${import.meta.env.VITE_UPLOADS_URL}/profiles/${post.data.bannerImage}`}
              />
            </div>
          )}
          <div className={styles.post}>
            <div className={styles.title}>
              <h1>{post.data.title}</h1>
              <p>
                by{" "}
                <span>
                  {post.data.author.firstName} {post.data.author.lastName}
                </span>{" "}
                at {format(parseISO(post.data.createdAt), "MMM d, yyyy")}
              </p>
            </div>
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.data.content),
                }}
              />
            </div>
          </div>
          <div className={styles.likes}>
            <button onClick={handleLike}>
              <img
                src={heartIconUrl}
                alt="Like button in the shape of a heart"
                className={likes.includes(postId) && styles.liked}
              />
            </button>
            <p>{post.data.likes} Likes</p>
          </div>
        </>
      ) : (
        <div>No post data available</div>
      )}
    </section>
  );
};

export default Post;
