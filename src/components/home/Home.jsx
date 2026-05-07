import styles from "./Home.module.css";
import useLatestPosts from "../../hooks/useLatestPosts";
import { format, parseISO } from "date-fns";
import { Link } from "react-router";
import loadingIconUrl from "../../assets/icons/loading.svg";
import errorIconUrl from "../../assets/icons/alert-rhombus.svg";
import githubIconUrl from "../../assets/icons/github.svg";
import arrowDownIconUrl from "../../assets/icons/arrow-down-thin.svg";
import developerImageUrl from "../../assets/icons/the-developer.png";
import { useContext, useRef } from "react";
import SignupForm from "../signup-form/SignupForm";
import LoginForm from "../login-form/LoginForm";
import { FormProvider, useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext";

const Home = () => {
  const [latestPosts, error, loading] = useLatestPosts(3);
  const { authUser } = useContext(AuthContext);
  const signupMethods = useForm();
  const loginMethods = useForm();
  const signupDialog = useRef(null);
  const loginDialog = useRef(null);

  const closeSignupDialog = () => {
    signupDialog.current.close();
  };
  const closeLoginDialog = () => {
    loginDialog.current.close();
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <header className={styles.header}>
          <div className={styles.intro}>
            {authUser ? (
              <>
                <h1>
                  Hello {authUser.firstName}, Welcome to <span>tech</span>itEasy
                  !
                </h1>
                <p>
                  Feel free to{" "}
                  <Link to="posts" className={styles.link}>
                    browse
                  </Link>{" "}
                  latest technical posts or go ahead and visit your{" "}
                  <Link to="profile" className={styles.link}>
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
                  This is a public technical blog where you can learn, discuss
                  and share your knowledge.
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
                  <button
                    className="loginBtn"
                    onClick={() => loginDialog.current.showModal()}
                  >
                    login.
                  </button>
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
                    <Link
                      to={`/posts/${post.id}`}
                      className={styles.link}
                      key={post.id}
                    >
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
          <img src={arrowDownIconUrl} className={styles.aboutArrow} />
        </header>
        <section id="about" className={styles.about}>
          <h2>A bit about the developer</h2>
          <hr />
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.info}>
                <img
                  src={developerImageUrl}
                  alt="an image of the site developer"
                />
                <div className={styles.contact}>
                  <a href="https://www.linkedin.com/in/hasan-mostafa-dev">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" />
                  </a>
                  <a href="https://github.com/hasan-mostafa1">
                    <img src={githubIconUrl} />
                  </a>
                </div>
                <p>
                  <a href="mailto:dev.hasan.mostafa1@gmail.com">
                    dev.hasan.mostafa1@gmail.com
                  </a>
                </p>
              </div>
              <div className={styles.bio}>
                <p>
                  Hi! I'm{" "}
                  <span className={styles.myName}>
                    Hasan<span className={styles.arabicName}>حسن</span>
                  </span>
                  , a fullstack developer currently focused on creating clean
                  and accessible web apps.
                </p>
                <p>
                  {" "}
                  I also like learning new things, football, music, gaming, and
                  other stuff!
                </p>
                <h4>Tech stack</h4>
                <div className={styles.stack}>
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
                    alt="js"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                    alt="react"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                    alt="nodejs"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
                    alt="express"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                    alt="postgresql"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
                    alt="postman"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg"
                    alt="vitest"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"
                    alt="prisma"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"
                    alt="laravel"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
                    alt="mysql"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg"
                    alt="jest"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
                    alt="npm"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg"
                    alt="webpack"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                    alt="git"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <dialog className={styles.authDialog} ref={signupDialog}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={closeSignupDialog}>
            X
          </button>
          <h2>Sign Up</h2>
          <FormProvider {...signupMethods}>
            <SignupForm closeSignupDialog={closeSignupDialog} />
          </FormProvider>
        </div>
      </dialog>
      <dialog className={styles.authDialog} ref={loginDialog}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={closeLoginDialog}>
            X
          </button>
          <h2>Login</h2>
          <FormProvider {...loginMethods}>
            <LoginForm closeLoginDialog={closeLoginDialog} />
          </FormProvider>
        </div>
      </dialog>
    </>
  );
};

export default Home;
