import styles from "./Profile.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../contexts/AuthContext";
import defaultAvatarUrl from "../../assets/icons/default-avatar.svg";
import loadingIconUrl from "../../assets/icons/loading.svg";
import errorIconUrl from "../../assets/icons/alert-rhombus.svg";
import { format, parseISO } from "date-fns";
import useMyPosts from "../../hooks/useMyPosts";
import { Link, useNavigate } from "react-router";
import Input from "../input/Input";
import { useForm, FormProvider } from "react-hook-form";
import DOMPurify from "dompurify";

const Profile = () => {
  const { authUser, updateAuthUser, token, updateToken } =
    useContext(AuthContext);
  const { posts, error, loading, query, setQuery } = useMyPosts();
  const updateImageDialog = useRef(null);
  const methods = useForm();
  const navigate = useNavigate();

  const closeUpdateImageDialog = () => {
    updateImageDialog.current.close();
  };

  // eslint-disable-next-line react-hooks/refs
  const onSubmit = methods.handleSubmit(async (data) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/auth/profile-image`);
    try {
      const formData = new FormData();
      formData.append("profileImage", data.profileImage[0]);
      console.log(data.profileImage[0]);
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) {
          result.errors.forEach((error) => {
            methods.setError(error.path, {
              message: error.msg,
            });
          });
        }
      } else {
        updateAuthUser(result.user);
        closeUpdateImageDialog();
      }
    } catch (error) {
      console.error(error.message);
      methods.setError("root.serverError", {
        message: "Something went wrong!",
      });
    }
  });

  const handleLogout = () => {
    updateToken(null);
    updateAuthUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.info}>
          <div className={styles.profileImage}>
            <div className={styles.profileImageFrame}>
              <img
                src={
                  authUser?.profileImage
                    ? `${import.meta.env.VITE_UPLOADS_URL}/profiles/${authUser?.profileImage}`
                    : defaultAvatarUrl
                }
                alt="Profile image"
              />
            </div>
            <button
              onClick={() => {
                updateImageDialog.current.showModal();
              }}
            >
              Update image
            </button>
          </div>
          <div className={styles.details}>
            <p>
              {authUser?.firstName} {authUser?.lastName}
            </p>
            <p>{authUser?.email}</p>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className={styles.myPosts}>
          <div className={styles.header}>
            <h2>My posts</h2>
            <Link to="/new-post" className={styles.newPostLink}>
              <span>+</span>New Post
            </Link>
          </div>
          <hr className={styles.hr} />
          {loading ? (
            <div className={styles.loading}>
              <img src={loadingIconUrl} alt="" />
            </div>
          ) : error ? (
            <div className={styles.networkError}>
              <img src={errorIconUrl} alt="" />
              <p>Network Error</p>
            </div>
          ) : posts.data.length > 0 ? (
            <>
              <div className={styles.posts}>
                {posts.data.map((post) => {
                  const createdAtDate = parseISO(post.createdAt);
                  return (
                    <Link
                      to={`/posts/${post.id}`}
                      key={post.id}
                      className={styles.link}
                    >
                      <div className={styles.post}>
                        <div className={styles.title}>
                          <p>{post.title}</p>
                          <p>
                            by{" "}
                            <span>
                              {post.author.firstName} {post.author.lastName}
                            </span>{" "}
                            at {format(createdAtDate, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div className={styles.content}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(post.content),
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className={styles.pagination}>
                <div className={styles.btns}>
                  <div>
                    {query.currentPage > 1 ? (
                      <button
                        className="previous"
                        onClick={() =>
                          setQuery((prev) => {
                            return {
                              ...prev,
                              currentPage: prev.currentPage - 1,
                            };
                          })
                        }
                      >
                        {" "}
                        {"< Previous"}{" "}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {query.currentPage !== posts.meta.totalPages ? (
                      <button
                        className="next"
                        onClick={() =>
                          setQuery((prev) => {
                            return {
                              ...prev,
                              currentPage: prev.currentPage + 1,
                            };
                          })
                        }
                      >
                        {"Next >"}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <p>
                  Showing from{" "}
                  {(query.currentPage - 1) * posts.meta.itemsPerPage + 1} to{" "}
                  {Math.min(
                    query.currentPage * posts.meta.itemsPerPage,
                    posts.meta.totalItems,
                  )}{" "}
                  out of {posts.meta.totalItems}
                </p>
              </div>
            </>
          ) : (
            <div className={styles.notFound}>
              <p>You don't have any posts yet!</p>
            </div>
          )}
        </div>
      </section>
      <dialog className={styles.updateImageDialog} ref={updateImageDialog}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={closeUpdateImageDialog}>
            X
          </button>
          <h2>Update Profile Image</h2>
          <FormProvider {...methods}>
            <form
              noValidate
              onSubmit={(e) => e.preventDefault()}
              className={styles.updateImageForm}
            >
              {methods.formState.errors.root?.serverError && (
                <span className={styles.error} aria-live="polite">
                  {methods.formState.errors.root.serverError.message}
                </span>
              )}
              <Input
                type="file"
                id="profileImage"
                name="profileImage"
                label="Profile Image"
                validation={{
                  required: {
                    value: true,
                    message: "This field is required!",
                  },
                  validate: {
                    lessThan2MB: (files) =>
                      files[0]?.size < 2 * 1024 * 1024 ||
                      "File is too large (max 2MB)",
                    allowedFormats: (files) =>
                      ["image/jpeg", "image/png", "image/gif"].includes(
                        files[0].type,
                      ) ||
                      "Invalid file type. Only JPEG, PNG and GIF are allowed.",
                  },
                }}
              />
              <div className={styles.formControl}>
                <button
                  className={styles.submitBtn}
                  onClick={onSubmit}
                  disabled={methods.formState.isSubmitting}
                >
                  Update
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
