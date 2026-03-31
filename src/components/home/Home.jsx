import styles from "./Home.module.css";
import useLatestPosts from "../../hooks/useLatestPosts";
import { format, parseISO } from "date-fns";
import { Link } from "react-router";

const Home = () => {
  const [latestPosts, error, loading] = useLatestPosts(3);
  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <h1>
          Hello World, from <span>tech</span>itEasy !
        </h1>
        <p>
          This is a public technical blog where you can learn, discuss and share
          your knowledge.
        </p>
        <p>
          Feel free to{" "}
          <Link to="#" className={styles.link}>
            browse
          </Link>{" "}
          latest technical posts or go ahead and{" "}
          <button className="signupBtn">create an account</button> to start
          sharing your knowlege.
        </p>
        <p>
          Already have an account? <button className="loginBtn">login.</button>
        </p>
      </div>
      <div className={styles.latestBlogs}>
        <div className={styles.title}>
          <p>Latest blogs</p>{" "}
          <p>
            <Link to="#" className={styles.link}>
              view all
            </Link>
          </p>
        </div>
        <div className={styles.content}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Network error</p>
          ) : (
            latestPosts.data.map((post) => {
              const createdAtDate = parseISO(post.createdAt);
              return (
                <Link to="#" className={styles.link}>
                  <div className={styles.blog}>
                    <p>{post.title}</p>
                    <p>{format(createdAtDate, "MMM d, yyyy")}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </header>
  );
};

export default Home;
