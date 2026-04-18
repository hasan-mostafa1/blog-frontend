import styles from "./Home.module.css";
import useLatestPosts from "../../hooks/useLatestPosts";
import { format, parseISO } from "date-fns";
import { Link } from "react-router";
import loadingIconUrl from "../../assets/icons/loading.svg";
import errorIconUrl from "../../assets/icons/alert-rhombus.svg";
import { useContext, useRef } from "react";
import SignupForm from "../signup-form/SignupForm";
import { FormProvider, useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext";

const Home = () => {
  const [latestPosts, error, loading] = useLatestPosts(3);
  const { authUser } = useContext(AuthContext);
  const methods = useForm();
  const signupDialog = useRef(null);

  const closeSignupDialog = () => {
    signupDialog.current.close();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.intro}>
          {authUser ? (
            <>
              <h1>
                Hello {authUser.firstName}, Welcome to <span>tech</span>itEasy !
              </h1>
              <p>
                Feel free to{" "}
                <Link to="posts" className={styles.link}>
                  browse
                </Link>{" "}
                latest technical posts or go ahead and visit your{" "}
                <Link to="#" className={styles.link}>
                  profile
                </Link>{" "}
                to start sharing your knowlege.
              </p>
            </>
          ) : (
            <>
              <h1>
                Hello World, from <span>tech</span>itEasy !
              </h1>
              <p>
                This is a public technical blog where you can learn, discuss and
                share your knowledge.
              </p>
              <p>
                Feel free to{" "}
                <Link to="posts" className={styles.link}>
                  browse
                </Link>{" "}
                latest technical posts or go ahead and{" "}
                <button
                  className="signupBtn"
                  onClick={() => signupDialog.current.showModal()}
                >
                  create an account
                </button>{" "}
                to start sharing your knowlege.
              </p>
              <p>
                Already have an account?{" "}
                <button className="loginBtn">login.</button>
              </p>
            </>
          )}
        </div>
        <div className={styles.latestBlogs}>
          <div className={styles.title}>
            <p>Latest blogs</p>{" "}
            <p>
              <Link to="posts" className={styles.link}>
                view all
              </Link>
            </p>
          </div>
          <div className={styles.content}>
            {loading ? (
              <div className={styles.loading}>
                <img src={loadingIconUrl} alt="" />
              </div>
            ) : error ? (
              <div className={styles.networkError}>
                <img src={errorIconUrl} alt="" />
                <p>Network Error</p>
              </div>
            ) : (
              latestPosts.data.map((post) => {
                const createdAtDate = parseISO(post.createdAt);
                return (
                  <Link to="#" className={styles.link} key={post.id}>
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
      <dialog className={styles.signupDialog} ref={signupDialog}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={closeSignupDialog}>
            X
          </button>
          <h2>Sign Up</h2>
          <FormProvider {...methods}>
            <SignupForm closeSignupDialog={closeSignupDialog} />
          </FormProvider>
        </div>
      </dialog>
    </>
  );
};

export default Home;
